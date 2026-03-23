import fs from "fs/promises";
import { Cluster, PhenomenaList, UnitNames, ScienceStandard, Unit, MCQuestion } from "./types.js";
import { db } from "./setup.js";
import { MCQuestionSchema } from "./question-generation/review-generator.js";
import { EntireClusterSchema, TitleSchema } from "./question-generation/cluster-generator.js";
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

const addReviewQuestions = async(questionsList: MCQuestion[]) => {

  try {

    // get the current count of questions in this unit
    const countsDocRef = db.collection("practice_questions").doc("review_questions_counts")
    const countsSnapshot = await countsDocRef.get()

    if (countsSnapshot.exists) {

      const countsDoc = countsSnapshot.data() as Record<UnitNames, number> 

      const batch = db.batch()
      for (const question of questionsList) {
        const unit = question["unitName"]
        countsDoc[unit] += 1
        const newQuestionNumber = countsDoc[unit]
        const newQuestionDocRef = db.collection("practice_questions").doc("review_questions").collection(unit).doc(`${unit}_${newQuestionNumber}`)
        batch.set(newQuestionDocRef, question)
      }

      batch.set(countsDocRef, countsDoc)
      await batch.commit()

    }

  } catch (error) {
    throw error
  }

}

const addPracticeCluster = async(clustersList: z.infer<typeof EntireClusterSchema>[]) => {

  try {
    
    const batch = db.batch()
    for (const cluster of clustersList) {
      const section = cluster["clusterSectionArray"].find((section) => section["sectionType"] === "title")
      if (section !== undefined && "clusterTitle" in section["sectionObject"]) {
        const clusterTitle = section["sectionObject"]["clusterTitle"]
        const clusterTitleUnderscore = clusterTitle.replaceAll(" ", "_").toLowerCase()
        const newClusterDocRef = db.collection("practice_clusters").doc(`practice_${clusterTitleUnderscore}`)
        batch.set(newClusterDocRef, cluster)
      }
    }

    await batch.commit()

  } catch (error) {
    throw error
  }
}

const fetchReviewQuestions = async(units: UnitNames[]) => {

  try {

    const reviewQuestionsList: z.infer<typeof MCQuestionSchema>[] = []

    for (const unit of units) {

      const collectionRef = db.collection("practice_questions").doc("review_questions").collection(unit)
      const collectionSnapshot = await collectionRef.get()
      collectionSnapshot.docs.forEach((doc) => {
        reviewQuestionsList.push(doc.data() as z.infer<typeof MCQuestionSchema>)
      })

    }

    return reviewQuestionsList

  } catch (error) {
    throw error
  }
}

const fetchOfficialClusters = async() => {

  try {

    const clusterList: z.infer<typeof EntireClusterSchema>[] = []
    const collectionRef = db.collection("official_clusters")
    const snapshot = await collectionRef.get()
    snapshot.forEach(doc => clusterList.push(doc.data() as z.infer<typeof EntireClusterSchema>))
    return clusterList

  } catch (error) {
    throw error
  }

}

export { 
  readJSONFile,
  addStandard, 
  addCluster, 
  addReviewQuestions, 
  addUnit, 
  addPracticeCluster,
  fetchOfficialClusters, 
  fetchReviewQuestions 
}