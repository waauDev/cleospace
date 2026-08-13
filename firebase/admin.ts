import { cert, getApps, initializeApp } from "firebase-admin";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const initFirebaseAdmin = ()=>{
    const apps = getApps();

    if(!apps.length){
        initializeApp({
            credential:cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_PRIVATE_KEY,
                privateKey: process.env.FIREBASE_CLIENT_EMAIL?.replace("/\\n/g","\n"),
            })
        })
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
    }
}

export const {auth, db} = initFirebaseAdmin();