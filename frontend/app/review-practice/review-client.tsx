'use client'

import QuestionMenu from "@/app/review-practice/question-menu"
import { useState, useEffect } from "react"
import { firebaseApp } from "@/lib/utils"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import type { MultipleChoiceQuestion, UnitNames } from "../types"
import MultipleChoiceCard from "@/components/ui/multiple-choice"
import BlankMultipleChoiceCard from "@/components/ui/blank-multiple-choice"
import UnitMenu from "../../components/ui/unit-menu"

const EMPTY_COUNTS: Record<UnitNames, number> = {
    "Biochemistry": 0,
    "Ecology and Human Impacts on Ecosystems": 0,
    "Evolution": 0,
    "Genetics": 0,
    "Organism Organization and Homeostasis": 0,
    "Reproduction": 0,
    "The Carbon Cycle": 0
}

const INITIAL_PERFORMANCE_RECORDS: Record<UnitNames, number[]> = {
    "Biochemistry": [],
    "Ecology and Human Impacts on Ecosystems": [],
    "Evolution": [],
    "Genetics": [],
    "Organism Organization and Homeostasis": [],
    "Reproduction": [],
    "The Carbon Cycle": []
}

const BLANK_QUESTION: MultipleChoiceQuestion = {
    unitName: "Biochemistry",
    questionNumber: -1,
    question: "",
    wrongChoices: [],
    correctAnswer: ""
}

const REVIEW_PERFORMANCE_STORAGE_NAME = "reviewPerformances"

const fetchFirestoreDoc = async(docPath: string) => {

    const db = getFirestore(firebaseApp)
    const docRef = doc(db, docPath)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) return docSnapshot.data()
    else return {}

}

export default function ReviewClient() {

    const [questionCounts, setQuestionCounts] = useState<Record<string, number>>(EMPTY_COUNTS)
    const [chosenQuestion, setChosenQuestion] = useState<MultipleChoiceQuestion>(BLANK_QUESTION)
    const [chosenUnit, setChosenUnit] = useState<UnitNames>("Biochemistry")
    const [performance, setPerformance] = useState<Record<string, number[]>>(INITIAL_PERFORMANCE_RECORDS)

    const handleQuestionFetch = async(unit: UnitNames, questionNumber: number) => {
        const questionDoc = await fetchFirestoreDoc(`practice_questions/review_questions/${unit}/${unit}_${questionNumber}`) as MultipleChoiceQuestion
        setChosenQuestion(questionDoc)
    }

    const handleSelectUnit = (unit: UnitNames) => {
        setChosenUnit(unit)
        setChosenQuestion(BLANK_QUESTION)
    }

    const handleSubmittedAnswer = (chosenAnswer: string) => {

        if (chosenUnit === chosenQuestion["unitName"]) {
            const questionNumber = chosenQuestion["questionNumber"]
            const result = chosenQuestion["correctAnswer"] === chosenAnswer
            const performance = sessionStorage.getItem(REVIEW_PERFORMANCE_STORAGE_NAME)
            if (result && performance) {
                const performanceJSON = JSON.parse(performance)
                if (!performanceJSON[chosenUnit].includes(questionNumber)) {
                    performanceJSON[chosenUnit].push(questionNumber)
                    sessionStorage.setItem(REVIEW_PERFORMANCE_STORAGE_NAME, JSON.stringify(performanceJSON, null))
                    setPerformance(performanceJSON)
                }
            }
        }

    }

    useEffect(() => {

        const fetchCountDoc = async() => {
            const countDoc = await fetchFirestoreDoc("practice_questions/review_questions_counts")
            setQuestionCounts(countDoc)
        }

        fetchCountDoc()

        // upon loading, find which questions have been answered correctly
        const performance = sessionStorage.getItem(REVIEW_PERFORMANCE_STORAGE_NAME)
        if (performance === null) {
            sessionStorage.setItem(REVIEW_PERFORMANCE_STORAGE_NAME, JSON.stringify(INITIAL_PERFORMANCE_RECORDS, null))
        } else {
            setPerformance(JSON.parse(performance))
        }

    }, [])

    return (
        <div className="flex flex-col md:flex-row mt-5 gap-10">

            <div className="flex flex-col self-center md:self-start md:ml-10 w-8/10 md:w-1/4">
                <UnitMenu onSelectUnit={handleSelectUnit} />
                <QuestionMenu counts={questionCounts} unit={chosenUnit} onSelectQuestion={handleQuestionFetch} performanceRecords={performance}/>
            </div>
            
            <div className="flex flex-col flex-1 h-screen justify-start items-center">
                {chosenQuestion["questionNumber"] !== -1 ? <MultipleChoiceCard question={chosenQuestion} onSelectAnswer={handleSubmittedAnswer}/> : <BlankMultipleChoiceCard />}
            </div>
        </div>
    )
}