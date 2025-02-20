import React, { useState, useEffect } from "react";
import "./EmployerProfile.css"; // Réutilisation du même fichier CSS

const DonneesAdministratives = () => {
  const [adminInfo, setAdminInfo] = useState({
    id: "EMP123456",
    name: "Nom Employé",
    email: "employe@example.com",
    department: "Informatique",
    position: "Développeur Full Stack",
    contractType: "CDI",
    startDate: "15 Janvier 2020",
    salary: "Confidentiel",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3G5eOFECKar3jygplN1RJSNBA3hPUIDjQ9g&s",
  });

  useEffect(() => {
    // Récupérer les données via API si nécessaire
    // fetch('/api/admin-data').then(response => response.json()).then(data => setAdminInfo(data));
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-imag-container">
          <img src={adminInfo.photo} alt="Photo Employé" className="profile-imag" />
        </div>
        <div className="profile-details">
          <h1>Données Administratives</h1>
          <p><strong>Nom:</strong> {adminInfo.name}</p>
          <p><strong>Identifiant:</strong> {adminInfo.id}</p>
          <p><strong>Email:</strong> {adminInfo.email}</p>
          <p><strong>Département:</strong> {adminInfo.department}</p>
          <p><strong>Poste:</strong> {adminInfo.position}</p>
          <p><strong>Type de contrat:</strong> {adminInfo.contractType}</p>
          <p><strong>Date de début:</strong> {adminInfo.startDate}</p>
          <p><strong>Salaire:</strong> {adminInfo.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default DonneesAdministratives;
