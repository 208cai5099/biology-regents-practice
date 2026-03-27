'use client'

import Section from "./cluster-section";
import { Cluster } from "@/app/types"
import { useState } from "react";

interface ClusterDisplayProps {
    cluster: Cluster,
    recordAnswers: (submittedAnswer: string, questionNumber: number) => void
}

export default function ClusterDisplay({cluster, recordAnswers}: ClusterDisplayProps) {

    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="relative flex flex-col w-full gap-5">
            <span 
                className="absolute top-[-20] right-2 md:top-2 md:right-5 cursor-pointer bg-black rounded-full"
                onClick={() => setShowInfo(true)}
            >
                <p 
                    className="text-center text-white w-[25px] h-[25px]"
                    onMouseOver={() => setShowInfo(true)}
                    onMouseOut={() => setShowInfo(false)}
                >
                    i
                </p>

                <div className={`absolute right-0 w-60 p-2 text-sm bg-white border border-gray-300 rounded-md shadow-lg ${showInfo ? "opacity-100" : "opacity-0"}`}>
                    <p>Units Covered:</p>
                    <ul className="list-disc pl-5">
                    {cluster.unitArray.map((unit) => {
                        return (
                            <li key={unit}>{unit}</li>
                        )
                    })}
                    </ul>
                </div>
              </span>
            {cluster["clusterSectionArray"].map((section, idx) => <Section key={`section_${idx + 1}`} clusterSection={section} recordAnswers={recordAnswers} />)}
        </div>
    )
}