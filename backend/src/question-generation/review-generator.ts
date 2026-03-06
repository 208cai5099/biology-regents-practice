import Anthropic from "@anthropic-ai/sdk"
import { z, ZodType } from "zod"
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod"
import fs from "fs/promises"
import { db } from "../firebase/setup.js"

const MCQuestionSchema = z.object({
    unitName: z.enum(["Organism Organization and Homeostasis", "Genetics", "Biochemistry", "Ecology and Human Impacts on Ecosystems", "The Carbon Cycle", "Reproduction", "Evolution"]),
    question: z.string(),
    availableChoices: z.array(z.string().regex(/^[ABCD]\) /)).length(4),
    correctAnswer: z.string()
})

const MCQuestionListSchema = z.object({
    questionList: z.array(MCQuestionSchema)
})

const readPrompt = async(type: string) => {

  const allPrompts = await fs.readFile("./src/question-generation/prompts.json", "utf-8")
  const allPromptsJSON: Record<string, string[]> = JSON.parse(allPrompts)
  return allPromptsJSON[type].join("")

}

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

type UnitNames = "Organism Organization and Homeostasis" | "Genetics" | "Biochemistry" | "Ecology and Human Impacts on Ecosystems" | "The Carbon Cycle" | "Reproduction" | "Evolution"

class ReviewQuestionGenerator {

    client: Anthropic
    model: string
    systemPrompt: string
    maxTokens: number
    outputConfig: ZodType

    constructor(client: Anthropic, model: string, systemPrompt: string, maxTokens: number = 1000, outputConfig: ZodType) {
        this.client = client
        this.model = model
        this.systemPrompt = systemPrompt
        this.maxTokens = maxTokens
        this.outputConfig = outputConfig
    }

    fetchUnitCoreIdeas = async(unitName: UnitNames) => {

        try {
            const unitDoc = await db.collection("biology_units").doc(unitName).get()
            const unitDocData = unitDoc.data()
            if (unitDocData) {
                return unitDocData["core_ideas"] as string[]
            }
            return []
        } catch (error) {
            throw error
        }

    }
    generate = async(userPromptTemplate: string, unitName: UnitNames, requestCount: number) => {
        
        try {

            const coreIdeas = await this.fetchUnitCoreIdeas(unitName)
            const variablePlaceholders = {
                unit_name: unitName,
                request_count: String(requestCount),
                core_ideas: coreIdeas.reduce((combined, idea) => {
                    return combined += `--${idea}\n`
                }, "")
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

            return this.outputConfig.parse(JSON.parse(textBlock.text))

        } catch (error) {
            console.error(error)
            throw error
        }
    }
}