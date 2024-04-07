// my-gallery/src/pages/auth/SignIn.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, IconButton, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useStore from '../../utils/store';

interface SignInProps {
    onClose: () => void;
    setIsForgotPassword: (value: boolean) => void;
    onSuccessfulAuth?: () => void;
  }

const SignIn: React.FC<SignInProps> = ({ onClose, setIsForgotPassword, onSuccessfulAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, login } = useAuth(); 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  // const [isForgotPassword, setIsForgotPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const lowercaseEmail = email.toLowerCase();
    const response = await axios.post('/api/auth/login', { email: lowercaseEmail, password });
    const user = response.data.userData;
    login(response.data.token);
    useStore.getState().setUserId(user.userId);
    useStore.getState().setUserRole(user.role);
    useStore.getState().setIsAnonymous(user.isAnonymous);
    onClose();
    onSuccessfulAuth?.();
    console.log('Sign-in successful');
  } catch (error) {
    console.error('Error during sign-in:', error);
    setError('Invalid email or password.');
  }
};
  
  {error && <Typography color="error">{error}</Typography>}

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        sx={{ marginTop: '20px', marginBottom: '0px' }}
        error={!!error}
        />
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        sx={{ marginTop: '20px', marginBottom: '0px' }}
        error={!!error}
        InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordVisibility} tabIndex={-1}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            ),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit" className={ButtonStyles.button} style={{ marginTop: '20px', marginBottom: '20px' }}>
            Sign In
        </button>
    </div>
    <Typography variant="body2" align="center" style={{ marginTop: '0px', marginBottom: '5px' }}>
        <Link href="#" onClick={() => setIsForgotPassword(true)}>Forgot Password?</Link>
    </Typography>
    </form>
  );
};

export default SignIn;