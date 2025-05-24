import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

export default function ResetPassword() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axios.post(`http://localhost:8000/api/reset-password/${uidb64}/${token}/`, {
        password,
      });
      setMessage(res.data.message);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setSuccess(false);
    }
  };

  // Redirection après 3 secondes si succès
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="login-container">
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="password">Nouveau mot de passe :</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Entrez votre nouveau mot de passe"
        />
        <button type="submit">Réinitialiser le mot de passe</button>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
      </form>

      <div className="login-links">
        <p>
          <span className="link-text" onClick={() => navigate("/login")}>
            Retour à la connexion
          </span>
        </p>
        <p>
          <span className="link-text" onClick={() => navigate("/signup")}>
            Créer un compte
          </span>
        </p>
      </div>
    </div>
  );
}