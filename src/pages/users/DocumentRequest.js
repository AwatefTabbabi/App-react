import React, { useState } from 'react';
import './DocumentRequest.css';

const DocumentRequest = () => {
    const [document, setDocument] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Document:', document);
        console.log('Comment:', comment);
    };

    return (
        <div className="document-request">
            <h1>Demande d'attestation</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Document à produire</label>
                    <select 
                        value={document} 
                        onChange={(e) => setDocument(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Entrez une valeur</option>
                        <option value="Attestation de salaire">Attestation de salaire</option>
                        <option value="Attestation de Travail">Attestation de Travail</option>
                        <option value="Titre de congé">Titre de congé</option>
                    </select>
                    {document === '' && <span className="error">est obligatoire</span>}
                </div>
                <div className="form-group">
                    <label>Commentaire du demandeur</label>
                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Commentaire"
                    />
                </div>
                <button type="submit">ENVOYER</button>
            </form>
        </div>
    );
};

export default DocumentRequest;