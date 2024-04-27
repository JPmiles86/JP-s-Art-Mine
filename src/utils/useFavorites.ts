// my-gallery/src/utils/useFavorites.ts

import { useState, useEffect } from 'react';
import { fetchFavorites, updateLikeStatus, saveNotes } from '../utils/favoritesService';
import { FavoriteItem } from '../screens/Favorites';

export function useFavorites(userId: string) {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (userId) {
        setLoading(true);
        try {
          const items = await fetchFavorites(userId);
          setFavoriteItems(items);
          const initialNotes: { [key: string]: string } = {};
          items.forEach(item => {
            initialNotes[`${item.photoId}-${item.diptychIdCode}`] = item.notes || '';
          });
          setFavoriteNotes(initialNotes);
        } catch (error) {
          console.error('Failed to load favorites:', error);
          setFavoriteItems([]);
          setFavoriteNotes({});
        } finally {
          setLoading(false);
        }
      }
    };

    loadFavorites();
  }, [userId]);

  const unlikeFavorite = async (photoId: string, diptychIdCode: string) => {
    if (userId) {
      try {
        await updateLikeStatus(userId, photoId, diptychIdCode, false);
        setFavoriteItems(prevItems => prevItems.filter(item => item.photoId !== photoId || item.diptychIdCode !== diptychIdCode));
      } catch (error) {
        console.error('Error unliking:', error);
      }
    }
  };

  const saveFavoriteNotes = async (photoId: string, diptychIdCode: string, notes: string) => {
    if (userId) {
      try {
        await saveNotes(userId, photoId, diptychIdCode, notes);
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    }
  };

  return {
    favoriteItems,
    favoriteNotes,
    loading,
    unlikeFavorite,
    saveFavoriteNotes,
  };
}
