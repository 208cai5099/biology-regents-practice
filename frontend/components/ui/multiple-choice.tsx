'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useState, useEffect } from "react"
import { Button } from "./button"
import { MultipleChoiceQuestion } from "@/app/types"

const CORRECT_ANSWER_SHADOW = "#A8D86E"
const CORRECT_ANSWER_COLOR = "#2A6E3F"
const BLACK_COLOR = "#000"

interface MultipleChoiceCardProps {
    question: MultipleChoiceQuestion
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function MultipleChoiceCard({ question }: MultipleChoiceCardProps) {

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

    const handleStrikethrough = (choice: string) => {
        if (!isSubmitted) return false
        return choice !== question["correctAnswer"]
    }

    return (
        <div
            className={`flex flex-col justify-center rounded-2xl w-8/10 gap-y-5 p-5 ${isWrong ? " animate-shake" : ""}`}
            style={{
                boxShadow: isSubmitted && chosenChoice === question["correctAnswer"] ? `0 0 5px 2px ${CORRECT_ANSWER_SHADOW}` : "0 0 1px 1px gray"
            }}
        >

            <p className="font-bold">{question["question"]}</p>
            
            <div className="flex flex-col w-full">
                <FieldGroup className="w-full">
                    {shuffledChoices.map((choice, idx) => {
                        return (
                            <Field 
                                orientation="horizontal" 
                                key={`choice-${idx}`} 
                                className="w-full"
                            >
                                <Checkbox
                                    id={`choice-${idx}`}
                                    name={`choice-${idx}`}
                                    checked={chosenChoice === choice}
                                    className={`cursor-pointer ${chosenChoice === choice ? "bg-black text-white" : ""}`}
                                    style={{ 
                                        background: isSubmitted && choice === question["correctAnswer"] ? "green" : "",
                                        borderColor: isSubmitted && choice === question["correctAnswer"] ? "green" : "",
                                        pointerEvents: isSubmitted || (chosenChoice !== "" && chosenChoice !== choice) ? "none" : "auto"
                                    }}
                                    onClick={() => handleChoice(choice)}
                                />
                                <FieldLabel 
                                    htmlFor={`choice-${idx}`}
                                    className="cursor-pointer"
                                    style={{
                                        color: handleTextColor(choice),
                                        textDecoration: handleStrikethrough(choice) ? "line-through" : "",
                                        pointerEvents: isSubmitted || (chosenChoice !== "" && chosenChoice !== choice) ? "none" : "auto", 
                                        fontWeight: isSubmitted && choice === question["correctAnswer"] ? 1000 : ""
                                    }}
                                >
                                    {choice}
                                </FieldLabel>
                            </Field>
                        )
                    })}
                </FieldGroup>
            </div>

            <Button 
                className="w-3/10 self-center cursor-pointer text-white bg-card-button active:bg-card-button/50"
                disabled={isSubmitted || chosenChoice === ""}
                onClick={() => {
                    if (chosenChoice !== question["correctAnswer"]) setIsWrong(true)
                    setIsSubmitted(true)
                }}
            >
                Submit
            </Button>

        </div>
    )
}
