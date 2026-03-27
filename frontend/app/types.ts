export interface MultipleChoice {
  question: string,
  wrongChoices: string[],
  correctAnswer: string,
  questionNumber: number
}

export interface ReviewMultipleChoiceQuestion {
    unitName: UnitNames,
    questionNumber: number,
    question: string,
    wrongChoices: string[],
    correctAnswer: string
}

export type ClusterSectionType = "title" | "text" | "multiple-choice" | "constructed-response" | "figure"

export interface ClusterTitle {
  clusterTitle: string
}

export interface ClusterText {
  sentencesArray: string[]
}

export interface ClusterMultipleChoiceQuestion {
  questionType: "multiple-choice",
  questionNumber: number,
  question: string,
  wrongChoices: string[]
  correctAnswer: string
}

export interface ClusterConstructedResponse {
  questionType: "constructed-response",
  questionNumber: number,
  question: string,
  acceptableAnswers: string[]
}

export type FigureType = "image" | "table" | "bar graph" | "line graph" | "boxplot" | "scatterplot"

export interface ClusterFigure {
  figureType: FigureType,
  figureNumber: number,
  figureTitle: string,
  figureDescription: string,
  figureColumnNames?: string[],
  figureRowData?: Record<string, Record<string, string | number>>
  xDataName?: string,
  yDataNames?: string[],
  imageURL?: string,
  imageAttribution?: string,
  xAxisTitle?: string,
  yAxisTitle?: string
}

export type ClusterSectionObject = ClusterTitle | ClusterText | ClusterMultipleChoiceQuestion | ClusterConstructedResponse | ClusterFigure

export interface ClusterSection {
    sectionNumber: number,
    sectionType: ClusterSectionType,
    sectionObject: ClusterSectionObject
}

export interface Cluster {
    clusterNumber: number,
    unitArray: UnitNames[],
    clusterSectionArray: ClusterSection[]
}

export type UnitNames = "Biochemistry" | "Ecology and Human Impacts on Ecosystems" | "Evolution" | "Genetics" | "Organism Organization and Homeostasis" | "Reproduction" | "The Carbon Cycle"