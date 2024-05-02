import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


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

export const auth = getAuth(app);

export const users = collection(firestore, "usuarios");

export const clients = collection(firestore, "clientes");

export async function exportUsers() {
    const querySnapshot = await getDocs(users);
    return querySnapshot;
}

export async function exportClients() {
    const querySnapshot = await getDocs(clients);
    return querySnapshot;
}

export async function createUserAndAddUserInfo(email, senha, admin, nome, cnpj, telefone) {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await addDoc(collection(firestore, "usuarios"), {
          email: email,
          admin: admin,
          nome: nome,
          cnpj: cnpj,
          telefone: telefone
      });

      return user;
  } catch (error) {
      throw error;
  }
}

export function addDocuments(colecao, dados) {
  return addDoc(collection(firestore, colecao), dados);
}

export function editDocuments(colecao, docId, novosDados) {
  const docRef = doc(firestore, colecao, docId);
  return setDoc(docRef, novosDados, { merge: true });
}

export function deleteDocuments(colecao, docId) {
  const docRef = doc(firestore, colecao, docId);
  return deleteDoc(docRef);
}

export async function exportDocs() {
  const querySnapshotClientes = await getDocs(clients);

  return {
      clientes: querySnapshotClientes
  };
}
