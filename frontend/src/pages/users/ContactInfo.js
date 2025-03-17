import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import './ContactInfo.css';

function ContactInfo() {
  const [contactData, setContactData] = useState({
    email: "",
    telephone: "",
    portable: "",
    fax: ""
  });

  useEffect(() => {
    const fetchContactData = async () => {
      const token = localStorage.getItem('access'); 
      if (!token) {
        console.log("Aucun token trouvé !");
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}` 
        }
        });

        const data = response.data;
        setContactData({
          email: data.email || "",
          telephone: data.telephone || "",  
          portable: data.portable || "",
          fax: data.fax || ""
        });

      } catch (error) {
        console.error('Erreur de récupération:', error);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    
  try {
    const response = await fetch('http://127.0.0.1:8000/api/user/update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify(contactData) // Envoyer les données au format JSON
    });

    if (response.ok) {
      alert('Informations mises à jour !');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }

  };

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
        <input 
          type="email" 
          name="email"
          value={contactData.email} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>N° de téléphone personnel</label>
        <input 
          type="text" 
          name="telephone"
          value={contactData.telephone} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>N° de phone</label>
        <input 
          type="text" 
          name="portable"
          value={contactData.portable} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>N° de fax personnel</label>
        <input 
          type="text" 
          name="fax"
          value={contactData.fax} 
          onChange={handleChange} 
        />
      </div>

      <div className="buttons">
        <button className="draft">DRAFT</button>
        <button className="send" onClick={handleSubmit}>ENVOYER</button>
      </div>
    </div>
  </div>
);
}

export default ContactInfo;
