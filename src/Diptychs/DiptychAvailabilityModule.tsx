// my-gallery/src/Diptychs/DiptychAvailabilityModule.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import buttonStyles from '../screens/ButtonStyles.module.css';
import styles from './DiptychAvailabilityStyles.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface ArtworkDetail {
  artworkId: string;
  edition: string;
  photoId: string;
  sizeName: string;
  price: number;
  printSizeInInches: string;
  printSizeInCm: string;
  status: string;
  photoDate: string;
  photoNumber: string;
  shutterSpeed: string;
  seriesName: string;
  diptychName: string;
}

interface DiptychAvailabilityModuleProps {
  photoId: string;
  diptychId: number; // Ensure this matches your backend API requirements
}

const DiptychAvailabilityModule: React.FC<DiptychAvailabilityModuleProps> = ({ photoId, diptychId }) => {
  const [artworkDetails, setArtworkDetails] = useState<ArtworkDetail[]>([]);
  const [showInInches, setShowInInches] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentFilter = location.pathname.split('/')[1];

  const handleBuyNowClick = (artworkId: string) => {
    navigate(`/${currentFilter}/${photoId}/purchase/${artworkId}`);
  };

  const handleRequestAccessClick = (cpArtworkId: string) => {
    const apArtworkId = cpArtworkId.replace('-CP', '-AP');
    navigate(`/${currentFilter}/${photoId}/request/${apArtworkId}`);
  };

  const handleSizeToggle = () => {
    setShowInInches((prev) => !prev);
  };

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/artworks/details/${photoId}/${diptychId}`);
        console.log('Fetched artwork details:', response.data);
        setArtworkDetails(response.data);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      }
    };

    console.log('Fetching artwork details for photoId:', photoId, 'and diptychId:', diptychId);
    fetchArtworkDetails();
  }, [photoId, diptychId]);

  const cpArtworks = artworkDetails.filter(artwork => artwork.edition === 'CP');
  const apArtworks = artworkDetails.filter(artwork => artwork.edition === 'AP');

    // Define the desired size order
  const sizeOrder = ['Small', 'Medium', 'Large', 'X-Large'];

  // Sort the cpArtworks array using the custom sorting function
  const sortedCpArtworks = [...cpArtworks].sort((a, b) => {
    const indexA = sizeOrder.indexOf(a.sizeName);
    const indexB = sizeOrder.indexOf(b.sizeName);
    return indexA - indexB;
  });
  
  const findApStatus = (cpArtworkId: string) => {
    const apArtwork = apArtworks.find(ap => ap.artworkId.replace('-CP', '-AP') === cpArtworkId.replace('-CP', '-AP'));
    return apArtwork?.status || 'Unavailable';
  };

  return (
    <Box>
      <Typography variant="h6" style={{ marginTop: '10px', textAlign: 'center' }}>
        <strong>Photograph ID:</strong> {photoId}
      </Typography>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        <strong>Diptych Variation:</strong> {artworkDetails[0]?.diptychName || 'Unknown'}
      </Typography>
      <table style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th className={styles.tableCell}>Size</th>
            <th className={styles.tableCell}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography><strong>Print Size</strong></Typography>
              <Typography><strong>{showInInches ? '(inches)' : '(cm)'}</strong></Typography>
            </Box>
            </th>
            <th className={styles.tableCell}>CP Price (USD)</th>
            <th className={styles.tableCell}>Artwork Availability (CP)</th>
            <th className={styles.tableCell}>Artwork Availability (AP)</th>
          </tr>
        </thead>
        <tbody>
          {sortedCpArtworks.map((cpArtwork) => (
            <tr key={cpArtwork.artworkId}>
              <td className={styles.tableCellContents}>{cpArtwork.sizeName}</td>
              <td className={styles.tableCellContents}>
                {showInInches ? cpArtwork.printSizeInInches : cpArtwork.printSizeInCm}
              </td>
              <td className={styles.tableCellContents}>${cpArtwork.price.toFixed(0)}</td>
              <td className={styles.tableCellContents}>
                {cpArtwork.status === 'Available' && (
                  <button className={`${buttonStyles.greenButton}`} onClick={() => handleBuyNowClick(cpArtwork.artworkId)}>
                    Buy Now
                  </button>
                )}
                {cpArtwork.status === 'Pending Sale' && (
                  <Typography style={{ fontWeight: 'bold', color: '#ff8c00' }}>Pending Sale</Typography>
                )}
                {cpArtwork.status === 'Sold' && (
                  <Typography style={{ fontWeight: 'bold', color: '#d60000' }}>Sold</Typography>
                )}
              </td>
              <td className={styles.tableCellContents}>
                {findApStatus(cpArtwork.artworkId) === 'Available' && (
                  <button className={buttonStyles.button} onClick={() => handleRequestAccessClick(cpArtwork.artworkId)}>
                    Request Access
                  </button>
                )}
                {findApStatus(cpArtwork.artworkId) !== 'Available' && (
                  <Typography style={{ fontWeight: 'bold', color: '#d60000' }}>Unavailable</Typography>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        <FormControlLabel
          control={<Switch checked={showInInches} onChange={handleSizeToggle} />}
          label={showInInches ? 'Print Size in Inches' : 'Print Size in Centimeters'}
        />
      </Box>
    </Box>
  );
};

export default DiptychAvailabilityModule;