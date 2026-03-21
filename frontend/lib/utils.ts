import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { initializeApp } from "firebase/app";
import dotenv from "dotenv"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID
}

const app = initializeApp(firebaseConfig)

export { app }