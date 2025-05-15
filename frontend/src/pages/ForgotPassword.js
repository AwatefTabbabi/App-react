import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Step 1: Send verification code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await axios.post('/api/forgot-password', { email });
      setMessage('Un code de vérification a été envoyé à votre email.');
      setStep(2);
    } catch (err) {
      setError('Erreur lors de l’envoi du code.');
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await axios.post('/api/verify-code', { email, code });
      setMessage('Code vérifié. Veuillez entrer un nouveau mot de passe.');
      setStep(3);
    } catch (err) {
      setError('Code de vérification invalide.');
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await axios.post('/api/reset-password', { email, code, newPassword });
      setMessage('Votre mot de passe a été réinitialisé avec succès.');
      setStep(1); // Optionally reset steps or redirect to login
    } catch (err) {
      setError('Erreur lors de la réinitialisation du mot de passe.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Mot de passe oublié</h2>
      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Envoyer le code</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <label htmlFor="code">Code de vérification :</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
          <button type="submit">Vérifier le code</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <label htmlFor="newPassword">Nouveau mot de passe :</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Réinitialiser le mot de passe</button>
        </form>
      )}
      {message && <p style={{color: 'green'}}>{message}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;