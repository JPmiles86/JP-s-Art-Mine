import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Link } from '@mui/material';
import useStore from '../utils/store';
import buttonStyles from './ButtonStyles.module.css';
import TimerOverModal from '../components/modals/TimerOverModal';
import useTimer from '../utils/useTimer';
import TimerDisplay from '../utils/TimerDisplay';
import { updateArtworkStatus, updateArtworkPendingEntry } from '../utils/artworkApi';
import AuthModal from '../components/modals/AuthModal';

interface Artwork {
  id: number;
  artworkID: string;
  status: string;
}

const Purchase = () => {
  const { artworkID, filter, photoID } = useParams<{ artworkID: string; filter: string; photoID: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const userId = useStore((state) => state.userId);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAnonymous = useStore((state) => state.isAnonymous);
  const [pendingEntryExists, setPendingEntryExists] = useState(false);

  const { remainingTime, startCountdownTimer, renewTimer } = useTimer(artwork?.id || 0, userId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAndInitialize = async () => {
      try {
        const response = await axios.get(`/api/artworks/${artworkID}`);
        setArtwork(response.data);

        if (response.data.status === 'Available') {
          if (userId) {
            await updateArtworkStatus(response.data.artworkID, userId);
            await updateArtworkPendingEntry(response.data.id, userId);
            startCountdownTimer();
          } else {
            await updateArtworkStatus(response.data.artworkID, null);
            await updateArtworkPendingEntry(response.data.id, null);
            startCountdownTimer();
            setTimeout(() => {
              setShowAuthModal(true);
            }, 500);
          }
        } else if (response.data.status === 'Pending Sale') {
          if (userId) {
            const pendingEntryResponse = await axios.get(`/api/artworkPending/${response.data.id}/${userId}`);
            if (pendingEntryResponse.data) {
              startCountdownTimer();
            }
          }
        }
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndInitialize();
  }, [artworkID, userId, startCountdownTimer]);

  useEffect(() => {
    if (userId) {
      updateArtworkPendingEntry(artwork?.id || 0, userId);
    }
  }, [userId, artwork]);

  const toggleTimerDisplay = () => {
    setMinimized(!minimized);
  };

  const handleBackToInquire = () => {
    navigate(`/${filter}/${photoID}/inquire`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (remainingTime === 0) {
      setShowModal(true);
    }
  }, [remainingTime]);

  useEffect(() => {
    const checkPendingEntry = async () => {
      if (artwork?.status === 'Pending Sale' && userId && artwork.id) {
        try {
          const pendingEntryResponse = await axios.get(`/api/artworkPending/${artwork.id}/${userId}`);
          setPendingEntryExists(!!pendingEntryResponse.data);
        } catch (error) {
          console.error('Error fetching pending entry:', error);
        }
      }
    };
  
    checkPendingEntry();
  }, [artwork, userId]);  

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (artwork?.status === 'Pending Sale' && userId && artwork.id && !pendingEntryExists) {
    return (
      <div>
        <Typography>This artwork is currently pending sale for another user.</Typography>
        <Link href={`/${filter}/${photoID}/inquire`}>Choose a different variation or size</Link>
      </div>
    );
  }

  if (artwork?.status === 'Sold') {
    return (
      <div>
        <Typography>This artwork has already been sold.</Typography>
        <Link href={`/${filter}/${photoID}/inquire`}>Choose a different variation or size</Link>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4">Purchase Page</Typography>
      <Typography>
        {artwork?.artworkID} - {artwork?.status}
      </Typography>
      <button className={buttonStyles.button} onClick={handleBackToInquire}>
        Back to Inquire
      </button>
      <TimerDisplay
        remainingTime={remainingTime}
        minimized={minimized}
        toggleTimerDisplay={toggleTimerDisplay}
        renewTimer={renewTimer}
      />
      {showModal && <TimerOverModal renewTimer={renewTimer} backToInquire={handleBackToInquire} onClose={handleCloseModal} artworkID={artworkID ?? ''} userId={userId} />}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        showAnonymousOption={false}
        isLikeTriggered={false}
        isAnonymousUser={isAnonymous}
      />
    </div>
  );
};

export default Purchase;