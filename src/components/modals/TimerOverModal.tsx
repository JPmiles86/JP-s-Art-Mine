import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import axios from 'axios';
import { updateArtworkStatus } from '../../utils/artworkApi';

interface TimerOverModalProps {
  renewTimer: () => void;
  backToInquire: () => void;
  onClose: () => void;
  artworkID: string;
  userId: number | null;
}

const TimerOverModal: React.FC<TimerOverModalProps> = ({
  renewTimer,
  backToInquire,
  onClose,
  artworkID,
  userId,
}) => {
  const handleContinuePurchase = async () => {
    try {
      const response = await axios.get(`/api/artworks/${artworkID}`);
      if (response.data.status === 'Available') {
        await updateArtworkStatus(artworkID, 'Pending Sale', userId); // Updated function call
        renewTimer();
        onClose();
      } else if (response.data.status === 'Pending Sale' && userId === response.data.userId) {
        renewTimer();
        onClose();
      } else {
        alert('Artwork is either sold or pending sale to another user.');
      }
    } catch (error) {
      console.error('Error checking artwork status:', error);
    }
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
        <button onClick={handleContinuePurchase} className={buttonStyles.buttonLarge}>Continue Purchase</button>
        <button onClick={backToInquire} className={buttonStyles.buttonLarge}>Back to Inquire</button>
      </DialogActions>
    </Dialog>
  );
};

export default TimerOverModal;
