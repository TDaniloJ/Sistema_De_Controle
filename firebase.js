import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD5NFLOufex7Gylqd4RSE7V8icYXQqh93Y",
    authDomain: "sistema-de-controle-5bc09.firebaseapp.com",
    databaseURL: "https://sistema-de-controle-5bc09-default-rtdb.firebaseio.com",
    projectId: "sistema-de-controle-5bc09",
    storageBucket: "sistema-de-controle-5bc09.appspot.com",
    messagingSenderId: "53243518833",
    appId: "1:53243518833:web:084cafc5d7e72d80e7e0d0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuário autenticado com sucesso!");
            
        } catch (error) {
            console.error("Erro ao autenticar usuário:", error.message);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};
