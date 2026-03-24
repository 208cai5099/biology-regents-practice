import Anthropic from "@anthropic-ai/sdk"
import { z, ZodType } from "zod"
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod"
import { Cluster, ScienceStandard } from "../types.js"
import { db } from "../setup.js"

export const TitleSchema = z.object({
  clusterTitle: z.string()
})

export const TextSchema = z.object({
  sentencesArray: z.array(z.string()).min(1).max(4)
})

export const MultipleChoiceQuestionSchema = z.object({
  questionType: z.literal("multiple-choice"),
  questionNumber: z.number(),
  question: z.string(),
  wrongChoices: z.array(z.string()).length(3),
  correctAnswer: z.string()
})

export const ConstructedResponseQuestionSchema = z.object({
  questionType: z.literal("constructed-response"),
  questionNumber: z.number(),
  question: z.string(),
  acceptableAnswers: z.array(z.string()).min(2).max(3)
})

export const FigureSchema = z.object({
  figureType: z.enum(["image", "table", "bar graph", "line graph", "boxplot", "scatterplot"]),
  figureNumber: z.number(),
  figureTitle: z.string(),
  figureDescription: z.string(),
  figureColumnNames: z.array(z.string()).optional(),
  figureRowData: z.array(z.array(z.union([z.string(), z.number()]))).optional()
})

export const ClusterSectionSchema = z.object({
  sectionNumber: z.number().min(1),
  sectionType: z.enum(["title", "text", "multiple-choice", "constructed-response", "figure"]),
  sectionObject: z.union([TitleSchema, TextSchema, MultipleChoiceQuestionSchema, ConstructedResponseQuestionSchema, FigureSchema])
})

export const EntireClusterSchema = z.object({
  clusterSectionArray: z.array(ClusterSectionSchema)
})

export class ClusterGenerator {

  private client: Anthropic
  private systemPrompt: string
  private model: string
  private maxTokens: number
  private outputConfig: ZodType
  private clusterExampleCount: number

  constructor(client: Anthropic, model: string = "claude-haiku-4-5", systemPrompt: string, maxTokens: number = 8192, outputConfig: ZodType, clusterExampleCount: number = 2) {
    this.client = client
    this.systemPrompt = systemPrompt
    this.model = model
    this.maxTokens = maxTokens
    this.outputConfig = outputConfig
    this.clusterExampleCount = clusterExampleCount
  }

  private fetchStandards = async(targetStandards: string[]) => {

    const standardsRef = targetStandards.map(standardCode => db.collection("standards").doc(standardCode))
    const snapshot = await db.getAll(...standardsRef)
    const standards: ScienceStandard[] = []
    
    snapshot.forEach(doc => {
      standards.push(doc.data() as ScienceStandard)
    })

    let output = ""
    for (const standard of standards) {
      for (const [field, value] of Object.entries(standard)) {
        output += `${field.split("_").map(word => word[0].toUpperCase() + word.slice(1,)).join(" ")}: ${value}\n`
      }
      output += "\n\n"
    }
    
    return output

  }
  
  private fetchClusterExamples = async(targetStandards: string[]) => {

    const countRecord: [string, number][] = []
    const snapshot = await db.collection("official_clusters").select("standards").get()
    snapshot.forEach(doc => {

      const assessedStandards: string[] = doc.data()["standards"]
      const matchCount = assessedStandards.reduce((accumulator, standard) => {
        accumulator += Number(targetStandards.includes(standard))
        return accumulator
      }, 0)

      countRecord.push([doc.id, matchCount])

    })

    countRecord.sort((record1, record2) => record2[1] - record1[1])
    const topMatchIDs = countRecord.slice(0, this.clusterExampleCount).map((record) => record[0])
    const matchRefs = topMatchIDs.map(id => db.collection("official_clusters").doc(id))
    const matchSnapshot = await db.getAll(...matchRefs)
    const targetClusters: Cluster[] = []
    matchSnapshot.forEach(doc => targetClusters.push(doc.data() as Cluster))

    let output = ""
    for (const cluster of targetClusters) {
      output += `Cluster Title: ${cluster["title"]}\n`
      output += `Cluster Content: ${cluster["content"]}\n\n\n`
    }

    return output

  }

  private formatTableData = (cluster: any) => {

    for (const section of cluster["clusterSectionArray"]) {
      if (section["sectionType"] === "figure") {
        const sectionNumber = section["sectionNumber"]
        const figureDetails = section["sectionObject"]
        const figureColumns = figureDetails["figureColumnNames"] as string[]
        const figureRows = figureDetails["figureRowData"] as (string | number)[][]
        if (figureColumns && figureRows && figureColumns.length === figureRows[0].length) {
          let reformattedRows: Record<string, Record<string, (string | number)>> = {}
          for (let rowNum = 0; rowNum < figureRows.length; rowNum++) {
            const currentRow = figureRows[rowNum]
            reformattedRows[rowNum.toString()] = Object.fromEntries(figureColumns.map((col, index) => [col, currentRow[index]]))
          }

          section["sectionObject"]["figureRowData"] = reformattedRows
          cluster["clusterSectionArray"][sectionNumber - 1] = section
        }

      }
    }

    return cluster

  }

  generate = async(userPromptTemplate: string, phenomenon: string, targetStandards: string[]) => {

    try {

      const clusterExamples = await this.fetchClusterExamples(targetStandards)
      const standardsDescriptions = await this.fetchStandards(targetStandards)

      const variablePlaceholders = {
        phenomenon: phenomenon,
        standards_list: targetStandards.join(", "),
        standards_descriptions: standardsDescriptions,
        cluster_examples: clusterExamples
      }

      const userPrompt = Object.entries(variablePlaceholders).reduce((prompt, [field, value]) => {
        return prompt.replaceAll(`{{${field}}}`, value)
      }, userPromptTemplate)

      const response = await this.client.messages.create({
        model: this.model,
        system: this.systemPrompt,
        max_tokens: this.maxTokens,
        messages: [
          {
            role: "user",
            content: userPrompt
          }
        ],
        output_config: { format: zodOutputFormat(this.outputConfig) }
      })

      if (response.stop_reason === "max_tokens") {
        throw new Error("Error: maxTokens is too low")
      }

      const textBlock = response.content.find(block => block.type === "text")
      if (!textBlock) {
        throw new Error("Error: no text blocks in response")
      }

      const newCluster = this.outputConfig.parse(JSON.parse(textBlock.text)) as any
      
      const formattedCluster = this.formatTableData(newCluster)

      return formattedCluster


    } catch (error) {

      if (error instanceof Anthropic.APIError) {
        console.error("Status:", error.status)
        console.error("Message:", error.message)
        console.error("Error name:", error.name)
      } else {
        console.error(error)
      }

      throw error
    }
  }

}
