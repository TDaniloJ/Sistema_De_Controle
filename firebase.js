import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5NFLOufex7Gylqd4RSE7V8icYXQqh93Y",
  authDomain: "sistema-de-controle-5bc09.firebaseapp.com",
  databaseURL: "https://sistema-de-controle-5bc09-default-rtdb.firebaseio.com",
  projectId: "sistema-de-controle-5bc09",
  storageBucket: "sistema-de-controle-5bc09.appspot.com",
  messagingSenderId: "53243518833",
  appId: "1:53243518833:web:084cafc5d7e72d80e7e0d0"
};

export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const users = collection(firestore, "usuarios");

export async function exportDocs() {
  const querySnapshot = await getDocs(users);
  return querySnapshot;
}
