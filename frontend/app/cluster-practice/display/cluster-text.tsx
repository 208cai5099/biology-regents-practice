import { ClusterText } from "@/app/types"

interface TextProps {
    textSection: ClusterText
}

export default function Text({textSection}: TextProps) {
    return (
        <p className="text-left mx-5">
            {textSection["sentencesArray"].join(" ")}
        </p>
    )
}