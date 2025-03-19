import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../AuthContext"; // Assurez-vous que le chemin est correct
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Utilisez `login` du contexte

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        email,
        password,
    });

    if (response.data.access) {
      localStorage.setItem('access', response.data.access); // Token JWT
      localStorage.setItem('refresh', response.data.refresh);
        // Rediriger en fonction de l'email
        if (email === "admin@example.com" && password === "password") {
          localStorage.setItem("role", "admin"); // Stocke "admin"
          onLogin("admin");
          navigate("/admin"); // Redirige vers l'admin    
        } else {
          localStorage.setItem("role", "Employee");
          onLogin("user");
          navigate("/dashboard"); // Redirige vers la partie utilisateur
        }
      } else {
        setError("Email ou mot de passe incorrect !");
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
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