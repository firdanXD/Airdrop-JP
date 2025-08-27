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

declare const __firebase_config: string;

let firebaseApp: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
    const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
    if (Object.keys(firebaseConfig).length > 0) {
        firebaseApp = initializeApp(firebaseConfig);
        auth = getAuth(firebaseApp);
        db = getFirestore(firebaseApp);
    } else {
        console.error("Konfigurasi Firebase tidak ditemukan.");
    }
} catch (error) {
    console.error("Gagal menginisialisasi Firebase:", error);
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
