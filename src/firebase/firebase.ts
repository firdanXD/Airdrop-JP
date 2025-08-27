import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile
} from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// Konfigurasi Firebase sekarang dibaca dari Environment Variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let firebaseApp: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
    if (firebaseConfig.apiKey) {
        firebaseApp = initializeApp(firebaseConfig);
        auth = getAuth(firebaseApp);
        db = getFirestore(firebaseApp);
    } else {
        console.error("Firebase config not found in environment variables.");
    }
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

export { 
    firebaseApp, 
    auth, 
    db, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile
};
export type { User };