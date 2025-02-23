import React, { useState } from 'react';
import './ContactInfo.css';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
function ContactInfo() {
  // Exemple de données d'adresses (vous pouvez les charger depuis une API)
  const [email, setEmail] = useState("awatef@gmail.com");
  const [telephone, setTelephone] = useState("27036364");
  const [portable, setPortable] = useState("");
  const [fax, setFax] = useState("");

  return (
    <div className="container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <div className="card">
        <h2>Adresses</h2>
        <table>
          <thead>
            <tr>
              <th>Sélectionné</th>
              <th>Type d'adresse</th>
              <th>Pays</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Adresse de résidence</td>
              <td>Tunisie</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Adresse domicile</td>
              <td>Tunisie</td>
            </tr>
          </tbody>
        </table>

        <h2>Contacts</h2>
        <div className="form-group">
          <label>Courrier électronique personnel</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>N° de téléphone personnel</label>
          <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div className="form-group">
          <label>N° de portable</label>
          <input type="text" value={portable} onChange={(e) => setPortable(e.target.value)} />
        </div>
        <div className="form-group">
          <label>N° de fax personnel</label>
          <input type="text" value={fax} onChange={(e) => setFax(e.target.value)} />
        </div>

        <div className="buttons">
          <button className="draft">DRAFT</button>
          <button className="send">ENVOYER</button>
        </div>
      </div>
    </div>
  );
};


export default ContactInfo;
