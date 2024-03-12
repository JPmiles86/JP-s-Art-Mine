// my-gallery/src/pages/auth/ResetPassword.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { TextField, Typography, IconButton, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import ButtonStyles from '../../screens/ButtonStyles.module.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const email = new URLSearchParams(location.search).get('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const token = new URLSearchParams(location.search).get('token');

    try {
      await axios.post('/api/auth/reset-password', { token, password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  if (success) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Password Reset Successfully
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          You are resetting the password for:
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {email}
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" align="center" style={{ marginTop: '40px', marginBottom: '20px' }} gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
      You are resetting the password for:
    </Typography>
    <Typography variant="body1" align="center" gutterBottom>
      {email}
    </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{ marginTop: '20px', marginBottom: '10px', width: '250px' }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordVisibility} tabIndex={-1}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          sx={{ marginTop: '10px', marginBottom: '20px', width: '250px' }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordVisibility} tabIndex={-1}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" className={ButtonStyles.button}>
            Reset Password
          </button>
        </div>
      </form>
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        <Link component={RouterLink} to="/">Return to Home</Link>
      </Typography>
    </div>
  );
};

export default ResetPassword;