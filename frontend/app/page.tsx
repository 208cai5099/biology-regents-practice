"use client"

import { Footer } from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useRef } from "react";

export default function Home() {

  // need to update
  const imgPaths: string[] = [
    "https://openmoji.org/data/black/svg/1F9EC.svg",
    "https://openmoji.org/data/black/svg/1F9EB.svg",
    "https://openmoji.org/data/black/svg/1F9A0.svg",
    "https://openmoji.org/data/black/svg/1F332.svg",
    "https://openmoji.org/data/black/svg/1F40E.svg",
    "https://openmoji.org/data/black/svg/1F48A.svg",
    "https://openmoji.org/data/black/svg/1F401.svg",
    "https://openmoji.org/data/black/svg/1F98A.svg",
    "https://openmoji.org/data/black/svg/1F422.svg",
    "https://openmoji.org/data/black/svg/2600.svg"
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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-col flex-1 items-center mt-5 gap-5">

        <div className="flex flex-col text-center gap-3">
          <h1 className="text-3xl">Practice for the NYS Biology Regents</h1>
          <h2 className="text-xl">Review. Reinforce. Repeat.</h2>
        </div>

        <div className="w-full max-w-9/10 relative h-[100px] overflow-hidden mt-5 mask-l-from-97% mask-l-to-100% mask-r-from-97% mask-r-to-100%">
            {[...imgPaths].map((path, idx) => {

              const delay = 30 / imgPaths.length * (imgPaths.length - (idx + 1)) * -1
              return (
                <img
                  key={idx}
                  src={path}
                  className="absolute w-[120px] h-[100px] rounded-md marquee-animate"
                  style={{animationDelay: `${delay}s`}}
                >
                </img>
              )
            }
            )}
        </div>

        <div className="flex flex-col self-stretch mx-5" ref={containerRef}>
          <div className="slide-in-left flex flex-col self-start rounded-md gap-1 w-full max-w-7/8 lg:max-w-1/2">
              <h1 className="text-2xl px-1">Essential Biology Knowledge</h1>
              <p className="text-lg px-1">
                  Need to review major biology concepts? You've come to the right place.
              </p>
          </div>

          <div className="slide-in-right flex flex-col self-end items-end rounded-md gap-1 w-full max-w-7/8 lg:max-w-1/2">
              <h1 className="text-2xl px-1">Cluster Style Questions</h1>
              <p className="text-lg px-1">
                  Want practice questions that resemble those from the actual Regents exam? We got those here.
              </p>
          </div>
        </div>


      </div>
      <Footer />
    </div>
  )
}
