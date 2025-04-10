import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import './DocumentRequest.css';

function DocumentRequest() {
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentType) {
      alert('Veuillez sélectionner un document !');
      return;
    }

    const token = localStorage.getItem("access");

    const documentData = {
      document_type: documentType,
      comment: comment,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/documents/",
        documentData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true, // Important si CORS_ALLOW_CREDENTIALS = True
        }
      );

      console.log("Demande de document créée :", response.data);
      alert("Demande envoyée !");
    } catch (error) {
      console.error("Erreur front :", error);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="document-request">
      {/* Icône Retour */}
      <Link to="/" className="back-icon">
        <ArrowLeft size={24} />
      </Link>

      <h2>Demande d'attestation</h2>

      <h3>Type de document</h3>
      <select
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        required
      >
        <option value="" disabled>-- Sélectionnez un document --</option>
        <option value="Attestation de salaire">Attestation de salaire</option>
        <option value="Attestation de Travail">Attestation de Travail</option>
        <option value="Titre de congé">Titre de congé</option>
      </select>

      <h3>Commentaire du demandeur</h3>
      <textarea
        className="comment-textarea"
        placeholder="Ajoutez un commentaire (optionnel)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className="buttons">
        <button onClick={handleSubmit}>ENVOYER</button>
        <button onClick={() => navigate("/dashboard")}>FERMER</button>
      </div>
    </div>
  );
}

export default DocumentRequest;
