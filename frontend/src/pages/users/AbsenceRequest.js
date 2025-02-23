import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import de l'icône
import './AbsenceRequest.css';

function AbsenceRequest() {
  const [absenceType, setAbsenceType] = useState("Congé payé");
  const [firstDayAfternoon, setFirstDayAfternoon] = useState(false);
  const [lastDayAfternoon, setLastDayAfternoon] = useState(false);

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
            <td colSpan="5" style={{ textAlign: 'center' }}>Il n'y a pas d'éléments</td>
          </tr>
        </tbody>
      </table>

      <h3>Commentaire du demandeur</h3>
      <textarea className="comment-textarea" placeholder="Commentaire"></textarea>

      <h3>Type d'absence</h3>
      <select value={absenceType} onChange={(e) => setAbsenceType(e.target.value)}>
        <option value="Congé payé">Congé payé</option>
        {/* Ajoutez d'autres options ici */}
      </select>

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

      <button>AJOUTER</button>
      <button>FERMER</button>
    </div>
  );
}

export default AbsenceRequest;
