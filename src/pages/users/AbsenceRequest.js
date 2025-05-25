import React, { useState } from 'react';

const AbsenceRequest = () => {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez envoyer la requête à votre backend
    // Exemple : await axios.post('/api/absences', form);
    setMessage('Demande d\'absence envoyée avec succès !');
    setForm({ startDate: '', endDate: '', reason: '' });
  };

  return (
    <div>
      <h2>Demande d'absence</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date de début :</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de fin :</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Motif :</label>
          <input
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default AbsenceRequest;