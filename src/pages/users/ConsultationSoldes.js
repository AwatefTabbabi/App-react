import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AbsenceRequest.css"; // Pour garder le même style

export default function ConsultationSoldes() {
  const [solde, setSolde] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/absences/solde/")
      .then(res => setSolde(res.data))
      .catch(() => setSolde(null));
  }, []);

  return (
    <div className="absence-request-container">
      <h2>Consultation de mes soldes</h2>
      {solde ? (
        <div style={{ fontSize: "22px", color: "#003366", margin: "30px 0" }}>
          <strong>Jours d'absence restants : </strong>
          {solde.jours_restants}
        </div>
      ) : (
        <div style={{ color: "#c0392b" }}>Impossible de charger le solde.</div>
      )}
    </div>
  );
}