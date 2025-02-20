import React, { useState } from 'react';
import './AbsenceCancellation.css';

const AbsenceCancellation = () => {
    const [absence, setAbsence] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Absence sélectionnée:', absence);
        console.log('Raison d’annulation:', reason);
    };

    return (
        <div className="absence-cancellation">
            <h1>Annulation d'absence</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Absence à annuler</label>
                    <select 
                        value={absence} 
                        onChange={(e) => setAbsence(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Choisissez une absence</option>
                        <option value="Congé annuel">Congé annuel</option>
                        <option value="Maladie">Congé maladie</option>
                        <option value="Congé sans solde">Congé sans solde</option>
                    </select>
                    {absence === '' && <span className="error">est obligatoire</span>}
                </div>
                <div className="form-group">
                    <label>Raison d’annulation</label>
                    <textarea 
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)} 
                        placeholder="Expliquez pourquoi vous souhaitez annuler votre absence"
                        required
                    />
                </div>
                <button type="submit">ENVOYER</button>
            </form>
        </div>
    );
};

export default AbsenceCancellation;
