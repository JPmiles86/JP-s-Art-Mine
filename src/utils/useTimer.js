// Location: my-gallery/src/utils/useTimer.js

import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { updateArtworkPendingEntry, updateArtworkStatus } from './artworkApi';

const useTimer = (artworkId, userId, initialTime = 1200) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const timerRef = useRef(null);

  const startCountdownTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  const initializeTimer = useCallback(async () => {
    try {
      const response = await axios.get(`/api/artworkPending/${artworkId}/${userId}`);
      if (response.data) {
        const pendingUntil = new Date(response.data.pendingUntil);
        const remainingTime = Math.floor((pendingUntil.getTime() - Date.now()) / 1000);
        setRemainingTime(remainingTime > 0 ? remainingTime : 0);
        startCountdownTimer();
      }
    } catch (error) {
      console.error('Error initializing timer:', error);
    }
  }, [artworkId, userId, startCountdownTimer]);

  useEffect(() => {
    initializeTimer();
  }, [initializeTimer]);

  const handleTimerExpiration = useCallback((userId) => {
    console.log('Timer expired, updating artwork status to Available');
    axios
      .put(`/api/artworks/${artworkId}`, { status: 'Available', userId })
      .then(() => {
        console.log('Artwork status reset to Available');
      })
      .catch((error) => {
        console.error('Failed to reset artwork status:', error);
      });
  }, [artworkId]);

  const renewTimer = useCallback(async () => {
    setRemainingTime(initialTime);
    startCountdownTimer();
    try {
      await updateArtworkPendingEntry(artworkId, userId);
      await updateArtworkStatus(artworkId, userId);
    } catch (error) {
      console.error('Error updating ArtworkPending entry or artwork status:', error);
    }
  }, [initialTime, startCountdownTimer, artworkId, userId]);
  

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimerExpiration(userId);
    }
  }, [remainingTime, handleTimerExpiration, userId]);

  return { remainingTime, setRemainingTime, startCountdownTimer, renewTimer };
};

export default useTimer;