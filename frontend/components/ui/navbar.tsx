import { Button } from "./button"
import Link from "next/link"

function NavBar() {

    return (
        <div className="sticky top-0 w-full z-50 flex flex-row justify-between items-center h-15 shadow-sm text-white bg-navbar">
            <div>
                <Button className="gap-0 p-0" variant="link_no_underline">
                    <Link href="/">
                        <img src="/buddinbio.svg" className="h-13 w-auto"></img>
                    </Link>
                </Button>
            </div>
            <div className="flex flex-row gap-5 mr-3">
                <Link href="/practice" className="relative group text-lg font-bold hover:text-card-button text-white">
                    Practice
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full" />                     
                </Link>
                 <Link href="/login" className="relative group text-lg font-bold hover:text-card-button text-white">
                    Login
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full" />                     
                </Link>
            </div>
        </div>
    )
}

export {NavBar}