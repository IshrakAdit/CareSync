import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVX4vdKUFV385mjAUk4hwnHu7yzV7QpXM",
  authDomain: "soul-b8eb9.firebaseapp.com",
  projectId: "soul-b8eb9",
  storageBucket: "soul-b8eb9.firebasestorage.app",
  messagingSenderId: "654937117969",
  appId: "1:654937117969:web:8f6f57aeacec5d652f68b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Sign up function
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// Sign in function
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// Sign out function
export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}; 