import fs from "fs/promises";
import { Cluster, PhenomenaList, ScienceStandard, Unit } from "./types.js";
import { db } from "./setup.js";
import { MCQuestionSchema } from "./question-generation/review-generator.js";
import { z } from "zod"

const addStandard = async(standard: ScienceStandard) => {

  const standardCode = standard["standard_code"]
  const docRef = db.collection("standards").doc(standardCode)
  return await docRef.set(standard)

}

const addCluster = async(cluster: Cluster) => {

  const clusterID = `${cluster.source_name}_${cluster.title.toLowerCase().replaceAll(" ", "_")}`
  const docRef = db.collection("official_clusters").doc(clusterID)
  return await docRef.set(cluster)

}

const addUnit = async(unit: Unit) => {
  
  const unitName = unit["unit"]
  const docRef = db.collection("biology_units").doc(unitName)
  return await docRef.set(unit)

}

const readJSONFile = async(filepath: string) => {

  try {
    
    const docText = await fs.readFile(filepath, "utf-8")
    return JSON.parse(docText)

  } catch (error) {
    throw error
  }

}

const addReviewQuestions = async(questionsList: z.infer<typeof MCQuestionSchema>[]) => {

  try {

    const batch = db.batch()
    for (const question of questionsList) {
      const unitQuestionsCollection = db.collection("practice_questions").doc("review_questions").collection(question["unitName"])
      const docRef = unitQuestionsCollection.doc()
      batch.set(docRef, question)
    }

    await batch.commit()

  } catch (error) {
    throw error
  }

}
