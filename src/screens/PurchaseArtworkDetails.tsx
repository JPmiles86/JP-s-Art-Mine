// my-gallery/src/components/forms/PurchaseArtworkDetails.tsx

import React from 'react';
import { Typography, Box } from '@mui/material';
import buttonStyles from './ButtonStyles.module.css';
import { formatDimensions } from '../utils/formatDimensions';

interface PurchaseArtworkDetailsProps {
  artworkDetails: any;
}

const PurchaseArtworkDetails: React.FC<PurchaseArtworkDetailsProps> = React.memo(({ artworkDetails }) => {
  const edition = artworkDetails.edition === 'CP' ? "Collector's Print - 1/1" : "Artist's Print - 1/1";

  return (
    <Box mt={4} style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        <strong>Artwork Details</strong>
      </Typography>
      <Box mt={2}>
        <Typography><strong>Artist:</strong> J.P. Miles</Typography>
        <Typography><strong>Photo ID:</strong> {artworkDetails.photoId}</Typography>
        <Typography><strong>Artwork ID:</strong> {artworkDetails.artworkId}</Typography>
        <Typography><strong>Diptych Variation:</strong> {artworkDetails.diptychName}</Typography>
        <Typography><strong>Edition:</strong> {edition}</Typography>
      </Box>
      <Box mt={2}>
        <Typography><strong>Artwork Size:</strong> {artworkDetails.sizeName}</Typography>
        <Typography><strong>Print Size (inches):</strong> {formatDimensions(artworkDetails.printSizeInInches)}</Typography>
        <Typography><strong>Print Size (cm):</strong> {formatDimensions(artworkDetails.printSizeInCm)}</Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h6"><strong>Price: ${artworkDetails.price}</strong></Typography>
        <Typography><strong>Currency:</strong> {artworkDetails.currency}</Typography>
      </Box>
    </Box>
  );
});

export default PurchaseArtworkDetails;
