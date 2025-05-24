import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AbsenceRequest.css"; 

export default function HistoriqueAbsence() {
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbsences = async () => {
      const token = localStorage.getItem("access");
      try {
        const response = await axios.get("http://localhost:8000/api/absences/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });
        setAbsences(response.data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsences();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "...";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusLabel = (status) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "Approuvé";
      case "pending":
        return "En attente";
      case "rejected":
        return "Rejeté";
      default:
        return "Inconnu";
    }
  };

  return (
    <div className="absence-request-container">
      <h2>Historique de mes absences</h2>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <table className="absence-request-table">
          <thead>
            <tr>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Type</th>
              <th>Statut</th>
              <th>Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {absences.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Aucune absence enregistrée.
                </td>
              </tr>
            ) : (
              absences.map((absence, idx) => (
                <tr key={idx}>
                  <td>{formatDate(absence.start_date)}</td>
                  <td>{formatDate(absence.end_date)}</td>
                  <td>{absence.type}</td>
                  <td>
                    <span className={`status-badge ${absence.status?.toLowerCase()}`}>
                      {getStatusLabel(absence.status)}
                    </span>
                  </td>
                  <td>{absence.comment || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
