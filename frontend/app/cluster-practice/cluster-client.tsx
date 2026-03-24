'use client'

import { useState, useEffect } from "react"
import { firebaseApp } from "@/lib/utils"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import type { UnitNames, Cluster } from "../types"
import UnitMenu from "../../components/ui/unit-menu"
import ClusterMenu from "./cluster-menu"

const fetchFirestoreDoc = async(docPath: string) => {

    const db = getFirestore(firebaseApp)
    const docRef = doc(db, docPath)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) return docSnapshot.data()
    else return {}

}

const EMPTY_IDENTIFIERS: Record<UnitNames, Record<string, any>[]> = {
    "Biochemistry": [{}],
    "Ecology and Human Impacts on Ecosystems": [{}],
    "Evolution": [{}],
    "Genetics": [{}],
    "Organism Organization and Homeostasis": [{}],
    "Reproduction": [{}],
    "The Carbon Cycle": [{}]
}

const EMPTY_CLUSTER: Cluster = {
    clusterNumber: -1,
    unitArray: [],
    clusterSectionArray: []
}

export default function ClusterClient() {

    const [clusterIdentifiers, setClusterIdentifiers] = useState(EMPTY_IDENTIFIERS)
    const [chosenUnit, setChosenUnit] = useState<UnitNames>("Biochemistry")
    const [chosenCluster, setChosenCluster] = useState(EMPTY_CLUSTER)

    const handleSelectUnit = (unit: UnitNames) => {
        setChosenUnit(unit)
    }

    const fetchCluster = async(clusterRef: any) => {

        const clusterSnapshot = await getDoc(clusterRef)
        if (clusterSnapshot.exists()) {
            setChosenCluster(clusterSnapshot.data() as Cluster)
        }

    }

    useEffect(() => {

        const fetchClusterIdentifiers = async() => {
            let identifiersDoc = await fetchFirestoreDoc("practice_clusters/practice_clusters_identifiers") as Record<UnitNames, Record<string, any>[]>
            for (const unit of Object.keys(identifiersDoc) as UnitNames[]) {
                const clusterIdentifiers = identifiersDoc[unit]
                identifiersDoc[unit] = clusterIdentifiers.filter(identifier => Object.keys(identifier).length)
            }
            setClusterIdentifiers(identifiersDoc)
        }

        fetchClusterIdentifiers()
    }, [])

    return (
        <div className="flex flex-col md:flex-row mt-5 gap-10">

            <div className="flex flex-col self-center md:self-start md:ml-10 w-8/10 md:w-1/4">
                <UnitMenu onSelectUnit={handleSelectUnit} />
                <ClusterMenu availableClusters={clusterIdentifiers[chosenUnit]} unit={chosenUnit} selectCluster={fetchCluster}/>
            </div>
            
            <div className="flex flex-col flex-1 h-screen justify-start items-center">
            </div>
        </div>
    )
}