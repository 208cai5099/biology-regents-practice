export interface MultipleChoiceQuestion {
    unitName: UnitNames,
    questionNumber: number,
    question: string,
    wrongChoices: string[],
    correctAnswer: string
}

export type UnitNames = "Biochemistry" | "Ecology and Human Impacts on Ecosystems" | "Evolution" | "Genetics" | "Organism Organization and Homeostasis" | "Reproduction" | "The Carbon Cycle" | ""