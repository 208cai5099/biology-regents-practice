import Image from "next/image";
import { introImagePaths } from "@/lib/utils";

interface IntroCardProps {
    heading: string,
    description: string
}

const IMAGE_WIDTH = 100
const IMAGE_HEIGHT = 100

export default function IntroCard({heading, description}: IntroCardProps) {

    return (
        <div className="flex w-full border rounded-xl">
            <Image
                src={introImagePaths[heading]}
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt={`image of ${heading}`}
            ></Image>
            <div className="flex flex-col self-start my-5">
                <h1 className="font-semibold">{heading}</h1>
                <p>
                    {description}
                </p>
            </div>

        </div>
    )
}