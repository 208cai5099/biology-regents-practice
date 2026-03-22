import Image from "next/image"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UnitNames } from "../types"

const IMG_PATHS = {
    "Biochemistry": "test_tube.svg",
    "Ecology and Human Impacts on Ecosystems": "clover.svg",
    "Evolution": "bird.svg",
    "Genetics": "dna.svg",
    "Organism Organization and Homeostasis": "person.svg",
    "Reproduction": "baby.svg",
    "The Carbon Cycle":"rock.svg"
}

interface UnitMenuProps {
    onSelectUnit: (unit: UnitNames) => void
}

export default function UnitMenu({onSelectUnit}: UnitMenuProps){

    return (
        <Select
            onValueChange={(val) => (onSelectUnit(val as UnitNames))}
        >
            <SelectTrigger
                className="w-full"
            >
                <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent
                className="bg-white"
            >
                <SelectGroup>
                {
                    Object.entries(IMG_PATHS).map(([unit, path], idx) => {
                        return (
                            <SelectItem 
                                key={unit}
                                value={unit}
                                className="hover:bg-gray-100 active:bg-gray-300"
                            >
                                <Image
                                    src={path}
                                    width={30}
                                    height={30}
                                    style={{height: "auto"}}
                                    alt={`image of ${path.replace(".svg", "")}`}
                                >
                                </Image>
                                {unit}
                            </SelectItem>
                        )
                    })
                }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}