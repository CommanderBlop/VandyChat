import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, query, where, getDoc, getDocs } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  // const analytics = getAnalytics(app);

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

export const checkUserExistence = async (email) => {
  try {
    const useRef = collection(db, "users");
    const q = query(useRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0;
  } catch (err) {
    console.error("Error checking if user exists", err);
    return null;
  }
};

export async function registerUser(uid, userData) {
  try {
    await setDoc(doc(db, 'users', uid), userData);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const isUserLoggedIn = () => {
  return auth.currentUser;
};

export async function getUserInfo(uid) {
  if (uid == null) return null;
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}