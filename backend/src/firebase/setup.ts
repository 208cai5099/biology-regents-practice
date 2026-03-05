import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs/promises";
import { getFirestore } from 'firebase-admin/firestore';
import { Cluster, PhenomenaList, ScienceStandard } from "./types.js";

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

const addStandard = async(standard: ScienceStandard) => {

  const standardCode = standard.standard_code
  const docRef = db.collection("standards").doc(standardCode)
  return await docRef.set(standard)

}

const addCluster = async(cluster: Cluster) => {

  const clusterID = `${cluster.source_name}_${cluster.title.toLowerCase().replaceAll(" ", "_")}`
  const docRef = db.collection("official_clusters").doc(clusterID)
  return await docRef.set(cluster)

}

const readJSONFile = async(filepath: string) => {

  try {
    
    const docText = await fs.readFile(filepath, "utf-8")
    return JSON.parse(docText)

  } catch (error) {
    return null 
  }

}

// const standards_filepath = "./src/firebase/curriculum_materials/standards/relevant_standards.json"
// const standards: ScienceStandard[] = await readJSONFile(standards_filepath)
// for (const standard of standards) {
//   const res = await addStandard(standard)
// }

// const exams_filepath = "./src/firebase/curriculum_materials/exam_materials/all_exam_transcript.json"
// const clusters: Cluster[] = await readJSONFile(exams_filepath)
// for (const cluster of clusters) {
//   const res = await addCluster(cluster)
// }

// const phenomenaFilepath = "./src/firebase/curriculum_materials/phenomena_examples/phenomena_list.json"
// const phenomenaList: PhenomenaList = await readJSONFile(phenomenaFilepath)
// const usedRef = db.collection("phenomena").doc("phenomena")
// await usedRef.set(phenomenaList)
