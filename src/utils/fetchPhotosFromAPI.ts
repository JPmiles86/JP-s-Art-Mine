// my-gallery/src/utils/fetchPhotosFromAPI.ts

import { Photograph } from './store';

const BASE_URL = "http://localhost:4000/api"; // Adjust as needed

export async function fetchPhotosFromAPI(filterType: string, filterValue: string, userRole: string | null): Promise<Photograph[]> {
  let endpoint = "";
  switch (filterType) {
    case 'date':
      endpoint = `${BASE_URL}/photos/date/${filterValue}?userRole=${userRole}`;
      break;
    case 'number':
      endpoint = `${BASE_URL}/photos/number/${filterValue}?userRole=${userRole}`;
      break;
    case 'series':
      endpoint = `${BASE_URL}/photos/series/${filterValue}?userRole=${userRole}`;
      break;
    default:
      throw new Error('Invalid filter type');
  }

  console.log('User Role in fetchPhotosFromAPI:', userRole); // Add this line

  try {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    console.log('JWT token:', token); // Add this line

    const response = await fetch(`${endpoint}?userRole=${userRole || ''}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });

    console.log('Response:', response); // Add this line

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const photosData = await response.json();

     // Map the received data to the Photograph interface
     const photos: Photograph[] = photosData.map((photo: any) => ({
      ...photo,
      isHidden: photo.isHidden || false, // Ensure isHidden is always a boolean
    }));

    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

export async function fetchHiddenPhotos(): Promise<Photograph[]> {
  const endpoint = `${BASE_URL}/photos/hidden`;
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage

  try {
    const response = await fetch(`${endpoint}?userRole=Admin`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const hiddenPhotos = await response.json();
    return hiddenPhotos;
  } catch (error) {
    console.error('Error fetching hidden photos:', error);
    return [];
  }
}