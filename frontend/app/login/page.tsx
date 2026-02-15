"use client"

import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { NavBar } from "@/components/ui/navbar"
import { useState } from "react"

export default function Login() {
    
    const organellePrefixes = [
        "Nucleus",
        "Cytoplasm",
        "Mitochondria",
        "Ribosome",
        "Chloroplast",
        "Lysosome",
        "Cytoskeleton"
    ]

    const [usernamePrefix, setUsernamePrefix] = useState<string>(organellePrefixes[0])
    const [usernameSuffix, setUsernameSuffix] = useState<string>("")
    const [showUsernameReq, setShowUsernameReq] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [showPasswordReq, setShowPasswordReq] = useState<boolean>(false)
    const [loginMessage, setLoginMessage] = useState<string>("")

    const checkUsername = () => {
        return (/^\d+$/.test(usernameSuffix) && usernameSuffix.length >= 3 && usernameSuffix.length <= 5 && !usernameSuffix.includes(" "))
    }

    const checkPassword = () => {
        return (password.length >= 9 && password.length <= 15)
    }

    const handleLogin = async(e: React.SubmitEvent) => {

        e.preventDefault()

        if (checkUsername() && checkPassword()) {

            setShowUsernameReq(false)
            setShowPasswordReq(false)

            try {
                const endpoint = ""
                const username = `${usernamePrefix}-${usernameSuffix}`
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username, password})
                }

                )

                setLoginMessage("")

            } catch (error) {
                console.log(error)
                setLoginMessage("An internal error ocurred. Please try again later.")
            }

        } else if (!checkUsername() && !checkPassword()) {
            setLoginMessage("Username and password do not meet the requirements.")
            setShowUsernameReq(true)
            setShowPasswordReq(true)
        } else if (!checkUsername()) {
            setLoginMessage("Username does not meet the requirement.")
            setShowUsernameReq(true)
        } else if(!checkPassword()) {
            setLoginMessage("Password does not meet the requirement.")
            setShowPasswordReq(true)
        }

    }

    return (

        <div>
             <NavBar />
            <div className="flex flex-col min-h-screen items-center justify-center mx-3">
                <form 
                    className="w-full max-w-sm flex flex-col gap-3 p-3 rounded-md shadow-sm" 
                    onSubmit={handleLogin}
                >
                    <FieldGroup>
                        <Field>
                            <div className="flex flex-row justify-between">
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                {showUsernameReq && <p className="text-sm italic">Enter 3 to 5 digits</p>}
                            </div>
                            <div className="flex flex-row">
                                <select 
                                    defaultValue={organellePrefixes[0]}
                                    className="rounded-r-none border-r-0 rounded-md border px-3 text-sm"
                                    onChange={(e) => setUsernamePrefix(e.target.value)}
                                >
                                    {
                                        organellePrefixes.map((prefix) => {
                                            return <option key={prefix}>{prefix}</option>
                                        })
                                    }
                                </select>
                                <Input 
                                    id="username" 
                                    name="username" 
                                    type="text" 
                                    className="rounded-l-none" 
                                    onChange={(e) => setUsernameSuffix(e.target.value)}
                                    onFocus={() => setShowUsernameReq(true)}
                                    onBlur={() => setShowUsernameReq(false)}
                                />
                            </div>

                        </Field>
                        <Field>
                            <div className="flex flex-row justify-between">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                {showPasswordReq && <p className="text-sm italic">Enter 9 to 15 characters</p>}
                            </div>                            
                            <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setShowPasswordReq(true)}
                                onBlur={() => setShowPasswordReq(false)}
                            />
                        </Field>
                    </FieldGroup>
                    <Button type="submit" className="self-center w-50 bg-black text-white cursor-pointer hover:bg-black/80 active:bg-black/50">
                        <LogIn />
                        Login
                    </Button>
                    {<p className="text-sm">{loginMessage}</p>}
                </form>
            </div>
        </div>
    )
}
