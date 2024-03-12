// my-gallery/src/components/modals/AuthModal.tsx

import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Link, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
import ForgotPassword from '../../pages/auth/ForgotPassword';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  showAnonymousOption: boolean;
}

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    outline: 'none',
    width: '400px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
}));

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, showAnonymousOption }) => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleAnonymous = async () => {
    try {
      const response = await axios.post('/api/auth/anonymous');
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      onClose();
    } catch (error) {
      // Handle anonymous user creation error
    }
  };

  const handleClose = () => {
    setIsForgotPassword(false);
    setIsSignUp(false);
    onClose();
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <Box className={classes.modalContent}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" align="center" gutterBottom>
          {isForgotPassword ? 'Forgot Password' : isSignUp ? '' : 'Sign In'}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          {isForgotPassword ? (
            <ForgotPassword setIsSignUp={setIsSignUp} setIsForgotPassword={setIsForgotPassword} />
          ) : isSignUp ? (
            <>
              <SignUp onClose={handleClose} setIsSignUp={setIsSignUp} />
            </>
          ) : (
            <>
              <SignIn onClose={handleClose} setIsForgotPassword={setIsForgotPassword} />
              <hr style={{ borderTop: '1px solid black', margin: '20px 0', width: '150px' }} />
              <Typography variant="body2" align="center" style={{ marginTop: '5px', marginBottom: '10px' }}>
                New user?
              </Typography>
              <button onClick={() => setIsSignUp(true)} className={ButtonStyles.button}>
                Sign Up
              </button>
              <hr style={{ borderTop: '1px solid black', margin: '35px 0', width: '150px' }} />
             {showAnonymousOption && (
                <>
                  <Typography variant="body2" align="center" style={{ marginTop: '-10px', marginBottom: '20px' }}>
                    or...
                  </Typography>
                  <button onClick={handleAnonymous} className={ButtonStyles.button}>
                    Like Anonymously
                  </button>
                  <Typography variant="body2" align="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    Anonymous browsing allows you to contribute likes to artwork totals and creates a favorites list for you.
                    If you sign up within the same session, your favorites list will be saved with your new profile.   PLEASE NOTE: Once you leave the site,
                    your anonymous favorites cannot be retrieved later.
                  </Typography>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
 }

export default AuthModal;