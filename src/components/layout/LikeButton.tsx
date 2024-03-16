// my-gallery/src/components/layout/LikeButton.tsx

import React, { useState, useEffect } from 'react';
import useStore from '../../utils/store';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface LikeButtonProps {
  photoId: string;
  diptychIdCode: string;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ photoId, diptychIdCode, setIsAuthModalOpen }) => {
  const [isLiked, setIsLiked] = useState(false);

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
    }
  }, [photoId, diptychIdCode, useStore.getState().userId]);

  const handleLike = async () => {
    if (!useStore.getState().userId) {
      setIsAuthModalOpen(true);
      return;
    }
  
    try {
      if (isLiked) {
        // Make an API call to unlike the photo/diptychIdCode combination
        await fetch(`/api/likes/${photoId}/${diptychIdCode}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: useStore.getState().userId, isLiked: false }),
        });
        setIsLiked(false);
      } else {
        // Make an API call to like the photo/diptychIdCode combination
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
    <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={handleLike}>
        {isLiked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;