export interface MultipleChoiceQuestion {
    unitName: UnitNames,
    questionNumber: number,
    question: string,
    wrongChoices: string[],
    correctAnswer: string
}

export interface ClusterTitle {
  clusterTitle: string
}

export interface ClusterText {
  sentencesArray: string[]
}

export interface ClusterMultipleChoiceQuestion {
  questionType: "multiple-choice",
  questionNumber: number,
  questionWording: string,
  wrongChoices: string[]
  correctAnswer: string
}

export interface ClusterConstructedResponse {
  questionType: "constructed-response",
  questionNumber: number,
  questionWording: string,
  acceptableAnswers: string[]
}

export interface ClusterFigure {
  figureType: "image" | "table" | "bar graph" | "line graph" | "boxplot" | "scatterplot",
  figureNumber: number,
  figureTitle: string,
  figureDescription: string,
  figureColumnNames?: string[],
  figureRowData?: Record<string, Record<string, string | number>>
}

export interface ClusterSection {
    sectionNumber: number,
    sectionType: "title" | "text" | "multiple-choice" | "constructed-response" | "figure",
    sectionObject: ClusterTitle | ClusterText | ClusterMultipleChoiceQuestion | ClusterConstructedResponse | ClusterFigure
}

export interface Cluster {
    clusterNumber: number,
    unitArray: UnitNames[],
    clusterSectionArray: ClusterSection[]
}

export type UnitNames = "Biochemistry" | "Ecology and Human Impacts on Ecosystems" | "Evolution" | "Genetics" | "Organism Organization and Homeostasis" | "Reproduction" | "The Carbon Cycle"