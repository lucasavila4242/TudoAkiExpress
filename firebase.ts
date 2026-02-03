import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBslUdye9sN5EWF7nUCAQXjAlXparPT2og",
  authDomain: "tudoakiexpress-7e8d9.firebaseapp.com",
  projectId: "tudoakiexpress-7e8d9",
  storageBucket: "tudoakiexpress-7e8d9.firebasestorage.app",
  messagingSenderId: "926885162317",
  appId: "1:926885162317:web:6e92ef0e507579ca345b04",
  measurementId: "G-T41YC6M8PZ"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Banco de Dados (Firestore)
export const db = getFirestore(app);
