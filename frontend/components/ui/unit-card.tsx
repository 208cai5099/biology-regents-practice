import { UnitNames } from "@/app/types";
import Image from "next/image";

const IMG_PATHS: Record<UnitNames, string> = {
    "Biochemistry": "test_tube.svg",
    "Ecology and Human Impacts on Ecosystems": "clover.svg",
    "Evolution": "bird.svg",
    "Genetics": "dna.svg",
    "Organism Organization and Homeostasis": "person.svg",
    "Reproduction": "baby.svg",
    "The Carbon Cycle":"cycle.svg"
}

interface UnitCardProps {
    unit: UnitNames,
    unitDescription: string
}

const IMAGE_WIDTH = 100
const IMAGE_HEIGHT = 100

export default function UnitCard({unit, unitDescription}: UnitCardProps) {

    return (
        <div className="flex w-full border rounded-xl">
            <Image
                src={IMG_PATHS[unit]}
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt={`image of ${unit}`}
            ></Image>
            <div className="flex flex-col self-start my-5">
                <h1 className="text-start md:text-center font-semibold">{unit}</h1>
                <p>
                    {unitDescription}
                </p>
            </div>

        </div>
    )
}