// my-gallery/src/utils/PurchaseTimer.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PurchaseTimerProps {
  artworkID: string;
  userId: number | null;
}

const PurchaseTimer: React.FC<PurchaseTimerProps> = ({ artworkID, userId }) => {
  const [remainingTime, setRemainingTime] = useState(1200); // 20 minutes in seconds
  const [toastId, setToastId] = useState<React.ReactText | null>(null);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    startCountdownTimer();
  }, []);

  const startCountdownTimer = async () => {
    try {
      console.log('Starting countdown timer');
  
      // Create a new entry in the ArtworkPending table
      const response = await axios.post('/api/artworkPending', {
        artworkId: artworkID,
        userId: userId || null,
      });
  
      console.log('ArtworkPending entry created:', response.data);
  
      // Update the Artwork table's status to 'Pending Sale'
      if (artworkID) {
        await axios.put(`/api/artworks/${artworkID}`, { status: 'Pending Sale' });
        console.log('Artwork status updated to Pending Sale');
      }
  
      // Start the timer
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setTimerExpired(true);
            handleTimerExpiration();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      // Display the toast notification with the timer
      const toastId = toast.info(
        <div>
          Time remaining to complete the purchase: {formatTime(remainingTime)}
          <button onClick={() => handleRenewTimer()}>Renew Timer</button>
          <button onClick={() => handleCancelPurchase()}>Cancel Purchase</button>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          position: 'top-center',
          onClose: () => setToastId(null),
        }
      );
      setToastId(toastId);
  
      return () => {
        clearInterval(timer);
      };
    } catch (error) {
      console.error('Error starting countdown timer:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRenewTimer = async () => {
    try {
      // Update the pendingUntil timestamp in the ArtworkPending table
      await axios.put('/api/artworkPending', {
        artworkId: artworkID,
        userId: userId || null,
        pendingUntil: new Date(Date.now() + 20 * 60 * 1000), // Add 20 minutes to the current time
      });

      // Reset the timer
      setRemainingTime(1200);
      setTimerExpired(false);

      // Close the current toast and open a new one with the renewed timer
      if (toastId) {
        toast.dismiss(toastId);
      }
      const newToastId = toast.info(
        <div>
          Time remaining to complete the purchase: {formatTime(1200)}
          <button onClick={() => handleRenewTimer()}>Renew Timer</button>
          <button onClick={() => handleCancelPurchase()}>Cancel Purchase</button>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          position: 'top-center',
          onClose: () => setToastId(null),
        }
      );
      setToastId(newToastId);
    } catch (error) {
      console.error('Error renewing timer:', error);
    }
  };

  const handleCancelPurchase = async () => {
    try {
      // Remove the entry from the ArtworkPending table
      await axios.delete('/api/artworkPending', {
        data: {
          artworkId: artworkID,
          userId: userId || null,
        },
      });

      // Update the Artwork table's status back to 'Available'
      await axios.put(`/api/artworks/${artworkID}`, { status: 'Available' });

      // Close the toast and navigate back to the inquire page
      if (toastId) {
        toast.dismiss(toastId);
      }
      // TODO: Navigate back to inquire page
    } catch (error) {
      console.error('Error canceling purchase:', error);
    }
  };

  const handleTimerExpiration = async () => {
    try {
      // Remove the entry from the ArtworkPending table
      await axios.delete('/api/artworkPending', {
        data: {
          artworkId: artworkID,
          userId: userId || null,
        },
      });

      // Update the Artwork table's status back to 'Available'
      await axios.put(`/api/artworks/${artworkID}`, { status: 'Available' });

      // Close the toast and display the expiration modal
      if (toastId) {
        toast.dismiss(toastId);
      }
      // TODO: Open the expiration modal
    } catch (error) {
      console.error('Error handling timer expiration:', error);
    }
  };

  return <ToastContainer />;
};

export default PurchaseTimer;