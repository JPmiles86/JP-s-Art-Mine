// my-gallery/src/pages/auth/SignUp.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SignUpSuccess from './SignUpSuccess';
import useStore from '../../utils/store';
// import { sendSignUpEmail } from '../../utils/emailService';

interface SignUpProps {
    onClose: () => void;
    setIsSignUp: (value: boolean) => void;
    onSuccessfulAuth?: () => void;
  }
  
  const SignUp: React.FC<SignUpProps> = ({ onClose, setIsSignUp, onSuccessfulAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, login } = useAuth(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessPage, setShowSuccessPage] = useState(false);


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
      console.log('Sending sign-up request');
      const response = await axios.post('/api/auth/register', {
        email,
        password,
      });
      console.log('Sign-up response:', response.data);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      useStore.getState().setUserId(response.data.userData.userId);
      login(response.data.token);
      setSuccess(true);
      setShowSuccessPage(true);
  
      await axios.post('/api/auth/send-signup-email', { email });
  
      onSuccessfulAuth?.();
    } catch (error: any) {
      console.error('Error during sign-up:', error);
      if (error.response && error.response.status === 400) {
        setError('Email already exists. Please sign in or use a different email.');
      } else {
        setError('There was an error signing up. Please try again.');
      }
    }
  };

  {error && <Typography color="error">{error}</Typography>}
  {success && (
    <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
      Thanks for signing up. You are now signed in.
    </Typography>
  )}

  return (
    <>
      {showSuccessPage ? (
        <SignUpSuccess />
      ) : (
        <>
        <Typography variant="h6" align="center" gutterBottom>
          Sign Up
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
        <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        Already have an account? <Link href="#" onClick={() => setIsSignUp(false)}>Sign In</Link>
      </Typography>
      </>
      )}
    </>
  );
 }

export default SignUp;