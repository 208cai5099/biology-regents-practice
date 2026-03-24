"use client"

import { useEffect, useState } from "react"
import { UnitNames } from "@/app/types"

interface QuestionMenuProps {
    availableClusters: Record<string, any>[],
    unit: UnitNames,
    selectCluster: (clusterRef: any) => Promise<void>
}

export default function ClusterMenu({availableClusters, unit, selectCluster}: QuestionMenuProps) {

    return (
        <div className="flex flex-col max-h-[300px] md:max-h-screen w-full overflow-hidden">    

            <div className="flex-1 overflow-y-auto">
                {availableClusters.map((cluster, idx) => {
                    return (
                        <button
                            key={`${unit}_${idx + 1}`}
                            className=" text-center cursor-pointer border border-gray-400 rounded-2xl h-8 w-full my-1 hover:bg-gray-200 active:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none"
                            aria-label={`Get cluster titled ${cluster["clusterTitle"]}`}
                            onClick={async() => await selectCluster(cluster["clusterRef"])}
                        >
                            <p className="flex-1">
                                {cluster["clusterTitle"]}
                            </p>
                        </button>
                    )
                })}
            </div>

        </div>
    )
}