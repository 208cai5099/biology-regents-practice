"use client"

import { useEffect, useState } from "react"
import { UnitNames } from "@/app/types"

interface QuestionMenuProps {
    counts: Record<string, number>,
    unit: UnitNames,
    onSelectQuestion: (unit: UnitNames, questionNumber: number) => Promise<void> ,
    performanceRecords: Record<string, number[]>
}

const CORRECT_BADGE_COLOR = "#37753B"
const CORRECT_BACKGROUND_COLOR = "#D0E8C2"

export default function QuestionMenu({counts, unit, onSelectQuestion, performanceRecords}: QuestionMenuProps) {

    const [chosenQuestionNumber, setChosenQuestionNumber] = useState(-1)

    const checkPeformanceRecords = (unit: UnitNames, questionNumber: number) => {
        return performanceRecords[unit].includes(questionNumber)
    }

    useEffect(() => {
        setChosenQuestionNumber(-1)
    }, [unit])

    return (
        <div className="flex flex-col max-h-[300px] md:max-h-screen w-full overflow-hidden">    

            {counts[unit] ?
            
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
                            style={{
                                background: checkPeformanceRecords(unit, idx + 1) ? CORRECT_BACKGROUND_COLOR : "" 
                            }}
                            disabled={idx + 1 === chosenQuestionNumber}
                            aria-label={`Get question ${idx + 1}`}
                        >
                            <div className="absolute bottom-1 left-2 ml-2">
                                <span 
                                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[11px] font-bold mr-2 shrink-0"
                                    style={{
                                        background: checkPeformanceRecords(unit, idx + 1) ? CORRECT_BADGE_COLOR : "black" 
                                    }}
                                >
                                    {idx + 1}
                                </span>
                            </div>

                            <p className="flex-1 text-center">
                                Question {idx + 1}
                            </p>
                        </button>
                    )
                })}
            </div> :
            <p className="self-center my-5">No questions are available yet</p>
            }

        </div>
    )
}