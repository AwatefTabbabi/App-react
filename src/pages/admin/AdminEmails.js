import React, { useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminEmails.css";

const AdminReclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          setError("Authentification requise");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8000/api/reclamations/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReclamations(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des réclamations.");
      } finally {
        setLoading(false);
      }
    };

    fetchReclamations();
  }, []);

  if (loading) return <div className="loading">Chargement des réclamations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-reclamation-container">
      <Link to="/admin/dashboard" className="back-link">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="main-title">Réclamations des employés</h1>

      {reclamations.length === 0 ? (
        <p>Aucune réclamation trouvée.</p>
      ) : (
        <div className="reclamations-grid">
          {reclamations.map((r) => (
            <div key={r.id} className="reclamation-card">
              <h3>{r.name} — <span className="email">{r.email}</span></h3>
              <p><strong>Téléphone :</strong> {r.phone}</p>
              <p><strong>Type :</strong> {r.complaint_type}</p>
              <p><strong>Détails :</strong> {r.details}</p>
              {r.file && (
                <p>
                  <a 
                    href={`http://localhost:8000${r.file}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="file-link"
                  >
                    📎 Voir pièce jointe
                  </a>
                </p>
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReclamations;
