import Anthropic from "@anthropic-ai/sdk";
import { ClusterSchema, ClusterGenerator } from "./cluster-generator.js";
import { MCQuestionListSchema, MCQuestionSchema, ReviewQuestionGenerator } from "./review-generator.js";
import fs from "fs/promises"
import { z } from "zod";
import { UnitNames } from "../types.js";

const readPrompt = async(filepath: string, type: string) => {

  const allPrompts = await fs.readFile(filepath, "utf-8")
  const allPromptsJSON: Record<string, string[]> = JSON.parse(allPrompts)
  return allPromptsJSON[type].join("")

}

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const model = "claude-sonnet-4-6"

const clusterSystemPrompt = await readPrompt("./src/firebase/question-generation/prompts.json", "cluster_system_prompt")
const clusterUserPrompt = await readPrompt("./src/firebase/question-generation/prompts.json", "cluster_user_prompt")
const reviewSystemPrompt = await readPrompt("./src/firebase/question-generation/prompts.json", "review_system_prompt")
const reviewUserPrompt = await readPrompt("./src/firebase/question-generation/prompts.json", "review_user_prompt")
const maxTokens = 8192
const exampleClusterCount = 2
const availableUnits: UnitNames[] = [
    "Organism Organization and Homeostasis",
    "Genetics",
    "Biochemistry",
    "Ecology and Human Impacts on Ecosystems",
    "The Carbon Cycle",
    "Reproduction",
    "Evolution"
]

const reviewQuestionGenerator = new ReviewQuestionGenerator(client, model, reviewSystemPrompt, maxTokens, MCQuestionListSchema)
const reviewQuestions: z.infer<typeof MCQuestionSchema>[] = []
for (const unit of availableUnits) {
    const newQuestions = await reviewQuestionGenerator.generate(reviewUserPrompt, unit, 10)
    reviewQuestions.push(...newQuestions["questionList"])
}

await fs.writeFile("./src/firebase/question-generation/review-questions.json", JSON.stringify(reviewQuestions, null, 4), "utf-8")


// const clusterGenerator = new ClusterGenerator(client, model, clusterSystemPrompt, maxTokens, ClusterSchema, exampleClusterCount)
