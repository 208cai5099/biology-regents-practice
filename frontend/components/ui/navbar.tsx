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
            <div>
                <Button className="text-lg font-bold opacity-75 hover:opacity-100" variant="link" asChild>
                    <Link href="/practice">
                        Practice
                    </Link>
                </Button>
                <Button className="text-lg font-bold opacity-75 hover:opacity-100" variant="link" asChild>
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export {NavBar}