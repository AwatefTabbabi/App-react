import React, { useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./AdminDemandes.css"; // Réutilise le même CSS

const CatalogueFormations = () => {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');
      
      try {
        const response = await axios.get('http://localhost:8000/api/catalogue/', {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });

        setFormations(response.data);
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFetchError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access');
      setError("Session expirée - Veuillez vous reconnecter");
    } else {
      setError(`Erreur: ${error.message}`);
    }
  };

  const filteredFormations = formations.filter(formation =>
    formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formation.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnrollment = async (formationId) => {
    try {
      await axios.post(
        'http://localhost:8000/api/enroll/',
        { formation_id: formationId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('access')}` } }
      );
      alert('Inscription réussie !');
    } catch (error) {
      alert(error.response?.data?.error || 'Erreur lors de l\'inscription');
    }
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-container">
      <Link to="/dashboard" className="back-link">
        <ArrowLeft size={24} />
      </Link>

      <h1 className="main-title">Catalogue des Formations</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Rechercher par titre ou catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="requests-grid">
        {filteredFormations.map(formation => (
          <div key={formation.id} className="request-card formation-card">
            <div className="request-header">
              <span className="formation-title">{formation.title}</span>
              <span className={`formation-category ${formation.category}`}>
                {formation.category}
              </span>
            </div>
            
            <div className="request-body">
  <p>🕒 Durée : {formation.duration}h</p>
  <p>📅 Début : {formation.start_date ? new Date(formation.start_date).toLocaleDateString() : "Non défini"}</p>
  <p>💰 Prix : {formation.price ? `${formation.price}€` : "-"}</p>
  <p>👨🏫 Formateur : {formation.trainer || "Non renseigné"}</p>
  <p>👥 Inscrits : {formation.registered_users || 0}</p>
</div>

            <button 
              onClick={() => handleEnrollment(formation.id)}
              className="btn-approve enroll-btn"
            >
              S'inscrire
            </button>
          </div>
        ))}
      </div>

      {filteredFormations.length === 0 && (
        <div className="no-results">Aucune formation trouvée</div>
      )}
    </div>
  );
};

export default CatalogueFormations;