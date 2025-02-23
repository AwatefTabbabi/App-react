import React, { useState, useEffect } from "react";
import "./DonneesAdministratives.css"; // Réutilisation du même fichier CSS
import { ArrowLeft } from 'lucide-react'; // Import de l'icône
import { Link } from 'react-router-dom';
const DonneesAdministratives = () => {
  const [adminInfo, setAdminInfo] = useState({
    id: "EMP123456",
    name: "Tabbabi Awatef",
    email: "awatef@example.com",
    department: "Informatique",
    position: "Développeur Full Stack",
    contractType: "CDI",
    startDate: "15 Janvier 2020",
    salary: "Confidentiel",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3G5eOFECKar3jygplN1RJSNBA3hPUIDjQ9g&s",
  });

  useEffect(() => {
    // Simulation de récupération des données depuis une API
    // fetch('/api/admin-data').then(response => response.json()).then(data => setAdminInfo(data));
  }, []);

  return (
    <div className="cv-container">
       {/* Icône Retour */}
       <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <div className="cv-header">
        <img src={adminInfo.photo} alt="Photo Employé" className="cv-photo" />
        <h1>{adminInfo.name}</h1>
        <h2>{adminInfo.position}</h2>
      </div>

      <div className="cv-body">
        <div className="cv-section">
          <h3>Informations Générales</h3>
          <p><strong>Identifiant:</strong> {adminInfo.id}</p>
          <p><strong>Email:</strong> {adminInfo.email}</p>
          <p><strong>Département:</strong> {adminInfo.department}</p>
        </div>

        <div className="cv-section">
          <h3>Contrat</h3>
          <p><strong>Type de contrat:</strong> {adminInfo.contractType}</p>
          <p><strong>Date de début:</strong> {adminInfo.startDate}</p>
          <p><strong>Salaire:</strong> {adminInfo.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default DonneesAdministratives;
