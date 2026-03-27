import { ClusterFigure } from "@/app/types";
import Image from "next/image";

interface FigureImageProps {
    figureSection: ClusterFigure
}

function createImageComponent(imageURL: string, imageAttribution: string, figureNumber: number, figureTitle: string) {

    const width = 500
    const height = Math.round(width * 1.5)

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-col" style={{ minWidth: "max-content" }}>
            <h1
                className="text-lg font-semibold text-left"
            >
                Figure {figureNumber}: {figureTitle}
            </h1>
            <Image
                src={imageURL}
                alt={`Figure image for ${figureTitle}`}
                width={width}
                height={height}
                style={{
                    width: `${width}px`,
                    height: "auto",
                    filter: "grayscale(100%)",
                    alignSelf: "center"
                }}
            >
            </Image>
            {imageAttribution.length ? 
            <a className="self-center text-sm" href={imageURL} target="_blank" rel="noopener noreferrer">Source: {imageAttribution}</a> :
            <></>
            }
            </div>
        </div>
    )

}

export default function FigureImage({figureSection}: FigureImageProps) {

    const imageURL = figureSection["imageURL"]
    const imageAttribution = figureSection["imageAttribution"]
    const figureTitle = figureSection["figureTitle"]
    const figureNumber = figureSection["figureNumber"]

    return (
        <div>
            {imageURL && imageAttribution !== undefined ? createImageComponent(imageURL, imageAttribution, figureNumber, figureTitle) : <></>}
        </div>
    )
}