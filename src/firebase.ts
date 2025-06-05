import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWW0df1I4ClzfbXP9q7wsPrKocDs_vtLw",
    authDomain: "gymbeam-store.firebaseapp.com",
    projectId: "gymbeam-store",
    storageBucket: "gymbeam-store.firebasestorage.app",
    messagingSenderId: "793006188552",
    appId: "1:793006188552:web:e48ed753c9decce422c9bd",
    measurementId: "G-THN8CCQH1R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);