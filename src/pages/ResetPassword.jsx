import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const resetPassword = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/reset-password/${uidb64}/${token}/`, {
        password,
      });
      setMessage(res.data.message);
      setSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
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
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="New password"
      />
      <button onClick={resetPassword}>Reset</button>
      <p>{message}</p>
    </div>
  );
}
