"use client"

import Footer from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useRef } from "react";
import MultipleChoiceCard from "@/components/ui/multiple-choice";
import Image from "next/image"
import { ReviewMultipleChoiceQuestion } from "./types";
import Link from "next/link";

const SAMPLE_QUESTION: ReviewMultipleChoiceQuestion = {
  unitName: "Biochemistry",
  questionNumber: 1,
  question: "Which equation correctly models the process of photosynthesis?",
  correctAnswer: "Sunlight + Water + Carbon Dioxide -> Glucose + Oxygen",
  wrongChoices: [
    "Glucose + Oxygen -> Sunlight + Water + Carbon Dioxide",
    "Sunlight + Carbon Dioxide -> Glucose + Oxygen",
    "Sunlight + Water + Oxygen -> Glucose + Carbon Dioxide"
  ]
}

const IMG_PATHS = {
    "Biochemistry": "test_tube.svg",
    "Ecology": "clover.svg",
    "Evolution": "bird.svg",
    "Genetics": "dna.svg",
    "Homeostasis": "person.svg",
    "Reproduction": "baby.svg",
    "Carbon Cycle":"cycle.svg"
}

export default function Home() {

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll(".slide-in-left, .slide-in-right")
    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      }    
    )}, { threshold: 0.1 }
    )

    cards.forEach((card) => {
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-wallpaper">
      <NavBar />
      <div className="flex flex-col flex-1 items-center mt-5 gap-5">

        <div className="flex flex-col text-center gap-3">
          <h1 className="text-4xl font-semibold">Master biology,</h1>
          <h1 className="text-4xl font-semibold">one question at a time</h1>
          <h2 className="text-2xl">Prepare for the NYS Biology Regents exam</h2>
        </div>

        <div className="w-full max-w-9/10 relative h-[150px] overflow-hidden mt-5 mask-l-from-97% mask-l-to-100% mask-r-from-97% mask-r-to-100%">
            {Object.entries(IMG_PATHS).map(([unit, path], idx) => {

              const imageCount = Object.keys(IMG_PATHS).length

              const delay = 30 / imageCount * (imageCount - (idx + 1)) * -1
              return (
                <div
                    key={idx}
                    className="absolute rounded-md marquee-animate text-center font-semibold"
                    style={{animationDelay: `${delay}s`, width: "100px", height: "100px"}}
                >
                  <h3>{unit}</h3>
                  <Image
                    src={path}
                    width={100}
                    height={100}
                    alt={`image of ${path.replace(".svg", "")}`}
                  >
                  </Image>
                </div>
              )
            }
            )}
        </div>

        <Link href="/practice" className="w-[200px] max-h-[30px] border border-gray-300 text-lg text-center font-semibold rounded-xl bg-wallpaper hover:bg-deepgreen hover:text-white active:bg-green-800">
            Start Studying
        </Link>

        <p className="text-lg font-bold mt-10">
          Here's a sample question
        </p>


        <div className="w-full md:w-1/2 flex justify-center">
          <MultipleChoiceCard question={SAMPLE_QUESTION} onSelectAnswer={(chosenAnswer: string) => {}}/>
        </div>


      </div>

      <Footer />
      
    </div>
  )
}
