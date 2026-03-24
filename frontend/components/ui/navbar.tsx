'use client'

import Link from "next/link"
import { useState } from "react"

function NavBar() {

    const [showStudyMenu, setShowStudyMenu] = useState(false)

    return (
        <div className="sticky top-0 w-full z-50 flex flex-row justify-between items-center h-15 shadow-sm text-white bg-black">
                <Link 
                    href="/"
                    className="flex flex-row text-[25px] font-bold ml-5"
                >
                    <p>Buddin</p>
                    <p className="text-deepgreen">Bio</p>
                </Link>

            <div className="flex flex-row gap-5 mr-3">

                <div className="relative">
                    <button
                        className="group text-lg font-bold cursor-pointer text-white hover:text-deepgreen"
                        onClick={() => setShowStudyMenu(!showStudyMenu)}
                    >
                        Study
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"/>
                    </button>

                    {showStudyMenu && (
                        <>
                        <div className="fixed inset-0" onClick={() => setShowStudyMenu(false)} />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col bg-black rounded shadow-lg">
                            <button className="group/review relative px-4 py-2 text-lg font-bold cursor-pointer text-white hover:text-deepgreen">
                                <Link href="/review-practice">Review</Link>
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-current transition-all duration-300 group-hover/review:w-3/4"/>
                            </button>
                            <button className="group/cluster relative px-4 py-2 text-lg font-bold cursor-pointer text-white hover:text-deepgreen">
                                <Link href="/cluster-practice">Cluster</Link>
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-current transition-all duration-300 group-hover/cluster:w-3/4"/>
                            </button>
                        </div>
                        </>
                    )}
                </div>

                <button className="group text-lg font-bold text-white hover:text-deepgreen">
                    <Link href="/about" className="relative">
                        About
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"/>
                    </Link>
                </button>

            </div>
        </div>
    )
}

export {NavBar}