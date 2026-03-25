import Footer from "@/components/ui/footer";
import { NavBar } from "@/components/ui/navbar";

export default function About() {
   
    return (
        <div className="flex flex-col w-full bg-wallpaper overflow-hidden">
            <NavBar />

            <div className="flex flex-col m-5 gap-5">

                <div className="flex flex-row self-center font-bold">
                    <h1 className="text-3xl">Welcome to Buddin</h1>
                    <h1 className="text-3xl text-deepgreen">Bio!</h1>
                </div>

                <div className="self-center text-center w-8/10">
                    <p className="font-semibold text-lg">
                        A simple and convenient study tool for the New York State Biology Regents
                    </p>
                </div>

                <div className="self-center rounded-md max-w-7/8">
                    <p className="text-lg">
                        BuddinBio is a practice playground for people to review and apply biology concepts aligned to the New York State Life Science curriculum.
                        Specifically designed for students, this website's main goal is to help students prepare for the NYS Biology Regents exam. Students can review fundamental
                        biology concepts at their own time and at their own pace.
                    </p>
                </div>

                <div className="self-center rounded-md max-w-7/8">
                    <h1 className="text-xl text-gray-500 font-bold my-2">TYPES OF QUESTIONS</h1>
                    <div role="group" className="flex flex-col gap-3">
                        <p className="text-lg">
                            BuddinBio has two types of questions: general review questions and cluster questions.                 
                        </p>

                        <h1 className="text-lg text-gray-500 font-bold">General Review Questions</h1>
                        <p className="text-lg">
                            General review questions are multiple-choice questions meant to practice recall of essential biology concepts. You likely saw an example on the home page. 
                            These are typically easier questions that help students gain sufficient biology knowledge for the cluster questions.
                        </p>

                        <h1 className="text-lg text-gray-500 font-bold">Cluster Questions (Coming Soon)</h1>
                        <p className="text-lg">
                            Cluster questions are designed to resemble those from the New York State Biology Regents exam. The exam is made up of sections called clusters. Each 
                            cluster is focused on a specific phenomenon in the real-world, and students learn about the phenomenon based on the given reading passages, diagrams, 
                            and/or images. Students need to connect the provided information to biology concepts to answer the questions correctly - a task that requires 
                            deep understanding of biology, meticulous reading skills, and an anlytical mindset.
                        </p>

                        <h1 className="text-lg text-gray-500 font-bold">Note about the Questions</h1>
                        <p className="text-lg">
                            The questions on BuddinBio are generated with the help of large language models - what many people refer to as AI. Keep in mind that content created by 
                            AI may contain false information.
                        </p>
                    </div>

                </div>

                <div className="flex flex-col self-center border border-amber-800 rounded-md bg-murkyyellow gap-3 max-w-9/10 md:max-w-3/4 p-5">
                    <h1 className="text-lg font-semibold text-murkypurple">DISCLAIMER</h1>
                    <p className="text-md text-murkypurple">
                        This website is an independent educational resource created to help students prepare for the NYS Biology Regents exam. It is <strong>not affiliated with, endorsed by, or sponsored by</strong> any state education department, school district, or government agency.
                        The practice questions and materials provided are <strong>unofficial</strong> and are not actual exam questions. Although they may reflect general exam concepts and formats, they may not exactly match the official exam.
                        Use of this website does not guarantee any specific exam results. All trademarks and exam names are the property of their respective owners and are used for descriptive purposes only.
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    )
}
