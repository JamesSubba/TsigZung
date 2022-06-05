import {useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOPj87pSiG38I7NTyY37tmcRu9mC5HdyA",
  authDomain: "tshigzung.firebaseapp.com",
  projectId: "tshigzung",
  storageBucket: "tshigzung.appspot.com",
  messagingSenderId: "127763536857",
  appId: "1:127763536857:web:ffdf27535abfd50a2517c8"
};

const app= initializeApp(firebaseConfig);
export default getFirestore();
export const auth=getAuth();
export const storage = getStorage(app);

export function signup(email,password){
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email,password){
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout(){
  signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}