"use client"

import Footer from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useState, useRef} from "react";
import MultipleChoiceCard from "@/components/ui/multiple-choice";
import Link from "next/link";
import { firebaseApp, sampleQuestions } from "@/lib/utils";
import { getFirestore, getDocs, collection } from "firebase/firestore"
import Carousel from "@/components/ui/carousel";
import IntroCard from "@/components/ui/intro-card";
import { unitDescriptions, adviceDescriptions } from "@/lib/utils";

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

    const queryExamDates = async() => {
      const db = getFirestore(firebaseApp)
      const datesSnapshot = await getDocs(collection(db, "exam_schedule"))
      
      const dates: Record<"date", string>[] = []
      datesSnapshot.forEach((doc) => dates.push(doc.data() as Record<"date", string>))

      setExamDates(dates.map((obj) => obj["date"]))

    }

    queryExamDates()

  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-wallpaper">
      <NavBar />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
        
        <div className="mx-auto my-auto text-center md:text-start">
          <p className="self-center w-fit border border-gray-500 rounded-full px-2 mx-auto md:mx-0">
            NYS Biology Regents Prep
          </p>

          <div className="mt-5">
            <h1 className="text-4xl md:text-6xl font-semibold">Master <strong className="text-deepgreen">biology</strong>,</h1>
            <h1 className="text-4xl md:text-6xl font-semibold">one question at a time</h1>
          </div>

          <p className="text-lg md:text-xl mt-5">Get ready for the NYS Biology Regents exam </p>

          <div className="flex flex-row md:text-xl gap-10 mt-5 justify-center md:justify-start">
            <Link
              className="inline-block border border-gray-300 hover:shadow-sm hover:bg-brightgreen/90 active:bg-deepgreen/90 rounded-xl p-2 transition hover:-translate-y-1"
              href="#steps"
            >
              Start Studying
            </Link>
            <Link
              className="inline-block border border-gray-300 hover:shadow-sm hover:bg-brightgreen/90 active:bg-deepgreen/90 rounded-xl p-2 transition hover:-translate-y-1"
              href="/about"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mx-auto my-auto w-full mt-10 md:mt-0">
          <Carousel slides={sampleQuestions.map((question) => <MultipleChoiceCard question={question} onSelectAnswer={(chosenAnswer) => {}}/>)} />
        </div>

      </div>

      <div
        id="steps"
        ref={containerRef}
        className="mt-10 md:ml-30"
      >
        <h1 className="text-2xl font-bold text-center md:text-start mb-5">1. Pick Your Own Path</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          <div className="slide-in-left w-8/10 md:3/10 mx-auto md:mx-0">
            <IntroCard heading="General Review" description="Refresh essential biology knowledge" />
          </div>

          <div className="slide-in-right w-8/10 md:3/10 mx-auto md:mx-0">
            <IntroCard heading="Cluster Practice" description="Solve mock exam questions" />
          </div>

        </div>

        <h1 className="text-2xl font-bold text-center md:text-start mb-5">2. Pick a Topic</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-start gap-5 mb-10">
          {Object.entries(unitDescriptions).map(([unit, unitDescription], index) => {

            const slideClass = index % 2 === 0 ? "slide-in-left" : "slide-in-right"

            return (
              <div 
                key={`${unit} card`} 
                className={`flex ${slideClass} w-8/10 md:3/10 mx-auto md:mx-0`}
              >
                <IntroCard heading={unit} description={unitDescription}/>
              </div>
            )
          })}
        
        </div>
        
        <h1 className="text-2xl font-bold text-center md:text-start mb-5">3. Solve the Questions</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-start gap-5 mb-10">
          {Object.entries(adviceDescriptions).map(([advice, adviceDescription], index) => {

            const slideClass = index % 2 === 0 ? "slide-in-left" : "slide-in-right"

            return (
              <div 
                key={`${advice} card`} 
                className={`flex ${slideClass} w-8/10 md:3/10 mx-auto md:mx-0`}
              >
                <IntroCard heading={advice} description={adviceDescription}/>
              </div>
            )
          })}
        
        </div>
        
      </div>

      <Footer />
      
    </div>
  )
}
