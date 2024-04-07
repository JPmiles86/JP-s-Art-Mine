// my-gallery/src/pages/auth/AnonymousSignUp.tsx

import React, { useState } from 'react';
import { TextField, IconButton, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SignUpSuccess from './SignUpSuccess';
import useStore from '../../utils/store';

interface AnonymousSignUpProps {
  onClose: () => void;
  onSuccessfulAuth?: () => void;
}

const AnonymousSignUp: React.FC<AnonymousSignUpProps> = ({ onClose, onSuccessfulAuth }) => {
    console.log("AnonymousSignUp rendered");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const { setIsAuthenticated, login } = useAuth();
  const userId = useStore((state) => state.userId);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const newUsername = `${extractUsername(email)}#${userId}`;
      const response = await axios.post('/api/auth/anonymous-signup', {
        userId,
        email,
        password,
        username: newUsername,
      });
      login(response.data.token);
      setSuccess(true);
      setShowSuccessPage(true);
      useStore.getState().setIsAnonymous(false);
      await axios.post('/api/auth/send-signup-email', { email });
      onSuccessfulAuth?.();
      console.log('Anonymous sign-up successful');
    } catch (error: any) {
      console.error('Error during anonymous sign-up:', error);
      if (error.response && error.response.status === 400) {
        setError('Email already exists. Please sign in or use a different email.');
      } else {
        setError('There was an error signing up. Please try again.');
      }
    }
  };

  // Extract the username from the email
    const extractUsername = (email: string) => {
        const atIndex = email.indexOf('@');
        return email.slice(0, atIndex);
    };
    
  return (
    <>
      {showSuccessPage ? (
        <SignUpSuccess />
      ) : (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            Anonymous User's Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} tabIndex={-1}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={toggleConfirmPasswordVisibility} tabIndex={-1}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {error && <Typography color="error">{error}</Typography>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className={ButtonStyles.button} style={{ marginTop: '20px', marginBottom: '20px' }}>
                Sign Up
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AnonymousSignUp;