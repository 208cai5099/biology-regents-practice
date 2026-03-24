import { NavBar } from "@/components/ui/navbar"
import ReviewClient from "./review-client"
import Footer from "@/components/ui/footer"

export default function ReviewPractice() {
    return (
        <div className="flex flex-col min-h-screen bg-wallpaper overflow-hidden">
            <NavBar />
            <ReviewClient />
            <Footer />
        </div>
    )
}