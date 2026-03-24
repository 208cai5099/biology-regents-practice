import { ClusterFigure } from "@/app/types"
import DataTable from "./data-table"
import BarGraph from "./bar-graph"
import LineGraph from "./line-graph"

interface FigureProps {
    figureSection: ClusterFigure
}

function getFigureComponent(figureSection: ClusterFigure) {

    const figureType = figureSection["figureType"]

    switch (figureType) {

        case "image":
            return <p>[Image to be inserted]</p>

        case "bar graph":
            return <BarGraph figureSection={figureSection} />
        
        case "line graph":
            return <LineGraph figureSection={figureSection}/>
        
        default:
            return (
                <DataTable figureSection={figureSection} />
            )
    }

} 

export default function FigureRouter({figureSection}: FigureProps) {
    return (
        <div className="flex flex-col mx-5 gap-5">
            <h1
                className="text-lg font-semibold text-left"
            >
                Figure {figureSection["figureNumber"]}: {figureSection["figureTitle"]}
            </h1>

            {getFigureComponent(figureSection)}
            
        </div>
    )
}