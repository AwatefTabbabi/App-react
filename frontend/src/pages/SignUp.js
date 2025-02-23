import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // Ajoute un fichier CSS pour le style

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    if (email && password) {
      // Logique pour enregistrer l'utilisateur (par exemple, appel à une API)
      setError(""); // Réinitialiser l'erreur

      // Rediriger immédiatement vers la page de connexion
      navigate("/"); // Redirection vers la page de connexion après inscription réussie
    } else {
      setError("Tous les champs sont obligatoires !");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
        
        <label>Confirmer le mot de passe :</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>

      <div className="login-links">
        <p onClick={() => navigate("/")}>Déjà un compte ? Se connecter</p>
      </div>
    </div>
  );
};

export default SignUp;