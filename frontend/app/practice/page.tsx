import { NavBar } from "@/components/ui/navbar"
import QuestionMenu from "@/components/question-menu/question-menu"

export default function ReviewPractice() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-wallpaper">
          <NavBar />

          <QuestionMenu />
          
        </div>
    )
}