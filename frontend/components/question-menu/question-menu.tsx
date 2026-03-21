"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { UnitNames } from "@/app/types"

interface QuestionMenuProps {
    counts: Record<string, number>,
    units: UnitNames[],
    onSelectQuestion: (unit: UnitNames, questionNumber: number) => Promise<void> 
}

export default function QuestionMenu({counts, units, onSelectQuestion}: QuestionMenuProps) {

    const [chosenUnit, setChosenUnit] = useState<UnitNames>("")

    return (
        <div className="flex flex-col w-1/4 h-screen overflow-hidden mt-5">
            <select                                                                                                                                     
                className="w-full border border-gray-500 rounded-lg h-9 text-md text-center focus:outline-black"
                onChange={(e) => setChosenUnit(e.target.value as UnitNames)}                                                                                         
                defaultValue=""                                                                                                                         
            >                                                                                                                                           
                <option value="" disabled>Select a topic</option>                                                                                       
                {
                    units.map((unit) => (                                                                                                              
                        <option key={unit} value={unit}>{unit}</option>
                    ))
                }
            </select>      

            <div className="flex-1 overflow-y-auto">
                {Array.from({length: counts[chosenUnit]}).map((_, idx) => {
                    return (
                        <div key={`${chosenUnit}_${idx + 1}`}>
                            <Button
                                className="cursor-pointer justify-start border border-gray-200 rounded-2xl w-full my-1 hover:bg-gray-200 active:bg-gray-400"
                                onClick={() => onSelectQuestion(chosenUnit, idx + 1)}
                            >
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold mr-2 shrink-0">
                                    {idx + 1}
                                </span>
                                Question {idx + 1}
                            </Button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}