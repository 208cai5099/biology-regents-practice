export interface ScienceStandard {
    topic: string,
    standard_code: string,
    performance_expectation: string,
    clarification_statement: string
}

export interface Unit {
    unit: string,
    core_ideas: string[]
}

export interface Question {
    number: number,
    question: string,
    answer: string,
    standard: string
}

export interface Cluster {
    source_name: string,
    title: string,
    content: string,
    questions: Question[],
    phenomenon: string[],
    standards: string[]
}

export interface PhenomenaList {
    already_used: string[],
    new_phenomena: string[]
}

export type UnitNames = "Organism Organization and Homeostasis" | "Genetics" | "Biochemistry" | "Ecology and Human Impacts on Ecosystems" | "The Carbon Cycle" | "Reproduction" | "Evolution"
