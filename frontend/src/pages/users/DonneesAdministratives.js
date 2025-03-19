import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DonneesAdministratives.css"; 

const DonneesAdministratives = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);  // Ajout d'un état de chargement
    const [error, setError] = useState(null);  // Ajout d'un état pour l'erreur

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); 
            const token = localStorage.getItem('access');
                if (!token) {
                    navigate("/login"); // Rediriger si le token est manquant
                return;
            }
    
            try {
                const response = await axios.get('http://127.0.0.1:8000/get_account_by_email/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                console.log("Réponse de l'API:", response.data);
                setData(response.data);
            } catch (error) {
                console.error('Erreur de récupération :', error);
                if (error.response) {
                    console.log("Erreur HTTP:", error.response.status);
                    console.log("Détails de l'erreur:", error.response.data);
                }
            } finally {
                setLoading(false); // <-- Désactiver le chargement
            }
            
        };
    
        fetchUserData();
    }, []);
    
    

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    return (
        <div className="container">
  <Link to="/dashboard" className="cv-header-back">
    <ArrowLeft size={24} />
  </Link>
  
  <div className="cv-header">
    <img
      src={data.photo ? `http://127.0.0.1:8000${data.photo}` : 'https://via.placeholder.com/100'}
      alt="Photo Employé"
      className="profile-pic"
    />
    <div className="profile">
      <h2>{data.identifier}</h2>
      <div className="info-grid">
        <div className="info-item">
          <strong>Email</strong>
          <span>{data.email}</span>
        </div>
        <div className="info-item">
          <strong>Téléphone</strong>
          <span>{data.phone}</span>
        </div>
      </div>
    </div>
  </div>

  <div className="cv-section">
    <h2>Informations Professionnelles</h2>
    <div className="info-grid">
      <div className="info-item">
        <strong>Département</strong>
        <span>{data.department}</span>
      </div>
      <div className="info-item">
        <strong>Type de contrat</strong>
        <span>{data.contract_type}</span>
      </div>
      <div className="info-item">
        <strong>Date d'embauche</strong>
        <span>{data.start_date}</span>
      </div>
      <div className="info-item">
        <strong>Salaire</strong>
        <span>{data.salary} TND</span>
      </div>
    </div>
  </div>
</div>
    );
}



export default DonneesAdministratives;
