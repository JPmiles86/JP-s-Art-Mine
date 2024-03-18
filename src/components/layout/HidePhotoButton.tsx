// my-gallery/src/components/layout/HidePhotoButton.tsx

import React, { useState, useEffect } from 'react';
import useStore from '../../utils/store';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import axios from 'axios';

interface HidePhotoButtonProps {
  photoId: string;
}

const HidePhotoButton: React.FC<HidePhotoButtonProps> = ({ photoId }) => {
  const [isHidden, setIsHidden] = useState(false);
  const userId = useStore((state) => state.userId);
  const userRole = useStore((state) => state.userRole);

  useEffect(() => {
    const checkPhotoHiddenStatus = async () => {
      try {
        const response = await axios.get(`/api/photos/${photoId}/hidden-status`);
        setIsHidden(response.data.isHidden);
      } catch (error) {
        console.error('Error checking photo hidden status:', error);
      }
    };
  
    if (userRole === 'Admin') {
      checkPhotoHiddenStatus();
    }
  }, [photoId, userRole]);

  const handleHidePhoto = async () => {
    try {
      await axios.put(`/api/photos/${photoId}/hide`, { hide: !isHidden, userId, userRole }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsHidden(!isHidden);
    } catch (error) {
      console.error('Error hiding photo:', error);
    }
  };

  return userRole === 'Admin' ? (
    <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={handleHidePhoto}>
      {isHidden ? 'Unhide Photo' : 'Hide Photo'}
    </button>
  ) : null;
};

export default HidePhotoButton;