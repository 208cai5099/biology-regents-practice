"use client"

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"

const ALL_UNITS = [
    "Biochemistry",
    "Ecology and Human Impacts on Ecosystems",
    "Evolution",
    "Genetics",
    "Organism Organization and Homeostasis",
    "Reproduction",
    "The Carbon Cycle"
]

export default function QuestionMenu() {
    return (
        <div className="flex flex-col">
            <Combobox items={ALL_UNITS}>
            <ComboboxInput placeholder="Select a topic" />
            <ComboboxContent>
                <ComboboxEmpty>No matching topic found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                        {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
            </Combobox>

            <div>
                
            </div>
        </div>
    )
}