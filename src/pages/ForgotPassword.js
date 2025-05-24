import { useState } from 'react';
import axios from 'axios';
import "./Login.css"; // On utilise le même CSS que login

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate ? useNavigate() : () => {};

  const sendResetLink = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://localhost:8000/api/forgot-password/', { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <h2>Mot de passe oublié</h2>
      <form onSubmit={sendResetLink}>
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Entrez votre email"
        />
        <button type="submit">Envoyer le lien de réinitialisation</button>
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