"use client"

import Footer from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useState, useRef} from "react";
import MultipleChoiceCard from "@/components/ui/multiple-choice";
import Link from "next/link";
import { firebaseApp, sampleQuestions } from "@/lib/utils";
import { getFirestore, getDocs, collection } from "firebase/firestore"
import Carousel from "@/components/ui/carousel";
import UnitCard from "@/components/ui/unit-card";
import { unitDescriptions } from "@/lib/utils";
import { UnitNames } from "./types";

export default function Home() {

  const [examDates, setExamDates] = useState<string[]>([])

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

  useEffect(() => {

    const queryExamData = async() => {
      const db = getFirestore(firebaseApp)
      const datesSnapshot = await getDocs(collection(db, "exam_schedule"))
      
      const dates: Record<"date", string>[] = []
      datesSnapshot.forEach((doc) => dates.push(doc.data() as Record<"date", string>))

      setExamDates(dates.map((obj) => obj["date"]))

    }

    queryExamData()

  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-wallpaper">
      <NavBar />

      <div className="flex flex-col md:flex-row md:items-center w-full mt-10 gap-5 md:pl-30">

        <div className="flex flex-col text-center w-full md:text-start md:w-1/2 gap-5">
          
              <p 
                className="self-center md:self-start w-fit border border-gray-500 rounded-full px-2"
              >
                NYS Biology Regents Prep
              </p>
            
              <div>
                <h1 className="text-4xl font-semibold">Master <strong className="text-deepgreen">biology</strong>,</h1>
                <h1 className="text-4xl font-semibold">one question at a time</h1>
              </div>
            
              <p className="text-lg">Get ready for the NYS Biology Regents exam with <strong>100+</strong> questions </p>

              <div className="flex flex-row justify-center md:justify-start gap-10 ">
                <Link
                  className="border hover:bg-brightgreen/90 active:bg-deepgreen/90 rounded-xl p-2"
                  href="/review-practice"
                >
                  Start Studying
                </Link>
                <Link
                  className="border hover:bg-brightgreen/90 active:bg-deepgreen/90 rounded-xl p-2"
                  href="/about"
                >
                  Learn More
                </Link>
            </div>


        </div>


        <div className="flex w-full md:w-1/2 justify-center">
          <Carousel slides={sampleQuestions.map((question) => <MultipleChoiceCard question={question} onSelectAnswer={(chosenAnswer) => {}}/>)} />
        </div>


      </div>

      <div ref={containerRef} className="mt-10 md:pl-30">
        <h1 className="text-2xl font-bold text-center md:text-start mb-5">What Topics Are Covered?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(unitDescriptions).map(([unit, unitDescription], index) => {

            const unitName = unit as UnitNames
            const slideClass = index % 2 === 0 ? "slide-in-left" : "slide-in-right"

            return (
              <div 
                key={`${unit} card`} 
                className={`flex ${slideClass} w-8/10 md:3/10 mx-auto md:mx-0`}
              >
                <UnitCard unit={unitName} unitDescription={unitDescription}/>
              </div>
            )
          })}
          <div>

          </div>
        </div>
      </div>


      <Footer />
      
    </div>
  )
}
