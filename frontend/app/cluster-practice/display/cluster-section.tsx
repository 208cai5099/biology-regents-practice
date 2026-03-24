import { ClusterMultipleChoiceQuestion, ClusterConstructedResponse, ClusterSection, ClusterText, ClusterTitle, ClusterFigure } from "@/app/types"
import Title from "./cluster-title"
import Text from "./cluster-text"
import MultipleChoiceCard from "@/components/ui/multiple-choice"
import ConstructedResponse from "@/components/ui/constructed-response"
import FigureRouter from "@/components/ui/figure-router"

interface ClusterSectionProps {
    clusterSection: ClusterSection,
    recordAnswers: (submittedAnswer: string, questionNumber: number) => void
}

function getSectionComponent(clusterSection: ClusterSection, recordAnswers: (submittedAnswer: string, questionNumber: number) => void) {
    
    switch (clusterSection["sectionType"]) {

        case "title":
            return <Title titleSection={clusterSection["sectionObject"] as ClusterTitle} />
        
        case "text":
            return <Text textSection={clusterSection["sectionObject"] as ClusterText} />

        case "multiple-choice":
            return (
                <div className="flex justify-center">
                    <MultipleChoiceCard question={clusterSection["sectionObject"] as ClusterMultipleChoiceQuestion} onSelectAnswer={recordAnswers} />
                </div>
            )

        case "constructed-response":
            return <ConstructedResponse question={clusterSection["sectionObject"] as ClusterConstructedResponse}/>

        case "figure":
            return <FigureRouter figureSection={clusterSection["sectionObject"] as ClusterFigure} />

    }
    
}

export default function Section({clusterSection, recordAnswers}: ClusterSectionProps) {
    return getSectionComponent(clusterSection, recordAnswers)
}