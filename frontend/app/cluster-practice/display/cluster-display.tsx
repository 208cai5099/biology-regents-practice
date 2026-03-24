import Section from "./cluster-section";
import Title from "./cluster-title";
import { Cluster, ClusterSection, ClusterTitle } from "@/app/types"

interface ClusterDisplayProps {
    cluster: Cluster,
    recordAnswers: (submittedAnswer: string, questionNumber: number) => void
}

export default function ClusterDisplay({cluster, recordAnswers}: ClusterDisplayProps) {

    return (
        <div className="flex flex-col w-full gap-5">
            {cluster["clusterSectionArray"].map((section, idx) => <Section key={`section_${idx + 1}`} clusterSection={section} recordAnswers={recordAnswers} />)}
        </div>
    )
}