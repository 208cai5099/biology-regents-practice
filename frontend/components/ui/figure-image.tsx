import { ClusterFigure } from "@/app/types";
import Image from "next/image";

interface FigureImageProps {
    figureSection: ClusterFigure
}

function createImageComponent(imageURL: string, imageAttribution: string, figureTitle: string) {

    const width = 200
    const height = Math.round(width * 1.5)

    return (
        <div className="flex flex-col">
            <Image
                src={imageURL}
                alt={`Figure image for ${figureTitle}`}
                width={width}
                height={height}
                style={{
                    height: "auto",
                    alignSelf: "center",
                    filter: "grayscale(100%)"
                }}
            >
            </Image>
            <a className="self-end text-sm" href={imageURL} target="_blank" rel="noopener noreferrer">{imageAttribution}</a>
        </div>
    )

}

export default function FigureImage({figureSection}: FigureImageProps) {

    const imageURL = figureSection["imageURL"]
    const imageAttribution = figureSection["imageAttribution"]
    const figureTitle = figureSection["figureTitle"]

    return (
        <div>
            {imageURL && imageAttribution ? createImageComponent(imageURL, imageAttribution, figureTitle) : <></>}
        </div>
    )
}