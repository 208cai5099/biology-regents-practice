import fs from "fs/promises";
import { Cluster, PhenomenaList, ScienceStandard, Unit } from "./types.js";
import { db } from "./setup.js";

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
    return null 
  }

}

// const standards_filepath = "./src/firebase/curriculum_materials/standards/performance_expectations.json"
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

// const coreIdeasFilepath = "./src/firebase/curriculum_materials/standards/core_ideas.json"
// const unitList: Unit[] = await readJSONFile(coreIdeasFilepath)
// for (const unit of unitList) {
//   const res = await addUnit(unit)
// }