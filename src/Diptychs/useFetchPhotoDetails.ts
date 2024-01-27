// my-gallery/src/Diptychs/useFetchPhotoDetails.js

import { useCallback } from 'react';

const useFetchPhotoDetails = () => {
  const fetchPhotoDetails = useCallback(async (photoId: string) => {
    console.log('fetchPhotoDetails triggered');
    try {
      const response = await fetch(`/api/photos/${photoId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching photo details:', error);
      return null;
    }
  }, []);

  return fetchPhotoDetails;
};

export default useFetchPhotoDetails;