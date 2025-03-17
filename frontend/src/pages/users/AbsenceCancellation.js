import React, { useState, useEffect } from 'react';
import './AbsenceCancellation.css';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AbsenceCancellation = () => {
    const [selectedType, setSelectedType] = useState('');
    const [comment, setComment] = useState(''); // Renommé 'reason' -> 'comment'
    const [absences, setAbsences] = useState([]);

    // Récupérer les demandes
    useEffect(() => {
        const token = localStorage.getItem('token');
        

        const fetchAbsences = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/absences/', {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
                const data = await response.json();
                setAbsences(data.filter(a => a.status === 'pending'));
            } catch (error) {
                alert("Erreur de chargement");
            }
        };
        fetchAbsences();
    }, []);

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/absences/cancel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    type: selectedType,
                    comment: comment  // Envoi du commentaire
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Échec');

            // Mise à jour de l'UI
            setAbsences(prev => prev.filter(abs => abs.type !== selectedType));
            setSelectedType('');
            setComment('');
            alert(data.message);

        } catch (error) {
            alert(error.message);
        }
    };

    

    return (
        <div className="absence-cancellation">
            <Link to="/" className="back-icon">
                <ArrowLeft size={24} />
            </Link>
            
            <h1>Annulation d'absence</h1>
            
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Type d'absence</label>
                <select 
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value.trim())} // Supprime les espaces
>
                        <option value="" disabled>Choisir un type</option>
                        <option value="Congé payé">Congé payé</option>
                        <option value="Congé maladie">Congé maladie</option>
                        <option value="Congé sans solde">Congé sans solde</option>
                        {[...new Set(absences.map(a => a.type))].map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Raison</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Motif d'annulation..."
                        required
                    />
                </div>
                
                <button type="submit">CONFIRMER L'ANNULATION</button>
            </form>

            {/* Affichage des demandes */}
            <div className="absences-list">
    

    {absences.map(abs => (
        <div
            key={abs.id}
            className={`absence-item ${abs.status}`}  // Ajoute une classe CSS dynamique selon le statut
        >
            <strong>{abs.type}</strong> - Du {abs.start_date} au {abs.end_date}  
            <span className={`status ${abs.status}`}>
                {abs.status === 'pending' && '🕒 En attente'}
                {abs.status === 'approved' && '✅ Approuvé'}
                {abs.status === 'rejected' && '❌ Rejeté'}
                {abs.status === 'cancelled' && '🚫 Annulé'}
            </span>

            {abs.comment && (
                <div className="absence-comment">
                    <em>Commentaire : {abs.comment}</em>
                </div>
            )}
        </div>
    ))}
</div>

        </div>
    );
};

export default AbsenceCancellation;