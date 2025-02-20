import React from 'react';
import './ContactInfo.css';

function ContactInfo() {
  return (
    <div className="contact-info">
      <h2>Adresses</h2>
      <table>
        <thead>
          <tr>
            <th>Sélectionné</th>
            <th>Type d'adresse</th>
            <th>Pays</th>
            <th>Code postal</th>
            <th>Ville</th>
            <th>Gouvernement</th>
            <th>Document de...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Adresse de résidence</td>
            <td>Tunisie</td>
            {/* Ajoutez les autres colonnes ici */}
          </tr>
          {/* Ajoutez d'autres lignes ici */}
        </tbody>
      </table>

      <h2>Contacts</h2>
      <div>
        <label>Courrier électronique personnel: </label>
      </div>
      <div>
        <label>N° de téléphone personnel: </label>
      </div>
      {/* Ajoutez d'autres informations ici */}

      <button>DRAFT</button>
      <button>ENVOYER</button>
    </div>
  );
}

export default ContactInfo;