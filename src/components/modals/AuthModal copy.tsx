// my-gallery/src/components/modals/AuthModal.tsx

import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Link, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import AnonymousSignUp from '../../pages/auth/AnonymousSignUp';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
import ForgotPassword from '../../pages/auth/ForgotPassword';
import useStore from '../../utils/store';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  showAnonymousOption: boolean;
  isLikeTriggered: boolean;
  photoId?: string;
  diptychIdCode?: string;
  onSuccessfulAuth?: () => void;
  isAnonymousUser: boolean;
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

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, showAnonymousOption, isLikeTriggered, photoId, diptychIdCode, onSuccessfulAuth, isAnonymousUser }) => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const isAnonymous = useStore((state) => state.userId !== null); // Define isAnonymous based on the userId in the store
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAnonymous = async () => {
    try {
      const response = await axios.post('/api/auth/anonymous');
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      useStore.getState().setUserId(response.data.userId); // Store the userId in the store
      useStore.getState().setIsAnonymous(true);

      if (isLikeTriggered && photoId && diptychIdCode) {
        // Register the like here
        await fetch(`/api/likes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: response.data.userId, photoId, diptychIdCode, isLiked: true }),
        });
      }
  
      onClose();
      onSuccessfulAuth?.();
    } catch (error) {
      console.error('Error during anonymous browsing:', error);
    }
  };
  

  const handleClose = () => {
    setIsForgotPassword(false);
    setIsSignUp(false);
    onClose();
  };

  const handleSuccessfulAuth = async () => {
    if (isLikeTriggered && photoId && diptychIdCode) {
      // Register the like here
      await fetch(`/api/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: useStore.getState().userId, photoId, diptychIdCode, isLiked: true }),
      });
    }
    onClose();
    onSuccessfulAuth?.();
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
        {useStore.getState().isAnonymous ? (
          <AnonymousSignUp onClose={handleClose} onSuccessfulAuth={handleSuccessfulAuth} />
        ) : (
          <>
            <Typography variant="h6" align="center" gutterBottom>
              {isForgotPassword ? 'Forgot Password' : isSignUp ? '' : 'Sign In'}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              {isForgotPassword ? (
                <ForgotPassword setIsSignUp={setIsSignUp} setIsForgotPassword={setIsForgotPassword} />
              ) : isSignUp ? (
                <SignUp onClose={handleClose} setIsSignUp={setIsSignUp} onSuccessfulAuth={onSuccessfulAuth} />
              ) : (
                <>
                  <SignIn onClose={handleClose} setIsForgotPassword={setIsForgotPassword} onSuccessfulAuth={handleSuccessfulAuth} />
              <hr style={{ borderTop: '1px solid black', margin: '20px 0', width: '150px' }} />
              <Typography variant="body2" align="center" style={{ marginTop: '5px', marginBottom: '10px' }}>
                New user?
              </Typography>
              <button onClick={() => setIsSignUp(true)} className={ButtonStyles.button}>
                Sign Up
              </button>
              <hr style={{ borderTop: '1px solid black', margin: '35px 0', width: '150px' }} />
              {isLikeTriggered && showAnonymousOption && (
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
        </>
       )}
      </Box>
    </Modal>
  );
};

export default AuthModal;