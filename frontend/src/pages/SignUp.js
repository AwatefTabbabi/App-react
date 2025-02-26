import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // Ajoute un fichier CSS pour le style

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [department, setDepartment] = useState("");
  const [contractType, setContractType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    if (username && email && password && phone && identifier && department && contractType && startDate && salary && address) {
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
        <label>Nom d'utilisateur :</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
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
        
        <label>Numéro :</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        
        <label>Identifiant :</label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        
        <label>Département :</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        
        <label>Type de contrat :</label>
        <input
          type="text"
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
          required
        />
        
        <label>Date de début :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        
        <label>Salaire :</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        
        <label>Adresse :</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
