import { ClusterSectionObject, ClusterTitle } from "@/app/types"

interface TitlePrps {
    titleSection: ClusterTitle
}

export default function Title({titleSection}: TitlePrps) {
    return (
        <h1 className="text-2xl font-bold text-center">
            {titleSection["clusterTitle"]}
        </h1>
    )
}