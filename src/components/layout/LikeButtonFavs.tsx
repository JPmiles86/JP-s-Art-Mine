// my-gallery/src/components/layout/LikeButtonFavs.tsx

import React, { useState, useEffect } from 'react';
import useStore from '../../utils/store';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { useAuth } from '../../contexts/AuthContext';

interface LikeButtonFavsProps {
  photoId: string;
  diptychIdCode: string;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  onLikeButtonClick: () => void;
  onUnlikeConfirmed: () => void;
}

const LikeButtonFavs: React.FC<LikeButtonFavsProps> = ({ photoId, diptychIdCode, setIsAuthModalOpen, onLikeButtonClick, onUnlikeConfirmed }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(`/api/likes/${useStore.getState().userId}/${photoId}/${diptychIdCode}`);
        const data = await response.json();
        setIsLiked(data.isLiked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    if (useStore.getState().userId) {
      checkLikeStatus();
    } else {
      setIsLiked(false); // Reset isLiked state when user is not logged in
    }
  }, [photoId, diptychIdCode, useStore.getState().userId]);

  useEffect(() => {
    // Reset isLiked state when user logs out
    if (!isAuthenticated) {
      setIsLiked(false);
    }
  }, [isAuthenticated]);

  const handleLike = () => {
    if (isLiked) {
      onLikeButtonClick();
    } else {
      // Make an API call to like the photo/diptychIdCode combination
      fetch(`/api/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: useStore.getState().userId, photoId, diptychIdCode, isLiked: true }),
      })
        .then(() => {
          setIsLiked(true);
        })
        .catch((error) => {
          console.error('Error liking:', error);
        });
    }
  };

  const handleUnlikeConfirmed = () => {
    // Make an API call to unlike the photo/diptychIdCode combination
    fetch(`/api/likes/${photoId}/${diptychIdCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: useStore.getState().userId, isLiked: false }),
    })
      .then(() => {
        setIsLiked(false);
        onUnlikeConfirmed();
      })
      .catch((error) => {
        console.error('Error unliking:', error);
      });
  };

  return (
    <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={handleLike}>
      {isLiked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButtonFavs;