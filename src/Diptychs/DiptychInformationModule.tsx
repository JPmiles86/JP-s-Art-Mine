// my-gallery/src/Diptychs/DiptychInformationModule.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import buttonStyles from '../screens/ButtonStyles.module.css';
import styles from './DiptychInformationStyles.module.css';
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

interface DiptychInformationModuleProps {
  photoId: string;
  diptychId: number; // Ensure this matches your backend API requirements
}

const DiptychInformationModule: React.FC<DiptychInformationModuleProps> = ({ photoId, diptychId }) => {
  const [artworkDetails, setArtworkDetails] = useState<ArtworkDetail[]>([]);
  const [showInInches, setShowInInches] = useState(true); // New state for toggling size display
  const navigate = useNavigate();
  const location = useLocation();
  const currentFilter = location.pathname.split('/')[1];

  const handleBuyNowClick = (artworkId:string) => {
    navigate(`/${currentFilter}/${photoId}/purchase/${artworkId}`);
  };

  const handleRequestAccessClick = (artworkId: string) => {
    navigate(`/${currentFilter}/${photoId}/request/${artworkId}`);
  };


   // Handler to toggle between inches and centimeters
   const handleSizeToggle = () => {
    setShowInInches((prev) => !prev);
  };

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        // Adjust the URL to match your API route
        const response = await axios.get(`http://localhost:4000/api/artworks/details/${photoId}/${diptychId}`);
        console.log('Fetched artwork details:',response.data);
        setArtworkDetails(response.data);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      }
    };

    fetchArtworkDetails();
  }, [photoId, diptychId]);

  // Separate CP and AP editions into different arrays
const cpArtworks = artworkDetails.filter(artwork => artwork.edition === 'CP');
const apArtworks = artworkDetails.filter(artwork => artwork.edition === 'AP');

// A function to find the corresponding AP artwork status based on a CP artwork
const findApStatus = (cpArtworkId: string) => {
  const apArtwork = apArtworks.find(ap => ap.artworkId.replace('-CP', '-AP') === cpArtworkId.replace('-CP', '-AP'));
  return apArtwork?.status || 'Unavailable'; // default status if not found
};

  return (
    <Box>
      <Typography variant="h6" style={{ marginTop: '10px', textAlign: 'center' }}>
      <strong>Photograph ID:</strong> {photoId}</Typography>
      {/* You will dynamically fetch and map diptychName from diptychId */}
      <Typography variant="h6" style={{ textAlign: 'center' }}>
      <strong>Diptych Variation:</strong> {artworkDetails[0]?.diptychName || 'Unknown'}</Typography>
      <table style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th className={styles.tableCell}>Size</th>
            <th className={styles.tableCell}>Print Size</th>
            <th className={styles.tableCell}>CP Price</th>
            <th className={styles.tableCell}>Artwork Availability (CP)</th>
            <th className={styles.tableCell}>Artwork Availability (AP)</th>
          </tr>
        </thead>
        <tbody>
          {cpArtworks.map((cpArtwork) => (
            <tr key={cpArtwork.artworkId}>
              <td className={styles.tableCellContents}>{cpArtwork.sizeName}</td>
              <td className={styles.tableCellContents}>{showInInches ? cpArtwork.printSizeInInches : cpArtwork.printSizeInCm}</td>
              <td className={styles.tableCellContents}>${cpArtwork.price.toFixed(0)}</td> {/* the (0) indicated decimal places */}
              <td className={styles.tableCellContents}>
                {cpArtwork.status === 'Available' && (
                  <button
                    className={buttonStyles.button}
                    onClick={() => handleBuyNowClick(cpArtwork.artworkId)}
                  >
                    Buy Now
                  </button>                
                )}
                {cpArtwork.status === 'Pending Sale' && (
                  <button className={buttonStyles.button} disabled>
                    Pending
                  </button>
                )}
                {cpArtwork.status === 'Sold' && <Typography>Sold</Typography>}
              </td>
              <td className={styles.tableCellContents}>
                {findApStatus(cpArtwork.artworkId) === 'Available' && (
                  <button
                    className={buttonStyles.button}
                    onClick={() => handleRequestAccessClick(cpArtwork.artworkId)}
                  >
                    Request Access
                  </button>                
                )}                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Toggle switch for size display */}
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        <FormControlLabel
          control={<Switch checked={showInInches} onChange={handleSizeToggle} />}
          label={showInInches ? "Show Print Size in Inches" : "Show Print Size in Centimeters"}
        />
      </Box>
    </Box>
  );
};

export default DiptychInformationModule;