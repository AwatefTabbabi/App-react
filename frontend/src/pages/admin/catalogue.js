import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import "./catalogue.css";

const Catalogue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    startDate: "",
    price: "",
    trainer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setError("Authentification requise");
      navigate("/login");
    }
  }, [navigate]);


const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let token = localStorage.getItem("access");
      if (!token) throw new Error("Token non trouvé");
  
      // Vérifier si le token est expiré
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        const refreshToken = localStorage.getItem("refresh_token");
        const refreshResponse = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          { refresh: refreshToken }
        );
        
        token = refreshResponse.data.access;
        localStorage.setItem("access", token); 
      }
  
      // Envoyer la requête avec le nouveau token
      const response = await axios.post(
        "http://localhost:8000/api/catalogue/",
        {
          ...formData,
          start_date: formData.startDate, // Nom du champ Django
          price: parseFloat(formData.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("Formation créée !");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert(`Erreur: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFetchError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access");
      setError("Session expirée - Veuillez vous reconnecter");
      navigate("/login");
    } else if (error.response?.data) {
      // Afficher les erreurs de validation Django
      const errors = Object.values(error.response.data).flat();
      setError(`Erreurs: ${errors.join(", ")}`);
    } else {
      setError(`Erreur: ${error.message}`);
    }
  };
  return (
    <div className="catalogue-container">
      <Link to="/dashboard" className="back-icon">
        <ArrowLeft size={24} />
      </Link>

      <h2>Nouvelle Formation Catalogue</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Durée (h)</th>
            <th>Date de début</th>
            <th>Formateur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.title || '...'}</td>
            <td>{formData.category || '...'}</td>
            <td>{formData.duration || '...'}</td>
            <td>{formData.startDate || '...'}</td>
            <td>{formData.trainer || '...'}</td>
          </tr>
        </tbody>
      </table>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Enregistrement en cours...</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Détails de la formation</h3>

          <div className="form-group">
            <label>Titre :</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description :</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
          </div>

          <div className="form-group">
            <label>Catégorie :</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Sélectionnez...</option>
              <option value="informatique">Informatique</option>
              <option value="management">Management</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Paramètres techniques</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Durée (heures) :</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="1" required />
            </div>

            <div className="form-group">
              <label>Date de début :</label>
              <input type="date" name="start_date" value={formData.startDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Prix (€) :</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" required />
            </div>

            <div className="form-group">
              <label>Formateur :</label>
              <input type="text" name="trainer" value={formData.trainer} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
          <button type="button" onClick={() => navigate("/dashboard")}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default Catalogue;
