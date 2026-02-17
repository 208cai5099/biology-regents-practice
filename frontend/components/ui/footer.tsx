import Link from "next/link"

function Footer() {

    return (
        <footer className="flex flex-col items-center w-full bg-white mx-5">
            <p className="text-sm italic">
                This website is not affiliated with the New York State Education Department. See disclaimer in <Link href="/about" className="underline hover:cursor-pointer">About</Link> page.
            </p>
            <p>
                Made with ❤️ in NYC
            </p>
        </footer>
    )

}

export {Footer}