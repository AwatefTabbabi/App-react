// src/pages/HRCommunication.js
import React from 'react';
import './HRCommunication.css';

function HRCommunication() {
  return (
    <div className="hr-communication">
      <header>
        <h1>HR Communication</h1>
        <nav>Documents / HR Reports</nav>
      </header>
      <div className="red-bar">
        <span>HR Communication</span>
        <button>&#8635;</button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Chercher" />
        <button type="button">&#128269;</button>
      </div>
      <footer>
        Lignes par page <select><option>5</option></select> 1/7
      </footer>
    </div>
  );
}

export default HRCommunication;