// Firebase modüllerini ayrı ayrı import edin
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyCk3f-70l3cDNewF2NXwPW4t_96GXJBHRU",
    authDomain: "ionic-list-bee11.firebaseapp.com",
    projectId: "ionic-list-bee11",
    storageBucket: "ionic-list-bee11.firebasestorage.app",
    messagingSenderId: "395713411015",
    appId: "1:395713411015:web:1d17dac1e1e7ae58efcbe2"
};

// Firebase başlatma
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
