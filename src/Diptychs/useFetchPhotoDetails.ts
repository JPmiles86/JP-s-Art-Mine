// my-gallery/src/Diptychs/useFetchPhotoDetails.js

import { useCallback } from 'react';

// Define an interface that represents the expected shape of your photo details
interface PhotoDetails {
  photoID: string;
  seriesName: string;
  date: string;
  number: string;
  shutterSpeed: string;
  aperture: string;
  aspectRatio: string;
  createdAt: string;
  dateOriginal: string;
  dimensions: string;
  focalLength: string;
  imagePath: string;
  iso: string;
  lens: string;
  model: string;
  uniqueKey: string;
  updatedAt: string;
}

const useFetchPhotoDetails = () => {
  const fetchPhotoDetails = useCallback(async (photoId: string): Promise<PhotoDetails | null> => {
    console.log('fetchPhotoDetails triggered');
    try {
      const response = await fetch(`/api/photos/${photoId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PhotoDetails = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching photo details:', error);
      return null;
    }
  }, []);

  return fetchPhotoDetails;
};

export default useFetchPhotoDetails;