import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AbsenceRequest.css';

function AbsenceRequest() {
  const [absenceType, setAbsenceType] = useState("Congé payé");
  const [firstDayAfternoon, setFirstDayAfternoon] = useState(false);
  const [lastDayAfternoon, setLastDayAfternoon] = useState(false);

  return (
    <>
      <div className="absence-request">
        <Link to="/" style={{ marginBottom: '10px', display: 'block' }}>Retour</Link>
        <h2>Demande d'absence</h2>
        <div>
          <label>Nom: </label>
        </div>
        <div>
          <label>Matricule: </label>
        </div>

        <h3>Demande d'absence</h3>
        <table>
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
              <td>Il n'y a pas d'éléments</td>
            </tr>
          </tbody>
        </table>

        <h3>Commentaire du demandeur</h3>
        <textarea placeholder="Commentaire"></textarea>
      </div>

      <div className="absence-request">
        <h3>Type d'absence</h3>
        <select value={absenceType} onChange={(e) => setAbsenceType(e.target.value)}>
          <option value="Congé payé">Congé payé</option>
          {/* Ajoutez d'autres options ici */}
        </select>

        <div>
          <label>
            Premier jour
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
            Dernier jour
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
    </>
  );
}

export default AbsenceRequest;
