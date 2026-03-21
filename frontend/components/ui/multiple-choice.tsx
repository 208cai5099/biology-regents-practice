'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useState } from "react"
import { Button } from "./button"

type MCQuestion = {
    question: string,
    correctAnswer: number,
    allChoices: string[]
}

const CORRECT_ANSWER_SHADOW = "#A8D86E"
const CORRECT_ANSWER_COLOR = "#2A6E3F"
const BLACK_COLOR = "#000"

export default function MultipleChoiceCard({question, correctAnswer, allChoices}: MCQuestion) {

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [chosenChoice, setChosenChoice] = useState(-1)
    const [isWrong, setIsWrong] = useState(false)

    const handleChoice = (index: number) => {
        if (chosenChoice === index) setChosenChoice(-1)
        else setChosenChoice(index)
    }

    const handleTextColor = (index: number) => {
        if (!isSubmitted) return BLACK_COLOR
        return index === correctAnswer ? CORRECT_ANSWER_COLOR : BLACK_COLOR
    }

    const handleStrikethrough = (index: number) => {
        if (!isSubmitted) return false
        return index !== correctAnswer
    }

    return (
        <div
            className={`flex flex-col justify-center rounded-2xl w-8/10 gap-y-5 p-5 ${isWrong ? " animate-shake" : ""}`}
            style={{
                boxShadow: isSubmitted && chosenChoice === correctAnswer ? `0 0 5px 2px ${CORRECT_ANSWER_SHADOW}` : "0 0 1px 1px gray"
            }}
        >

            <div>
                <p className="font-bold">{question}</p>
            </div>
            
            <div className="flex flex-col w-full">
                <FieldGroup className="w-full">
                    {allChoices.map((choice, idx) => {
                        return (
                            <Field 
                                orientation="horizontal" 
                                key={`choice-${idx}`} 
                                className="w-full"
                            >
                                <Checkbox
                                    id={`choice-${idx}`}
                                    name={`choice-${idx}`}
                                    className="cursor-pointer data-[state=checked]:bg-black data-[state=checked]:text-white"
                                    style={{ 
                                        background: isSubmitted && idx === correctAnswer ? "green" : "",
                                        borderColor: isSubmitted && idx === correctAnswer ? "green" : "",
                                        pointerEvents: isSubmitted || (chosenChoice !== -1 && chosenChoice !== idx) ? "none" : "auto"
                                    }}
                                    onClick={() => handleChoice(idx)}
                                />
                                <FieldLabel 
                                    htmlFor={`choice-${idx}`}
                                    className="cursor-pointer"
                                    style={{
                                        color: handleTextColor(idx),
                                        textDecoration: handleStrikethrough(idx) ? "line-through" : "",
                                        pointerEvents: isSubmitted || (chosenChoice !== -1 && chosenChoice !== idx) ? "none" : "auto", 
                                        fontWeight: isSubmitted && idx === correctAnswer ? 1000 : ""
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
                disabled={isSubmitted || chosenChoice === -1}
                onClick={() => {
                    if (chosenChoice !== correctAnswer) setIsWrong(true)
                    setIsSubmitted(true)
                }}
            >
                Submit
            </Button>

        </div>
    )
}
