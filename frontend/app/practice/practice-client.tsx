'use client'

import QuestionMenu from "@/components/question-menu/question-menu"
import { useState, useEffect } from "react"
import { firebaseApp } from "@/lib/utils"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import type { MultipleChoiceQuestion, UnitNames } from "../types"
import MultipleChoiceCard from "@/components/ui/multiple-choice"
import BlankMultipleChoiceCard from "@/components/ui/blank-multiple-choice"


const ALL_UNITS: UnitNames[] = [
    "Biochemistry",
    "Ecology and Human Impacts on Ecosystems",
    "Evolution",
    "Genetics",
    "Organism Organization and Homeostasis",
    "Reproduction",
    "The Carbon Cycle"
]

const EMPTY_COUNTS = {
    "Biochemistry": 0,
    "Ecology and Human Impacts on Ecosystems": 0,
    "Evolution": 0,
    "Genetics": 0,
    "Organism Organization and Homeostasis": 0,
    "Reproduction": 0,
    "The Carbon Cycle": 0
}

const BLANK_QUESTION: MultipleChoiceQuestion = {
    unitName: "",
    questionNumber: -1,
    question: "",
    wrongChoices: [],
    correctAnswer: ""
}

const fetchFirestoreDoc = async(docPath: string) => {

    const db = getFirestore(firebaseApp)
    const docRef = doc(db, docPath)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) return docSnapshot.data()
    else return {}

}

export default function PracticeClient() {

    const [questionCounts, setQuestionCounts] = useState<Record<string, number>>(EMPTY_COUNTS)
    const [chosenQuestion, setChosenQuestion] = useState<MultipleChoiceQuestion>(BLANK_QUESTION)

    const handleQuestionFetch = async(unit: UnitNames, questionNumber: number) => {
        const questionDoc = await fetchFirestoreDoc(`practice_questions/review_questions/${unit}/${unit}_${questionNumber}`) as MultipleChoiceQuestion
        setChosenQuestion(questionDoc)
    }

    useEffect(() => {

        const fetchCountDoc = async() => {
            const countDoc = await fetchFirestoreDoc("practice_questions/review_questions_counts")
            setQuestionCounts(countDoc)
        }

        fetchCountDoc()

    }, [])

    return (
        <div className="flex flex-col md:flex-row">

            <QuestionMenu counts={questionCounts} units={ALL_UNITS} onSelectQuestion={handleQuestionFetch}/>
            
            <div className="flex flex-col flex-1 h-screen justify-start items-center mt-5">
                {chosenQuestion["unitName"] !== "" ? <MultipleChoiceCard question={chosenQuestion}/> : <BlankMultipleChoiceCard />}
            </div>
        </div>
    )
}