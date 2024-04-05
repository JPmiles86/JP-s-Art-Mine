// my-gallery/src/components/layout/LikeButton.tsx

import React, { useState, useEffect } from 'react';
import useStore from '../../utils/store';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { useAuth } from '../../contexts/AuthContext';

interface LikeButtonProps {
  photoId: string;
  diptychIdCode: string;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  onLikeButtonClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ photoId, diptychIdCode, setIsAuthModalOpen, onLikeButtonClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const userId = useStore.getState().userId;
        const response = await fetch(`/api/likes/${userId}/${photoId}/${diptychIdCode}`);
        const data = await response.json();
        setIsLiked(data.isLiked);
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    if (useStore.getState().userId) {
      fetchLikeStatus();
    }
  }, [photoId, diptychIdCode, useStore.getState().userId]);

  useEffect(() => {
    // Reset isLiked state when user logs out
    if (!isAuthenticated) {
      setIsLiked(false);
    }
  }, [isAuthenticated]);

  const handleLike = async () => {
    if (!useStore.getState().userId) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      if (isLiked) {
        await fetch(`/api/likes/${photoId}/${diptychIdCode}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: useStore.getState().userId, isLiked: false }),
        });
        setIsLiked(false);
        onLikeButtonClick();
      } else {
        await fetch(`/api/likes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: useStore.getState().userId, photoId, diptychIdCode, isLiked: true }),
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error liking/unliking:', error);
    }
  };

  return (
    <button
      className={`${buttonStyles.button} ${buttonStyles.small}`}
      onClick={handleLike}
    >
      {isLiked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;