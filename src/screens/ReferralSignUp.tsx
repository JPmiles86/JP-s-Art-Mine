import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useStore from '../utils/store';
import buttonStyles from './ButtonStyles.module.css';
import { useAuth } from '../contexts/AuthContext';

const ReferralSignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const baseUrl = useStore((state) => state.baseUrl);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('referralCode');
    const emailParam = params.get('email');
    const firstNameParam = params.get('firstName');
    const lastNameParam = params.get('lastName');
    
    if (code) setReferralCode(code);
    if (emailParam) setEmail(emailParam);
    if (firstNameParam) setFirstName(firstNameParam);
    if (lastNameParam) setLastName(lastNameParam);
  }, [location.search]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/api/auth/referralSignUp`, {
        email,
        password,
        firstName,
        lastName,
        referralCode,
      });
      const { token, message } = response.data;
      setMessage(message);
      login(token);
      setTimeout(() => {
        navigate('/');
      }, 100);
    } catch (error) {
      console.error('Error signing up:', error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setMessage('Email already exists. Please try logging in.');
      } else {
        setMessage('Failed to sign up');
      }
    }
  };

  return (
    <Box sx={{ mt: 10, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Referral Sign-Up
      </Typography>
      <Typography variant="body1" align="center" sx={{ mx: 'auto', maxWidth: '60%' }}>
        Welcome to my art site! By signing up using this referral, you'll ensure your friend receives their reward when you make your first purchase. 
        You can also start earning rewards by referring others once you've signed up.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'center', maxWidth: '40%', mx: 'auto', mt: 3 }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} tabIndex={-1}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility} tabIndex={-1}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button type="submit" className={buttonStyles.button}>
          Sign Up
        </button>
      </Box>
      {message && (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ReferralSignUp;
