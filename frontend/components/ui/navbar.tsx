import { Button } from "./button"
import Link from "next/link"

function NavBar() {

    return (
        <div className="sticky top-0 w-full z-50 flex flex-row justify-between p-3 shadow-sm bg-white">
            <div>
                <Button className="text-md" variant="link_no_underline">
                    <Link href="/">
                        BuddinBio
                    </Link>
                </Button>
            </div>
            <div>
                <Button className="text-md opacity-75 hover:opacity-100" variant="link" asChild>
                    <Link href="/practice">
                        Practice
                    </Link>
                </Button>
                <Button className="text-md opacity-75 hover:opacity-100" variant="link" asChild>
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export {NavBar}