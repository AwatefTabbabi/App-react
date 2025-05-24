import { useState } from 'react';
import axios from 'axios';
import "./ForgotPassword.css";
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendResetLink = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/forgot-password/', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
   <div className="login-container">
     <h2>Forgot Password</h2>
     <label htmlFor="email">Email :</label>
     <input
       id="email"
       value={email}
       onChange={e => setEmail(e.target.value)}
       placeholder="Enter your email"
       type="email"
     />
     <button onClick={sendResetLink}>Send Reset Link</button>
     <p>{message}</p>
   </div>
  );
}
