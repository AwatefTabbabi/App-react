import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    identifier: "",
    department: "",
    contract_type: "",
    start_date: "",
    salary: "",
    address: "",
    fax: "",
    position: "",
    photo: null
  });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({...prev, photo: file}));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      
      if (response.ok) {
        navigate("/");
      } else {
        setError(result.error || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="photo-upload-section">
          <label className="photo-preview">
            {preview ? (
              <img src={preview} alt="Aperçu" />
            ) : (
              <div className="placeholder">+</div>
            )}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-input"
            />
          </label>
          <p>Télécharger une photo (JPEG/PNG, max 2MB)</p>
        </div>

        <label>Email *:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Username *:</label>
        <input
          type="text"
          name="login"
          value={formData.login}
          onChange={handleChange}
          required
        />

        <label>Mot de passe *:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirmation mot de passe *:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label>Téléphone *:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Identifiant :</label>
        <input
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
        />

        <label>Département :</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />

        <label>Type de contrat :</label>
        <input
          type="text"
          name="contract_type"
          value={formData.contract_type}
          onChange={handleChange}
        />

        <label>Date de début :</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />

        <label>Salaire :</label>
        <input
          type="number"
          name="salary"
          step="0.01"
          value={formData.salary}
          onChange={handleChange}
        />

        <label>Adresse :</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Fax :</label>
        <input
          type="text"
          name="fax"
          value={formData.fax}
          onChange={handleChange}
        />

        <label>Poste :</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />

        <button type="submit">S'inscrire</button>
      </form>

      <div className="login-links">
        <p onClick={() => navigate("/")}>Déjà un compte ? Se connecter</p>
      </div>
    </div>
  );
};

export default SignUp;