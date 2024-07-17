// my-gallery/src/utils/artworkApi.ts
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

// This function now allows the status to be dynamically set
export const updateArtworkStatus = async (artworkID: string, status: string, userId: number | null) => {
  try {
    const response = await axios.put(`/api/artworks/${artworkID}`, { status, userId });
    if (response.status === 200) {
      console.log(`Artwork status updated to ${status}`);
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