// my-gallery/src/pages/auth/ForgotPassword.tsx

import React, { useState } from 'react';
import { TextField, Typography, Link } from '@mui/material';
import axios from 'axios';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
// import { useAuth } from '../../contexts/AuthContext';

interface ForgotPasswordProps {
    setIsSignUp: (value: boolean) => void;
    setIsForgotPassword: (value: boolean) => void;
  }

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setIsSignUp, setIsForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  //const { isSignUp, setIsSignUp, isForgotPassword, setIsForgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Check if the email exists in the database
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.post('/api/auth/check-email', { email: lowercaseEmail });
      if (response.data.exists) {
        await axios.post('/api/auth/forgot-password', { email: lowercaseEmail });
        setSuccess(true);
      } else {
        setError('Email address is not registered.');
      }
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        sx={{ marginTop: '20px', marginBottom: '20px', width: '250px' }}
      />
      {error && <Typography color="error">{error}</Typography>}
      {success ? (
        <Typography>
          An email with instructions to reset your password has been sent to your email address.
        </Typography>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className={ButtonStyles.button}>
                Submit
            </button>
            </div>
            <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
                Don't have an account?{' '}
                <Link href="#" onClick={(e) => { e.preventDefault(); setIsForgotPassword(false); setIsSignUp(true); }}>
                  Sign Up
                </Link>
            </Typography>
        </>
      )}
    </form>
  );
};

export default ForgotPassword;