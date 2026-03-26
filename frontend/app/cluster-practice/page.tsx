import { NavBar } from "@/components/ui/navbar";
import UnitMenu from "@/components/ui/unit-menu";
import ClusterClient from "./cluster-client";
import Footer from "@/components/ui/footer";

export default function ClusterPractice() {
    return (
        <div className="flex flex-col min-h-screen w-full bg-wallpaper overflow-hidden">
            <NavBar />
            <ClusterClient />
            <Footer />

        </div>
    )
}