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

const writeJSONFile = async(filepath: string, object: object) => {

  try {
    await fs.writeFile(filepath, JSON.stringify(object, null, 4), "utf-8")
  } catch (error) {
    throw error
  }

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

const addPracticeClusters = async(clustersList: any[]) => {

  try {

    // get the number of the practice clusters in each unit
    const countsDocRef = db.collection("practice_clusters").doc("practice_clusters_counts")
    const countsSnapshot = await countsDocRef.get()

    // get the identifiers for the practice clusters in each unit
    const identifiersDocRef = db.collection("practice_clusters").doc("practice_clusters_identifiers")
    const identifiersSnapshot = await identifiersDocRef.get()

    if (countsSnapshot.exists && identifiersSnapshot.exists) {
      
      const countsDoc = countsSnapshot.data() as Record<UnitNames | "Total", number>
      const identifiersDoc = identifiersSnapshot.data() as Record<UnitNames | "Total", Record<string, any>[]>

      const batch = db.batch()
      for (const cluster of clustersList) {
        
        const clusterSections = cluster["clusterSectionArray"] as Record<string, any>[]
        const titleSection = clusterSections.find((section) => section["sectionType"] === "title")
        if (titleSection) {

          const clusterTitle = titleSection["sectionObject"]["clusterTitle"]
          const clusterID = "practice_" + clusterTitle.replaceAll(" ", "_").toLowerCase()
          const newClusterDocRef = db.collection("practice_clusters").doc(clusterID)

          countsDoc["Total"] += 1
          const clusterNumber = countsDoc["Total"]
          cluster["clusterNumber"] = clusterNumber

          const unitArray = cluster["unitArray"] as UnitNames[]
          for (const unit of unitArray) {
            countsDoc[unit] += 1
            identifiersDoc[unit].push({
              clusterNumber: clusterNumber,
              clusterTitle: clusterTitle,
              clusterRef: newClusterDocRef
            })
          }

          batch.set(newClusterDocRef, cluster)

        }

      }
      
      batch.set(identifiersDocRef, identifiersDoc)
      batch.set(countsDocRef, countsDoc)
      await batch.commit()
    }


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

    const clusterList: Cluster[] = []
    const collectionRef = db.collection("official_clusters")
    const snapshot = await collectionRef.get()
    snapshot.forEach(doc => clusterList.push(doc.data() as Cluster))
    return clusterList

  } catch (error) {
    throw error
  }

}

const fetchPracticeClusters = async() => {

  try {

    const clusterList: any[] = []
    const collectionRef = db.collection("practice_clusters")
    const snapshot = await collectionRef.get()
    snapshot.forEach(doc => {
      if (doc.id !== "practice_clusters_counts") {
        clusterList.push(doc.data())
      }
    })
    return clusterList

  } catch (error) {
    throw error
  }

}

export { 
  writeJSONFile,
  readJSONFile,
  addStandard, 
  addCluster, 
  addReviewQuestions, 
  addUnit, 
  addPracticeClusters,
  fetchOfficialClusters, 
  fetchReviewQuestions ,
  fetchPracticeClusters
}