import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DonneesAdministratives.css"; 

const DonneesAdministratives = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); 
            const token = localStorage.getItem('access');
            
            if (!token) {
                navigate("/login");
                return;
            }
    
            try {
                // Correction ici : ajout de la déclaration 'response'
                const response = await axios.get('http://localhost:8000/account/', {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                console.log("Réponse de l'API:", response.data);
                setData(response.data);
                setError(null);
            } catch (error) {
                console.error('Erreur de récupération :', error);
                setError("Erreur lors du chargement des données");
                if (error.response?.status === 401) {
                    localStorage.removeItem('access');
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, [navigate]); // Ajout de 'navigate' dans les dépendances

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!data) {
        return <div>Aucune donnée disponible</div>;
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
                    <h2>{data.identifier || "Non spécifié"}</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <strong>Email</strong>
                            <span>{data.email || "-"}</span>
                        </div>
                        <div className="info-item">
                            <strong>Téléphone</strong>
                            <span>{data.phone || "-"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cv-section">
                <h2>Informations Professionnelles</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <strong>Département</strong>
                        <span>{data.department || "-"}</span>
                    </div>
                    <div className="info-item">
                        <strong>Type de contrat</strong>
                        <span>{data.contract_type || "-"}</span>
                    </div>
                    <div className="info-item">
                        <strong>Date d'embauche</strong>
                        <span>{data.start_date || "-"}</span>
                    </div>
                    <div className="info-item">
                        <strong>Salaire</strong>
                        <span>{data.salary ? `${data.salary} TND` : "-"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonneesAdministratives;