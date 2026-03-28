import { useState } from "react";

interface CarouselProps {
    slides: React.ReactNode[]
}

const BUTTON_SIZE = 25

export default function Carousel({slides}: CarouselProps) {

    const [currentSlide, setCurrentSlide] = useState(slides[0]) 
    const [slideNumber, setSlideNumber] = useState<number>(0);
    const [animating, setAnimating] = useState<boolean>(false);

    const goToSlide = (index: number) => {
        if (animating || index === slideNumber) return null
        setAnimating(true)
        setSlideNumber(index)
        setCurrentSlide(slides[index])
        setTimeout(() => setAnimating(false), 300)
    };

    const nextSlide = () => {
    if (slideNumber === slides.length - 1) {
        goToSlide(0)
    } else {
        goToSlide(slideNumber + 1)
    }
    }

    const previousSlide = () => {
    if (slideNumber === 0) {
        goToSlide(slides.length - 1)
    } else {
        goToSlide(slideNumber - 1)
    }
    }

    return (
        <div className="relative w-full overflow-hidden">

            <div className="flex flex-col items-center justify-center gap-1">

                {currentSlide}

                <div className="flex gap-2 items-center">
                {slides.map((_, i) => (
                    <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="transition-all duration-300 rounded-full"
                    style={{
                        width: i === slideNumber ? 24 : 6,
                        height: 6,
                        background: i === slideNumber ? "#37753B" : "#AAAAAA",
                    }}
                    />
                ))}
                </div>

                <div className="flex flex-row gap-5">
                <button
                    className="opacity-40 hover:opacity-70 active:opacity-100 cursor-pointer"
                    onClick={() => previousSlide()}
                >
                    <svg width={BUTTON_SIZE} height={BUTTON_SIZE} viewBox="0 0 16 16" fill="none">
                        <path
                            d="M10 3L5 8L10 13"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>
                </button>
                <button
                    className="opacity-40 hover:opacity-70 active:opacity-100 cursor-pointer"
                    onClick={() => nextSlide()}
                >
                    <svg width={BUTTON_SIZE} height={BUTTON_SIZE} viewBox="0 0 16 16" fill="none">
                        <path
                            d="M6 3L11 8L6 13"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>
                </button>
                </div>

            </div>
        </div>
    );
}