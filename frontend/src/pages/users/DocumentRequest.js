import React, { useState } from 'react';
import './DocumentRequest.css';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import de l'icône
const DocumentRequest = () => {
    const [document, setDocument] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState(''); // Initialement vide, pas de statut affiché

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!document) {
            alert("Veuillez sélectionner un document !");
            return;
        }

        // Logique de soumission de la demande
        console.log('Document:', document);
        console.log('Commentaire:', comment);

        // Simuler un traitement de demande (par exemple, une API)
        setStatus('En cours'); // Afficher "En cours" dès l'envoi

        // Après un délai de 3 secondes, on met à jour le statut
        setTimeout(() => {
            setStatus('Acceptée'); // Simulation de l'acceptation
        }, 3000);
    };

    return (
        <div className="document-request">
             {/* Icône Retour */}
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

            {/* Affichage du statut seulement après le délai ou la mise à jour */}
            {status && (
                <div className={`status ${status === 'En cours' ? 'pending' : 'accepted'}`}>
                    <strong>Statut de la demande :</strong> {status}
                </div>
            )}
        </div>
    );
};

export default DocumentRequest;
