// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1BeTJr9BeIm7e3ACJio3l2hr_DfgGky0",
  authDomain: "crwn-clothing-db-d27f1.firebaseapp.com",
  projectId: "crwn-clothing-db-d27f1",
  storageBucket: "crwn-clothing-db-d27f1.appspot.com",
  messagingSenderId: "503396141235",
  appId: "1:503396141235:web:b324610b2ea90fd9d788c6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUsrDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'user', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email }= userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createdAt})
    } catch (error) {
      console.log('error creating user error',error.message)
    }
  }

  return userDocRef;
}
