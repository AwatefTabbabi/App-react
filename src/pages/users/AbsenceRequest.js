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
  const [setUserAbsences] = useState([]);
  const [setLoading] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCounter(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAbsences = async () => {
      const token = localStorage.getItem("access");
      try {
        const response = await axios.get(
          "http://localhost:8000/api/absences/",
          {
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Cache-Control": "no-cache"
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
  }, [refreshCounter,setLoading]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      alert('La date de fin doit être après la date de début');
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await axios.post(
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
      
      setRefreshCounter(prev => prev + 1);
      alert("Demande envoyée !");
      setComment("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      alert("Erreur de connexion");
    }
  };



  
  
  return (
    <div className="absence-request-container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
{/* 
      <h2>Gestion des Absences</h2>

      <div className="table-wrapper">
        <table className="formations-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Durée</th>
              <th>Départ AM</th>
              <th>Retour AM</th>
              <th>Statut</th>
              <th>Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {userAbsences.map((absence) => (
              <tr key={absence.id}>
                <td>{absence.type}</td>
                <td>{formatDate(absence.start_date)}</td>
                <td>{formatDate(absence.end_date)}</td>
                <td>{calculateDuration(absence.start_date, absence.end_date)}</td>
                <td>{absence.starts_afternoon ? '✔' : '✖'}</td>
                <td>{absence.ends_afternoon ? '✔' : '✖'}</td>
                <td>
                  <span className={`status-badge ${absence.status?.toLowerCase()}`}>
                    {getStatusLabel(absence.status)}
                  </span>
                </td>
                <td className="comment-cell">{absence.comment || '-'}</td>
              </tr>
            ))}

            <tr className="new-request-preview">
              <td>{absenceType}</td>
              <td>{formatDate(startDate)}</td>
              <td>{formatDate(endDate)}</td>
              <td>{calculateDuration(startDate, endDate)}</td>
              <td>{firstDayAfternoon ? '✔' : '✖'}</td>
              <td>{lastDayAfternoon ? '✔' : '✖'}</td>
              <td>
                <span className="status-badge pending">
                  {getStatusLabel('pending')}
                </span>
              </td>
              <td className="comment-cell">{comment || '-'}</td>
            </tr> 
          </tbody>
        </table>
      </div>
*/}
      <div className="form-section">
        <h3>Nouvelle Demande d'Absence</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Type d'absence :</label>
            <select
              value={absenceType}
              onChange={(e) => setAbsenceType(e.target.value)}
            >
              <option value="Congé payé">Congé payé</option>
              <option value="Congé sans solde">Congé sans solde</option>
              <option value="Congé maladie">Congé maladie</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date de début :</label>
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
              Départ après-midi
            </label>
          </div>

          <div className="form-group">
            <label>Date de fin :</label>
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
              Retour après-midi
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Commentaire :</label>
          <textarea
            placeholder="Détails supplémentaires..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
          />
        </div>

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