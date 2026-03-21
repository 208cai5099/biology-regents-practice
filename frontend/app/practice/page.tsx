import { NavBar } from "@/components/ui/navbar"
import PracticeClient from "./practice-client"

export default function ReviewPractice() {
    return (
        <div className="flex flex-col min-h-screen bg-wallpaper">
            <NavBar />
            <PracticeClient />
        </div>
    )
}