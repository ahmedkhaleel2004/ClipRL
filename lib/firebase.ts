import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC1CavJ2g8PoGBilzRNwUFVKLfxEijLanw",
	authDomain: "cliprl-eaa59.firebaseapp.com",
	projectId: "cliprl-eaa59",
	storageBucket: "cliprl-eaa59.appspot.com",
	messagingSenderId: "625434151370",
	appId: "1:625434151370:web:b568b4d1e5142454706733"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();