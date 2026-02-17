import { Footer } from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-col flex-1 items-center mt-5">

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl">Practice for the NYS Biology Regents - at your own pace</h1>
          <h2 className="text-xl">Review. Reinforce. Repeat.</h2>
        </div>

        <div>
          
        </div>


      </div>
      <Footer />
    </div>
  )
}
