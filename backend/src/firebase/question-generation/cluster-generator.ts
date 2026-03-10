import Anthropic from "@anthropic-ai/sdk"
import { z, ZodType } from "zod"
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod"
import { Cluster, ScienceStandard } from "../types.js"
import { db } from "../setup.js"

const QuestionSchema = z.object({
  type: z.enum(["multiple choice", "constructed response"]),
  number: z.number(),
  question: z.string(),
  availableChoices: z.array(z.string().regex(/^[ABCD]\) /)).length(4).optional(),
  answer: z.string()
})

const FigureSchema = z.object({
  type: z.enum(["image", "table", "chart", "graph"]),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  rows: z.array(z.array(z.union([z.string(), z.number()]))).optional()
})

export const ClusterSchema = z.object({
  title: z.string(),
  content: z.string(),
  questions: z.array(QuestionSchema),
  figures: z.array(FigureSchema)
});

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

      return this.outputConfig.parse(JSON.parse(textBlock.text)) as z.infer<typeof ClusterSchema>

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
