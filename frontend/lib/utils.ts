import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { initializeApp } from "firebase/app";
import { ReviewMultipleChoiceQuestion, UnitNames } from "@/app/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}

const firebaseApp = initializeApp(firebaseConfig)

const sampleQuestions: ReviewMultipleChoiceQuestion[] = [
  {
    unitName: "Biochemistry",
    questionNumber: 1,
    question: "Which equation correctly models the process of photosynthesis?",
    correctAnswer: "Sunlight + Water + Carbon Dioxide -> Glucose + Oxygen",
    wrongChoices: [
      "Glucose + Oxygen -> Sunlight + Water + Carbon Dioxide",
      "Sunlight + Carbon Dioxide -> Glucose + Oxygen",
      "Sunlight + Water + Oxygen -> Glucose + Carbon Dioxide"
    ]
  },
  {
    unitName: "Ecology and Human Impacts on Ecosystems",
    questionNumber: 2,
    question: "Which of the following is an example of an abiotic factor that can affect the carrying capacity of an ecosystem?",
    correctAnswer: "Availability of water and sunlight",
    wrongChoices: [
      "Predation by a natural predator",
      "Competition among members of the same species",
      "Introduction of a parasitic organism"
    ]
  },
  {
    unitName: "Evolution",
    questionNumber: 3,
    question: "Which of the following is NOT a factor that drives evolution?",
    correctAnswer: "The ability of all organisms to adapt equally to any environment",
    wrongChoices: [
      "The potential for a species to increase in number",
      "Genetic variation due to mutation and sexual reproduction",
      "Competition for limited resources in the environment"
    ]
  },
  {
    unitName: "Genetics",
    questionNumber: 4,
    question: "Although all cells in an organism have the same genetic content, they can differ in structure and function because:",
    correctAnswer: "Different genes are expressed (turned on or off) in different cells",
    wrongChoices: [
      "Different cells contain different chromosomes",
      "Mutations occur in every cell to change the DNA",
      "Each cell type has a unique DNA sequence"
    ]
  },
  {
    unitName: "Organism Organization and Homeostasis",
    questionNumber: 5,
    question: "Which of the following represents a correct hierarchical order of organization in a multicellular organism?",
    correctAnswer: "Cell → Tissue → Organ → Organ System → Organism",
    wrongChoices: [
      "Organ → Tissue → Cell → Organ System → Organism",
      "Tissue → Cell → Organ → Organism → Organ System",
      "Cell → Organ → Tissue → Organ System → Organism"
    ]
  },
  {
    unitName: "Reproduction",
    questionNumber: 6,
    question: "What type of cell division produces gametes (sperm and egg cells) in humans?",
    correctAnswer: "Meiotic cell division",
    wrongChoices: [
      "Mitotic cell division",
      "Binary fission",
      "Budding"
    ]
  },
  {
    unitName: "The Carbon Cycle",
    questionNumber: 7,
    question: "When decomposers break down dead organic matter, carbon is primarily returned to the atmosphere in the form of:",
    correctAnswer: "Carbon dioxide",
    wrongChoices: [
      "Pure carbon (graphite)",
      "Glucose",
      "Calcium carbonate"
    ]
  }
]

const unitDescriptions: Record<UnitNames, string> = {
  "Biochemistry": "The metabolic processes of protein synthesis, cellular respiration, and photosynthesis",
  "Ecology and Human Impacts on Ecosystems": "The relationships among members of an ecosystems and human-induced changes to ecological conditions",
  "Evolution": "The process responsible for inherited changes in populations",
  "Genetics": "The structure of genetic material and its role in heredity",
  "Organism Organization and Homeostasis": "The roles that tissues and organs play in maintaining homeostasis",
  "Reproduction": "The process of producing offspring through sexual or asexual reproduction",
  "The Carbon Cycle": "The flow of carbon among the biosphere, atmosphere, geosphere, and hydrosphere"
}

const adviceDescriptions: Record<string, string> = {
  "Quality Over Quantity": "Focus on learning from the questions, not just doing them",
  "Time Yourself": "Time yourself with the questions and track your progress",
  "Phone-Friendly": "Practice on your phone - no need for laptop or computer",
  "Review, Reinforce, Repeat": "Practice again and again until mastery "
}

const introImagePaths: Record<string, string> = {
  "Biochemistry": "test_tube.svg",
  "Ecology and Human Impacts on Ecosystems": "clover.svg",
  "Evolution": "bird.svg",
  "Genetics": "dna.svg",
  "Organism Organization and Homeostasis": "person.svg",
  "Reproduction": "baby.svg",
  "The Carbon Cycle": "cycle.svg",
  "General Review": "think.svg",
  "Cluster Practice": "exam.svg",
  "Phone-Friendly": "phone.svg",
  "Time Yourself": "hourglass.svg",
  "Quality Over Quantity": "brain.svg",
  "Review, Reinforce, Repeat": "repeat.svg"
}
export { firebaseApp, sampleQuestions, unitDescriptions, adviceDescriptions, introImagePaths }