import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh2_Sux-c3cJ7VmUadcpt-SF63oGNhJlo",
  authDomain: "college-booking-app-e0b2a.firebaseapp.com",
  projectId: "college-booking-app-e0b2a",
  storageBucket: "college-booking-app-e0b2a.firebasestorage.app",
  messagingSenderId: "640224830773",
  appId: "1:640224830773:web:ebf4f481ce88a84a8b587c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

export { auth, facebookProvider };
export const db = getFirestore(app);
