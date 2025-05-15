import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import './AbsenceRequest.css';

function AbsenceRequest() {
  const navigate = useNavigate();
  const [absenceType, setAbsenceType] = useState("Congé payé");
  const [firstDayAfternoon, setFirstDayAfternoon] = useState(false);
  const [lastDayAfternoon, setLastDayAfternoon] = useState(false);
  const [comment, setComment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userAbsences, setUserAbsences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Rafraîchissement automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCounter(prev => prev + 1);
    }, 5000); // 5 secondes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAbsences = async () => {
      const token = localStorage.getItem("access");
      try {
        const response = await axios.get(
          "http://localhost:8000/api/absences/mine/",
          {
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Cache-Control": "no-cache" // Empêche la mise en cache
            }
          }
        );
        setUserAbsences(response.data);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbsences();
  }, [refreshCounter]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      alert('La date de fin doit être après la date de début');
      return;
    }

    try {
      const token = localStorage.getItem("access");
      const response = await axios.post(
        "http://localhost:8000/api/absences/create/",
        {
          type: absenceType,
          start_date: startDate,
          end_date: endDate,
          starts_afternoon: firstDayAfternoon,
          ends_afternoon: lastDayAfternoon,
          comment: comment,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      // Force un nouveau rafraîchissement après la création
      setRefreshCounter(prev => prev + 1);
      alert("Demande envoyée !");
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      alert("Erreur de connexion");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '...';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getStatusLabel = (status) => {
    switch((status || '').toLowerCase()) {
      case 'approved': return 'Approuvé';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejeté';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="absence-request-container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>

      <h2>Demande d'absence</h2>

      <table className="absence-request-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Début</th>
            <th>Début AM</th>
            <th>Fin</th>
            <th>Fin AM</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {userAbsences.map((absence) => (
            <tr key={absence.id}>
              <td>{absence.type}</td>
              <td>{formatDate(absence.start_date)}</td>
              <td>{absence.starts_afternoon ? '✔' : '✖'}</td>
              <td>{formatDate(absence.end_date)}</td>
              <td>{absence.ends_afternoon ? '✔' : '✖'}</td>
              <td>
                <span className={`status-badge ${absence.status?.toLowerCase()}`}>
                  {getStatusLabel(absence.status)}
                </span>
              </td>
            </tr>
          ))}

          {/* Prévisualisation de la nouvelle demande */}
          <tr className="new-request-preview">
            <td>{absenceType}</td>
            <td>{formatDate(startDate)}</td>
            <td>{firstDayAfternoon ? '✔' : '✖'}</td>
            <td>{formatDate(endDate)}</td>
            <td>{lastDayAfternoon ? '✔' : '✖'}</td>
            <td>
              <span className="status-badge pending">
                {getStatusLabel('pending')}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Formulaire de création */}
      <div className="form-section">
        <h3>Premier jour d'absence</h3>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={firstDayAfternoon}
            onChange={() => setFirstDayAfternoon(!firstDayAfternoon)}
          />
          Départ dans l'après-midi
        </label>

        <h3>Dernier jour d'absence</h3>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={lastDayAfternoon}
            onChange={() => setLastDayAfternoon(!lastDayAfternoon)}
          />
          Retour dans l'après-midi
        </label>

        <h3>Type d'absence</h3>
        <select
          value={absenceType}
          onChange={(e) => setAbsenceType(e.target.value)}
          className="type-select"
        >
          <option value="Congé payé">Congé payé</option>
          <option value="Congé sans solde">Congé sans solde</option>
          <option value="Congé maladie">Congé maladie</option>
        </select>

        <h3>Commentaire</h3>
        <textarea
          className="comment-textarea"
          placeholder="Détails supplémentaires..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="button-group">
          <button 
            onClick={handleSubmit}
            className="submit-button"
          >
            Soumettre la demande
          </button>
          <button 
            onClick={() => navigate("/dashboard")}
            className="cancel-button"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default AbsenceRequest;