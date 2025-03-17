import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('Veuillez sélectionner des dates valides');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert('La date de fin doit être après la date de début');
      return;
    }

    const token = localStorage.getItem('token');
    
    const absenceData = {
      type: absenceType,
      start_date: startDate,
      end_date: endDate,
      starts_afternoon: firstDayAfternoon,
      ends_afternoon: lastDayAfternoon,
      comment: comment,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/absences/create/",
        absenceData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true, // Important si tu utilises CORS_ALLOW_CREDENTIALS = True
        }
      );

      console.log("Absence créée :", response.data);
      alert("Demande envoyée !");
    } catch (error) {
      console.error("Erreur front :", error);
      alert("Erreur de connexion");
    }
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <div className="absence-request-container">
      {/* Icône Retour */}
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>

      <h2>Demande d'absence</h2>

      <table className="absence-request-table">
        <thead>
          <tr>
            <th>Type d'absence</th>
            <th>Premier jour</th>
            <th>Part dans l'après-midi</th>
            <th>Dernier jour</th>
            <th>Revient dans l'après-midi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{absenceType}</td>
            <td>{startDate || '...'}</td>
            <td>{firstDayAfternoon ? 'Oui' : 'Non'}</td>
            <td>{endDate || '...'}</td>
            <td>{lastDayAfternoon ? 'Oui' : 'Non'}</td>
          </tr>
        </tbody>
      </table>

      <h3>Premier jour d'absence</h3>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={firstDayAfternoon}
            onChange={() => setFirstDayAfternoon(!firstDayAfternoon)}
          />
          Part dans l'après-midi
        </label>
      </div>

      <h3>Dernier jour d'absence</h3>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={lastDayAfternoon}
            onChange={() => setLastDayAfternoon(!lastDayAfternoon)}
          />
          Revient dans l'après-midi
        </label>
      </div>

      <h3>Type d'absence</h3>
      <select
        value={absenceType}
        onChange={(e) => setAbsenceType(e.target.value)}
      >
        <option value="Congé payé">Congé payé</option>
        <option value="Congé sans solde">Congé sans solde</option>
        <option value="Congé maladie">Congé maladie</option>
      </select>

      <h3>Commentaire du demandeur</h3>
      <textarea
        className="comment-textarea"
        placeholder="Commentaire"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className="buttons">
        <button onClick={handleSubmit}>AJOUTER</button>
        <button onClick={() => navigate("/dashboard")}>FERMER</button>

      </div>
    </div>
  );
}

export default AbsenceRequest;
