import { NavBar } from "@/components/ui/navbar";
import UnitMenu from "@/components/ui/unit-menu";
import ClusterClient from "./cluster-client";

export default function ClusterPractice() {
    return (
        <div className="flex flex-col min-h-screen bg-wallpaper overflow-hidden">
            <NavBar />
            <ClusterClient />

        </div>
    )
}