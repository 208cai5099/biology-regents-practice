import dotenv from "dotenv"
import admin from "firebase-admin"
import { getFirestore } from 'firebase-admin/firestore'

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore()


export { db }