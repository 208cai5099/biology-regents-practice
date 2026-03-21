import { NavBar } from "@/components/ui/navbar"
import PracticeClient from "./practice-client"
import UnitMenu from "@/app/practice/unit-menu"
import { Footer } from "@/components/ui/footer"

export default function ReviewPractice() {
    return (
        <div className="flex flex-col min-h-screen bg-wallpaper">
            <NavBar />
            <PracticeClient />
            <Footer />
        </div>
    )
}