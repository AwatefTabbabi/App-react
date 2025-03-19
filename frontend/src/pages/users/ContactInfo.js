import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import './ContactInfo.css';

function ContactInfo() {
  const [userData, setUserData] = useState({
    email: "",
    telephone: "",
    portable: "",
    fax: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get_account_by_email', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        });

        const data = response.data;
        setUserData({
          email: data.email || "",
          telephone: data.phone || "",
          portable: data.portable || "",
          fax: data.fax || "",
          address: data.address || "",
          
        });

      } catch (error) {
        console.error('Erreur de récupération:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/update/',
        userData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        alert('Informations mises à jour !');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="info-container">
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>
      <div className="card">

        <h2>Coordonnées</h2>
        <div className="form-group">
          <label>Adresse</label>
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Téléphone fixe</label>
          <input
            type="text"
            name="telephone"
            value={userData.telephone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Téléphone portable</label>
          <input
            type="text"
            name="portable"
            value={userData.portable}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fax</label>
          <input
            type="text"
            name="fax"
            value={userData.fax}
            onChange={handleChange}
          />
        </div>

        <div className="buttons">
          <button className="draft">Enregistrer brouillon</button>
          <button className="send" onClick={handleSubmit}>
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;