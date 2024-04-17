// my-gallery/src/utils/artworkApi.ts

import axios from 'axios';

export const updateArtworkStatus = async (artworkID: string, userId: number | null) => {
  try {
    const response = await axios.put(`/api/artworks/${artworkID}`, { status: 'Pending Sale', userId });
    if (response.status === 200) {
      console.log('Artwork status updated to Pending Sale');
    } else {
      console.error('Failed to update artwork status. Received:', response.data);
    }
  } catch (error) {
    console.error('Error updating artwork status:', error);
  }
};

export const updateArtworkPendingEntry = async (artworkId: number, userId: number | null) => {
  try {
    const pendingUntil = new Date(new Date().getTime() + 1200 * 1000);
    const response = await axios.put(`/api/artworkPending`, {
      artworkId,
      userId,
      pendingUntil: pendingUntil.toISOString(),
    });
    console.log('ArtworkPending entry updated:', response.data);
  } catch (error) {
    console.error('Error updating ArtworkPending entry:', error);
  }
};