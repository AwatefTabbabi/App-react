import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
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
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("http://localhost:8000/api/catalogue/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        // Formatage des données avec vérification approfondie
        // Dans Catalogue.js
const formatted = response.data.map(f => ({
  id: f.id,
  title: f.title,
  category: f.category,
  duration: `${f.duration}h`,
  start_date: f.start_date,
  trainer: f.trainer, // ✅ Maintenant présent
  price: f.price ? `${parseFloat(f.price).toFixed(2)}€` : '0.00€',
  registered_users: f.num_inscrits // ✅ Utilise le nom correct
}));

        setFormations(formatted);
      } catch (error) {
        console.error("Erreur API:", error.response?.data);
        setFormations([]); 
        setError("Erreur de chargement des données");
      }
    };

    fetchFormations();
  }, []);

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
      /*const response = await axios.post(
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
*/
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

  return (
    <div className="catalogue-container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>

      <h2>Nouvelle Formation Catalogue</h2>

      <div className="existing-formations">
        <h3>Formations existantes</h3>
        <table className="formations-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Durée</th>
              <th>Date de début</th>
              <th>Formateur</th>
              <th>Prix</th>
              <th>Inscrits</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((formation) => (
              <tr key={formation.id}>
                <td>{formation.title}</td>
                <td>{formation.category}</td>
                <td>{formation.duration}</td>
                <td>
                  {formation.start_date 
                    ? new Date(formation.start_date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })
                    : 'Non défini'}
                </td>
                <td>{formation.trainer}</td>
                <td>{formation.price}</td>
                <td>{formation.registered_users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Enregistrement en cours...</div>}

      {/* Formulaire pour ajouter une nouvelle formation */}
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
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
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
