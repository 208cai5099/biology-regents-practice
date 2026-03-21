import Link from "next/link"

function Footer() {

    return (
        <footer className="flex flex-col items-center w-full bg-wallpaper mt-10 mx-5">

            <p className="text-sm italic">
                This website is not affiliated with the New York State Education Department or any educational organization.
            </p>

            <p className="text-sm text-gray-500">
                All images used on this page are courtesy of <a className="underline" href="https://openmoji.org/" target="_blank" rel="noopener noreferrer">OpenMoji</a> — <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_black" rel="noopener noreferrer">CC BY-SA 4.0</a>
            </p>

            <p>
                Made with 💚 in NYC
            </p>
            
        </footer>
    )

}

export {Footer}