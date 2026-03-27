'use client'

import Link from "next/link";
import { useEffect, useRef } from "react"

const DISCLAIMER_VIEW_KEY = "disclaimerViewed"

export default function AIDisclaimer() {
    
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {

        const viewStatus = sessionStorage.getItem(DISCLAIMER_VIEW_KEY)
        if (!viewStatus) {
            ref.current?.showModal()
        }

    }, [])

    const closeDisclaimer = () => {
        sessionStorage.setItem(DISCLAIMER_VIEW_KEY, "true")
        ref.current?.close()
    }

    return (
        <dialog
            ref={ref}
            onClose={closeDisclaimer}
            onKeyDown={(event) => event.key === "Escape" && event.preventDefault()}
            className="my-auto mx-auto max-w-8/10 md:max-w-1/3 rounded-2xl p-2 bg-white focus:outline-none focus:ring-2 focus:ring-black backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        >
            <div className="flex flex-col gap-2">

                <p className="font-semibold">DISCLAIMER</p>

                <p>
                    All questions on this website are generated using AI models and may contain mistakes.
                    For more information, please visit the <Link href="./about" className="underline">About</Link> page to learn more.
                </p>

                <button
                    className="self-center bg-black text-white rounded-lg p-1 cursor-pointer hover:opacity-80"
                    onClick={closeDisclaimer}
                >
                    I understand
                </button>

            </div>
        </dialog>
    )

}