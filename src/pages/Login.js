import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ajoute un fichier CSS pour le style

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("role", "admin"); // Stocke "admin"
      onLogin("admin");
      navigate("/admin"); // Redirige vers l'admin
    } else if (email !== "" && password !== "") {
      localStorage.setItem("role", "Employee"); 
      onLogin("user"); // Passe "user" pour indiquer un utilisateur normal
      navigate("/dashboard"); // Redirige vers la partie utilisateur
    } else {
      setError("Email ou mot de passe incorrect !");
    }
  };
 

  return (
    <div className="login-container">
      <h2>Log in</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <label>Mot de passe :</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">Se connecter</button>
      </form>

      <div className="login-links">
        <p onClick={() => navigate("/forgot-password")}>Mot de passe oublié ?</p>
        <p onClick={() => navigate("/signup")}>Créer un compte</p>
      </div>
    </div>
  );
};

export default Login;
