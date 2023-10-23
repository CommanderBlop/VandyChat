import { initializeApp } from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
  
  const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      return result.user;
    } catch (error) {
      console.error("Error during Google sign in", error);
      return null;
    }
  };  

export const db = getFirestore(app);
