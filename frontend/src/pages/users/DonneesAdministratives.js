import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./DonneesAdministratives.css"; 

const DonneesAdministratives = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access');
                const response = await axios.get('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Erreur de récupération :', error);
            }
        };

        fetchUserData();
    }, []);

    if (!data) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container">
            <Link to="/dashboard">
                <ArrowLeft size={24} />
            </Link>
            <div className="profile">
                <img
                    src={data.photo ? `http://127.0.0.1:8000${data.photo}` : 'https://via.placeholder.com/100'}
                    alt="Photo Employé"
                    className="profile-pic"
                />
                <h2>Informations Générales</h2>
                <p><strong>Identifiant:</strong> {data.identifiant}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Département:</strong> {data.department}</p>
            
                <h2>Contrat</h2>
                <p><strong>Type de contrat:</strong> {data.contract_type}</p>
                <p><strong>Date de début:</strong> {data.date_debut}</p>
                <p><strong>Salaire:</strong> {data.salaire} TND</p>
            </div>
        </div>
    );
}

export default DonneesAdministratives;
