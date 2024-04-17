// my-gallery/src/components/modals/TimerOverModal.tsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface TimerOverModalProps {
  renewTimer: () => void;
  backToInquire: () => void;
  onClose: () => void;
}

const TimerOverModal: React.FC<TimerOverModalProps> = ({ renewTimer, backToInquire, onClose }) => {
  const handleContinuePurchase = () => {
    renewTimer();
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="timer-over-modal-title">
      <DialogTitle id="timer-over-modal-title" style={{ textAlign: 'center' }}>Timer Expired</DialogTitle>
      <DialogContent>
        <Typography style={{ textAlign: 'center' }}>
          The time to complete your purchase has expired.<br />
          The artwork is now marked as available again.
        </Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <button onClick={handleContinuePurchase} className={buttonStyles.button}>Continue Purchase</button>
        <button onClick={backToInquire} className={buttonStyles.button}>Back to Inquire</button>
      </DialogActions>
    </Dialog>
  );
};

export default TimerOverModal;