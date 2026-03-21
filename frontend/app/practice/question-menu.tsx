"use client"

import { useState } from "react"
import { UnitNames } from "@/app/types"

interface QuestionMenuProps {
    counts: Record<string, number>,
    unit: UnitNames,
    onSelectQuestion: (unit: UnitNames, questionNumber: number) => Promise<void> 
}

export default function QuestionMenu({counts, unit, onSelectQuestion}: QuestionMenuProps) {

    const [chosenQuestionNumber, setChosenQuestionNumber] = useState(-1)

    return (
        <div className="flex flex-col max-h-[300px] md:max-h-screen w-full overflow-hidden">    

            <div className="flex-1 overflow-y-auto">
                {Array.from({length: counts[unit]}).map((_, idx) => {
                    return (
                        <button
                            key={`${unit}_${idx + 1}`}
                            className="relative flex flex-row items-center cursor-pointer border border-gray-400 rounded-2xl h-8 w-full my-1 hover:bg-gray-200 active:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={() => {
                                onSelectQuestion(unit, idx + 1)
                                setChosenQuestionNumber(idx + 1)
                            }}
                            disabled={idx + 1 === chosenQuestionNumber}
                            aria-label={`Get question ${idx + 1}`}
                        >
                            <div className="absolute bottom-1 left-2 ml-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold mr-2 shrink-0">
                                    {idx + 1}
                                </span>
                            </div>

                            <p className="flex-1 text-center">
                                Question {idx + 1}
                            </p>
                        </button>
                    )
                })}
            </div>

        </div>
    )
}