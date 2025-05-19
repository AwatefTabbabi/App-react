import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      if (response.status === 200 && response.data.access) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        const role = response.data.role;
        localStorage.setItem("role", role === "admin" ? "admin" : "Employee");
        onLogin(role === "admin" ? "admin" : "user");

        navigate(role === "admin" ? "/admin" : "/dashboard");
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
        <p>
          <span className="link-text" onClick={() => navigate("/forgot-password")}>
            Mot de passe oublié ?
          </span>
        </p>
        <p>
          <span className="link-text" onClick={() => navigate("/signup")}>
            Créer un compte
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
