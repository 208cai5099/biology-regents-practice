'use client'

import { useState, useEffect } from "react"
import { Button } from "./button"
import { MultipleChoiceQuestion } from "@/app/types"

const CORRECT_ANSWER_SHADOW = "#D0E8C2"
const CORRECT_ANSWER_COLOR = "#2A6E3F"
const BLACK_COLOR = "#000"

interface MultipleChoiceCardProps {
    question: MultipleChoiceQuestion
    onSelectAnswer: (chosenAnswer: string) => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function MultipleChoiceCard({ question, onSelectAnswer }: MultipleChoiceCardProps) {

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [chosenChoice, setChosenChoice] = useState("")
    const [isWrong, setIsWrong] = useState(false)
    const [shuffledChoices, setShuffledChoices] = useState<string[]>([])

    useEffect(() => {

        setIsSubmitted(false)
        setChosenChoice("")
        setIsWrong(false)
        setShuffledChoices(shuffleArray([...question["wrongChoices"], question["correctAnswer"]]))

    }, [question])

    const handleChoice = (choice: string) => {
        if (chosenChoice === choice) setChosenChoice("")
        else setChosenChoice(choice)
    }

    const handleTextColor = (choice: string) => {
        if (!isSubmitted) return BLACK_COLOR
        return choice === question["correctAnswer"] ? CORRECT_ANSWER_COLOR : BLACK_COLOR
    }

    return (
        <div
            className={`flex flex-col justify-center rounded-2xl w-8/10 gap-y-5 p-5 ${isWrong ? " animate-shake" : ""}`}
            style={{
                boxShadow: isSubmitted && chosenChoice === question["correctAnswer"] ? `0 0 5px 2px ${CORRECT_ANSWER_SHADOW}` : "0 0 1px 1px gray"
            }}
        >

            <p className="font-bold">{question["question"]}</p>
            
            <div role="group" className="flex flex-col w-full gap-5">
                {
                    shuffledChoices.map((choice, idx) => {
                        return (
                            <div
                                key={`choice-${idx + 1}`}
                                className="flex flex-row w-full gap-2 p-2 border border-gray-200 rounded-md"
                                style={{
                                    background: isSubmitted && choice === question["correctAnswer"] ? CORRECT_ANSWER_SHADOW : ""
                                }}
                            >
                                <input
                                    type="checkbox" 
                                    id={`choice-${idx + 1}`}
                                    name={`choice-${idx + 1}`}
                                    onChange={() => handleChoice(choice)}
                                    disabled={isSubmitted}
                                    checked={choice === chosenChoice}
                                    className={`accent-black`}
                                />
                                <label 
                                    className={`${!isSubmitted ? "cursor-pointer" : ""}`}
                                    htmlFor={`choice-${idx + 1}`}
                                    style={{
                                        color: handleTextColor(choice)
                                    }}
                                >
                                    {choice}
                                </label>
                            </div>
                        )
                    })
                }
            </div>

            <button 
                className="w-3/10 h-[30px] self-center cursor-pointer text-center text-white rounded-md bg-deepgreen active:bg-deepgreen/50 disabled:opacity-50"
                style={{
                    pointerEvents: isSubmitted || chosenChoice === "" ? "none" : "auto"
                }}
                disabled={isSubmitted || chosenChoice === ""}
                onClick={async() => {
                    if (chosenChoice !== question["correctAnswer"]) setIsWrong(true)
                    setIsSubmitted(true)
                    onSelectAnswer(chosenChoice)
                }}
            >
                Submit
            </button>

        </div>
    )
}
