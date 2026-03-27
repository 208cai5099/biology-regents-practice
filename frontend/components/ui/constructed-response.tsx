import { ClusterConstructedResponse } from "@/app/types"
import { useState } from "react"

interface ConstructedResponseProps {
    constructedResponseSection: ClusterConstructedResponse
    onSelectAnswer: (submittedAnswer: string, questionNumber: number) => void
}

export default function ConstructedResponse({constructedResponseSection, onSelectAnswer}: ConstructedResponseProps) {

    const [currentAnswer, setCurrentAnswer] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const questionNumber = constructedResponseSection["questionNumber"]
    const question = constructedResponseSection["question"]
    const acceptableAnswers = constructedResponseSection["acceptableAnswers"]

    return (
        <div
            className="flex flex-col justify-center border rounded-2xl w-8/10 gap-y-5 p-5"
        >
            <p className="font-bold">{`Question ${questionNumber}: `}{question}</p>
            <textarea
                className="w-full border border-gray-500 resize-none p-2 focus:outline-none focus:ring-1 focus:ring-deepgreen"
                rows={10}
                placeholder="Enter your answer here"
                onChange={(event) => setCurrentAnswer(event.target.value.trim())}
                disabled={isSubmitted}
            />
            <button 
                className="w-3/10 h-[30px] self-center cursor-pointer text-center text-white rounded-md bg-deepgreen active:bg-deepgreen/50 disabled:opacity-50"
                style={{
                    pointerEvents: isSubmitted || currentAnswer.length === 0 ? "none" : "auto"
                }}
                disabled={currentAnswer.length === 0 || isSubmitted}
                onClick={async() => {
                    onSelectAnswer(currentAnswer, questionNumber)
                    setIsSubmitted(true)
                }}
            >
                Submit
            </button>
            {isSubmitted ? 
                <div className="flex flex-col gap-5">
                    <p className="font-semibold">Here are examples of valid answers. Use them to verify whether your answer is complete and correct.</p>
                    <ul className="list-disc pl-5">
                        {acceptableAnswers.map((example, idx) => <li key={`example answer ${idx + 1}`}>{example}</li>)}
                    </ul>
                </div> : <></>
            }
        </div>
    )
}