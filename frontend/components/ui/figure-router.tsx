import { ClusterFigure } from "@/app/types"
import DataTable from "./data-table"
import BarGraph from "./bar-graph"
import LineGraph from "./line-graph"
import FigureImage from "./figure-image"

interface FigureProps {
    figureSection: ClusterFigure
}

function getFigureComponent(figureSection: ClusterFigure) {

    const figureType = figureSection["figureType"]

    switch (figureType) {

        case "image":
            return <FigureImage figureSection={figureSection}/>

        case "bar graph":
            return <BarGraph figureSection={figureSection} />
        
        case "line graph":
            return <LineGraph figureSection={figureSection}/>
        
        default:
            return <DataTable figureSection={figureSection} />
            
    }

} 

export default function FigureRouter({figureSection}: FigureProps) {
    return (
        <div className="flex flex-col mx-5">
            {getFigureComponent(figureSection)}
            
        </div>
    )
}