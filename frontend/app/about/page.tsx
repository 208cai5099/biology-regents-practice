"use client";

import { Footer } from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";
import { useEffect, useRef } from "react";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = container.querySelectorAll(".slide-in-left, .slide-in-right");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

            <div ref={containerRef} className="flex flex-col min-h-screen m-5 gap-10">

                <div className="slide-in-left flex flex-col self-start border border-gray-50 shadow-xs rounded-md gap-1 w-full max-w-7/8">
                    <h1 className="text-2xl px-1">Hi there!</h1>
                    <p className="text-lg px-1">
                        Welcome to BuddinBio! This website is a practice playground for people to review and apply biology concepts aligned to the New York State Life Science curriculum.
                        Specifically designed for students, this website's main goal is to help students prepare for the NYS Biology Regents exam. Students can review reinforce fundamental
                        biology concepts and take a crack at cluster questions that resemble those from the actual exam. Hope you enjoy using the site!
                    </p>
                </div>

                <div className="slide-in-right flex flex-col self-end items-end border border-gray-50 shadow-xs rounded-md gap-1 w-full max-w-7/8">
                    <h1 className="text-2xl px-1">Who Made this Site?</h1>
                    <p className="text-lg px-1">
                        BuddinBio is designed and created by Zhuo Biao Cai, a biology teacher turned software engineer from NYC. In 2019, Zhuo graduated with a BA in Biology and an initial grades 7-12
                        biology teaching certification from Vassar College. He went on to teach math and biology in NYC before discovering an interest in computer programming. He eventually pursued a
                        Master's study in computer technology at the University of Pennsylvania. Passionate about the intersection of educational technology, Zhuo designed this site as a test preparation
                        tool for the Biology Regents exam.
                    </p>
                </div>

                <div className="slide-in-left flex flex-col self-start border border-gray-50 shadow-xs rounded-md gap-1 w-full max-w-7/8">
                    <h1 className="text-2xl px-1">Disclaimer</h1>
                    <p className="text-lg px-1">
                        This website is an independent educational resource created to help students prepare for the NYS Biology Regents exam. It is <strong>not affiliated with, endorsed by, or sponsored by</strong> any state education department, school district, or government agency.
                        The practice questions and materials provided are <strong>unofficial</strong> and are not actual exam questions. Although they may reflect general exam concepts and formats, they may not exactly match the official exam.
                        Use of this website does not guarantee any specific exam results. All trademarks and exam names are the property of their respective owners and are used for descriptive purposes only.
                    </p>
                </div>

            </div>

            <div className="flex-1"></div>
            <Footer />
        </div>
    )
}
