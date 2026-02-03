
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBslUdye9sN5EWF7nUCAQXjAlXparPT2og",
  authDomain: "tudoakiexpress-7e8d9.firebaseapp.com",
  projectId: "tudoakiexpress-7e8d9",
  storageBucket: "tudoakiexpress-7e8d9.firebasestorage.app",
  messagingSenderId: "926885162317",
  appId: "1:926885162317:web:6e92ef0e507579ca345b04",
  measurementId: "G-T41YC6M8PZ"
};

// Inicializa o Firebase (Singleton)
// Garante que não inicialize multiplas vezes no hot-reload ou refresh rápido
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Exporta o Banco de Dados (Firestore)
// Tenta inicializar com configurações específicas, mas faz fallback para instância existente se já houver
let db;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (e) {
  // Se já estiver inicializado (erro comum em refresh), pega a instância existente
  db = getFirestore(app);
}

export { db };
