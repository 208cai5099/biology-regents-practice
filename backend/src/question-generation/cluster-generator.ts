import Anthropic from "@anthropic-ai/sdk"
import dotenv from "dotenv"
import { z } from "zod"
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod"
import fs from "fs/promises"
import admin from "firebase-admin"
import { getFirestore } from 'firebase-admin/firestore'
import { Cluster, PhenomenaList, ScienceStandard } from "./types.js"

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = getFirestore()

const QuestionSchema = z.object({
  type: z.enum(["multiple choice", "constructed response"]),
  number: z.number(),
  question: z.string(),
  availableChoices: z.array(z.string()).optional(),
  answer: z.string()
})

const FigureSchema = z.object({
  type: z.enum(["image", "table", "chart", "graph"]),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  rows: z.array(z.array(z.union([z.string(), z.number()]))).optional()
})

const ClusterSchema = z.object({
  title: z.string(),
  content: z.string(),
  questions: z.array(QuestionSchema),
  figures: z.array(FigureSchema)
});

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const readPrompt = async(type: string) => {

  try {

    const allPrompts = await fs.readFile("./src/question-generation/prompts.json", "utf-8")
    const allPromptsJSON: Record<string, string[]> = JSON.parse(allPrompts)
    return allPromptsJSON[type].join("")

  } catch (error) {

    console.log(error)
  
  }

  return ""
}

class ClusterGenerator {

  client: Anthropic
  systemPrompt: string
  model: string
  maxTokens: number
  outputConfig: any

  constructor(client: Anthropic, model: string = "claude-haiku-4-5", systemPrompt: string, maxTokens: number = 8192, outputConfig: any) {
    this.client = client
    this.systemPrompt = systemPrompt
    this.model = model
    this.maxTokens = maxTokens
    this.outputConfig = outputConfig
  }

  fetchPhenomenaExamples = async() => {
    const phenomenaRef = db.collection("phenomena")
    const snapshot = await phenomenaRef.get()
    const phenomenaExamples: string[] = []
    
    snapshot.forEach(doc => {
      const examples = doc.data()
      phenomenaExamples.push(...examples["new_phenomena"])
    })

    return phenomenaExamples
  }

  fetchStandards = async(targetStandards: string[]) => {

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

  fetchClusterExamples = async(targetStandards: string[]) => {

    const exampleCount = 2
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
    const topMatches = countRecord.slice(0, exampleCount).map((record) => record[0])
    const matchRefs = topMatches.map(id => db.collection("official_clusters").doc(id))
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

    try {

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
        console.error("Response maxed out on token size limit - need to increase maxTokens")
        return "Error: maxTokens is too low"
      }

      const textBlock = response.content.find(block => block.type === "text")
      if (!textBlock || textBlock.type !== "text") {
        console.error("No text block in response")
        return "Error: no text blocks in response"
      }

      return this.outputConfig.parse(JSON.parse(textBlock.text))

    } catch (error) {

      if (error instanceof Anthropic.APIError) {
        console.error("Status:", error.status)
        console.error("Message:", error.message)
        console.error("Error name:", error.name)
        return `Error: ${error.name}`
      } else {
        console.error(error)
        return "Error"
      }
    }
  }

}

// const systemPrompt = await readPrompt("cluster_system_prompt")
// const generator = new ClusterGenerator(client, "claude-haiku-4-5", systemPrompt, 8192, ClusterSchema)
// const userPromptTemplate = await readPrompt("cluster_user_prompt_template")
// const output = await generator.generate(userPromptTemplate, "how antibiotic overuse in livestock contributes to resistant bacterial strains", ["HS-LS4-2", "HS-LS4-3", "HS-LS4-4"])