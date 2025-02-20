import React from 'react';
import { Link } from 'react-router-dom';

// ./src/pages/Absences.js
const Absences = () => {
  return (
    <div className="absences">
      <h2>Mes absences</h2>
      <ul>
        <li><span>&#128683;</span> Annulation d'absence</li>
        <li>
          <Link to="/demande-absence" style={{ textDecoration: 'none', color: 'blue' }}>
            <span>&#9200;</span> Demande d'absence
          </Link>
        </li>
        <li><span>&#128200;</span> Mon planning d'absences</li>
        <li><span>&#128340;</span> Historique des absences</li>
        <li><span>&#128197;</span> Planning d'équipe</li>
        <li><span>&#128176;</span> Consultation des soldes</li>
      </ul>
    </div>
  );
};

export default Absences;

