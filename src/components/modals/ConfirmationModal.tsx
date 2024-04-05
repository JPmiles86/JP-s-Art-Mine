// my-gallery/src/components/modals/ConfirmationModal.tsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ButtonStyles from '../../screens/ButtonStyles.module.css';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm }) => {
  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle style={{ textAlign: 'center', marginTop: '20px' }}>Remove from Favorites</DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>Are you sure you want to remove this artwork from your favorites?</Typography>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={onConfirm} color="primary" className={ButtonStyles.button}>
          Confirm
        </button>
        <button onClick={onClose} className={ButtonStyles.button}>
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;