"use client"

import { Footer } from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useRef } from "react";
import MultipleChoiceCard from "@/components/ui/multiple-choice";
import Image from "next/image"
import { MultipleChoiceQuestion } from "./types";

const sampleQuestion: MultipleChoiceQuestion = {
  unitName: "Biochemistry",
  questionNumber: 1,
  question: "Why is the three-dimensional shape of an enzyme so important to its function?",
  correctAnswer: "The shape of the active site must match the specific substrate for the enzyme to catalyze the reaction",
  wrongChoices: [
    "It allows the enzyme to dissolve more easily in the cytoplasm",
    "It determines the color of the enzyme so cells can identify it",
    "It helps the enzyme travel faster through the bloodstream"
  ]
}

export default function Home() {

  // need to update
  const IMG_PATHS: string[] = [
    "notes.svg",
    "brain.svg",
    "thinking.svg",
    "test.svg" 
  ]

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
          <h1 className="text-3xl">Practice for the NYS Biology Regents</h1>
          <h2 className="text-xl">Review. Reinforce. Repeat.</h2>
        </div>

        <div className="w-full max-w-9/10 relative h-[100px] overflow-hidden mt-5 mask-l-from-97% mask-l-to-100% mask-r-from-97% mask-r-to-100%">
            {[...IMG_PATHS].map((path, idx) => {

              const delay = 30 / IMG_PATHS.length * (IMG_PATHS.length - (idx + 1)) * -1
              return (
                <Image
                  key={idx}
                  src={path}
                  width={100}
                  height={100}
                  className="absolute rounded-md marquee-animate"
                  style={{animationDelay: `${delay}s`, height: "auto"}}
                  alt={`image of ${path.replace(".svg", "")}`}
                >
                </Image>
              )
            }
            )}
        </div>

        <div className="flex flex-col self-stretch mx-5 mt-5" ref={containerRef}>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="slide-in-left flex flex-col justify-center items-center rounded-md gap-1 w-full md:max-w-1/2" style={{animationDelay: "1s"}}>
                <h1 className="text-2xl px-1">Essential Biology Knowledge</h1>
                <p className="text-lg text-center px-1">
                    Master major biology concepts, one question at a time.
                </p>
            </div>

            <div className="slide-in-right flex flex-col justify-center items-center  rounded-md gap-1 w-full md:max-w-1/2" style={{animationDelay: "1s"}}>
              <MultipleChoiceCard question={sampleQuestion} onSelectAnswer={(chosenAnswer: string) => {}}/>
            </div>
          </div>
        </div>


      </div>

      <Footer />
      
    </div>
  )
}
