// my-gallery/src/utils/favoritesService.ts

import axios from 'axios';
import { FavoriteItem } from '../screens/Favorites';

const baseURL = '/api';  // You can adjust this as needed based on your actual API baseURL

// Fetch favorite items
export const fetchFavorites = async (userId: string): Promise<FavoriteItem[]> => {
  try {
    const response = await axios.get(`${baseURL}/favorites/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite items:', error);
    throw error;
  }
};

// Update like status
export const updateLikeStatus = async (userId: string, photoId: string, diptychIdCode: string, isLiked: boolean) => {
  try {
    await axios.put(`${baseURL}/likes/${photoId}/${diptychIdCode}`, {
      userId,
      isLiked
    });
  } catch (error) {
    console.error('Error updating like status:', error);
    throw error;
  }
};

// Save notes
export const saveNotes = async (userId: string, photoId: string, diptychIdCode: string, notes: string) => {
  try {
    await axios.put(`${baseURL}/likes/${photoId}/${diptychIdCode}`, {
      userId,
      notes
    });
  } catch (error) {
    console.error('Error saving notes:', error);
    throw error;
  }
};

export {}