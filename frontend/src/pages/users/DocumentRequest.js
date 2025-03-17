import React, { useState, useEffect } from 'react';
import './DocumentRequest.css';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DocumentRequest = () => {
    const [document, setDocument] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('');

    // Fonction pour soumettre la demande de document
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!document) {
            alert("Veuillez sélectionner un document !");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/documents/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    document_type: document,
                    comment: comment
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('En cours');
                // Simulation d'acceptation après 3 secondes
                setTimeout(() => {
                    setStatus('Acceptée');
                }, 3000);
            } else {
                setStatus('Rejetée');
                alert(data.error || 'Erreur lors de la soumission');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('Erreur de connexion');
            alert('Impossible de se connecter au serveur');
        }
    };

    return (
        <div className="document-request">
            <Link to="/" className="back-icon">
                <ArrowLeft size={24} />
            </Link>
            
            <h1>Demande d'attestation</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Document à produire <span className="required">*</span></label>
                    <select 
                        value={document} 
                        onChange={(e) => setDocument(e.target.value)} 
                        required
                    >
                        <option value="" disabled>-- Sélectionnez un document --</option>
                        <option value="Attestation de salaire">Attestation de salaire</option>
                        <option value="Attestation de Travail">Attestation de Travail</option>
                        <option value="Titre de congé">Titre de congé</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Commentaire du demandeur</label>
                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Ajoutez un commentaire (optionnel)"
                    />
                </div>

                <button type="submit">ENVOYER</button>
            </form>

            {status && (
                <div className={`status ${status === 'En cours' ? 'pending' : status === 'Acceptée' ? 'accepted' : 'rejected'}`}>
                    <strong>Statut de la demande :</strong> {status}
                </div>
            )}
        </div>
    );
};

export default DocumentRequest;