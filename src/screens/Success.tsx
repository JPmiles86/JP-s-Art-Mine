//my-gallery/src/screens/Success.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import PurchaseArtworkCarousel from './PurchaseArtworkCarousel';
import PurchaseArtworkDetails from './PurchaseArtworkDetails'; // Import the component
import buttonStyles from './ButtonStyles.module.css';
import axios from 'axios';

interface ArtworkDetails {
  artworkId: string;
  photoId?: string;
  diptychId?: number;
  diptychName?: string;
  edition?: string;
  sizeName?: string;
  printSizeInInches?: string;
  printSizeInCm?: string;
  price?: number; // Corrected from salePrice to price to match the API response
  currency?: string;
}

const Success: React.FC = () => {
  const { filter, photoID, artworkID } = useParams<{ filter: string; photoID: string; artworkID: string }>();
  const navigate = useNavigate();
  const [artworkDetails, setArtworkDetails] = useState<ArtworkDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTokenAndAuthenticate = async () => {
      try {
        const token = localStorage.getItem('purchaseToken');
        console.log('Token:', token);

        if (!token) {
          navigate('/');
          return;
        }

        const authResponse = await axios.get('/api/purchase-success', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Authentication Response:', authResponse.data);

        // Ensure artworkID is available from the URL parameters
        if (artworkID) {
          fetchArtworkDetails(artworkID);
        } else {
          console.error('Artwork ID is missing in URL parameters');
          setIsLoading(false);
          navigate('/');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setIsLoading(false);
        navigate('/');
      }
    };

    const fetchArtworkDetails = async (artworkID: string) => {
      try {
        const response = await axios.get(`/api/artworks/${artworkID}/details`);
        console.log('Artwork Details Response:', response.data);

        // Set the artwork details from the response
        setArtworkDetails({
          artworkId: response.data.artworkId,
          photoId: response.data.photoId,
          diptychId: response.data.diptychId,
          diptychName: response.data.diptychName,
          edition: response.data.edition,
          sizeName: response.data.sizeName,
          printSizeInInches: response.data.printSizeInInches,
          printSizeInCm: response.data.printSizeInCm,
          price: response.data.price,
          currency: response.data.currency,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
        setIsLoading(false);
      }
    };

    fetchTokenAndAuthenticate();
  }, [navigate, artworkID]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!artworkDetails) {
    return <Typography>Artwork details not found.</Typography>;
  }

  const handleBackToExhibition = () => {
    navigate(`/${filter}/${photoID}`);
  };

  const handleBackToImageGrid = () => {
    navigate(`/${filter}`);
  };

  const edition = artworkDetails.edition === 'CP' ? "Collector's Print - 1/1" : "Artist's Print - 1/1";

  return (
    <Box>
      <Typography variant="h4" align="center" mt={8}>
        Congratulations on Your Purchase!
      </Typography>
      <Typography style={{ justifyContent: 'center', textAlign: 'center', marginTop: '20px' }}>
        Thank you for purchasing: <br />
        <strong>{artworkDetails.artworkId}</strong>
      </Typography>
      <Typography style={{ justifyContent: 'center', textAlign: 'center', marginTop: '20px' }}>
        Your purchase helps support Charity: Water. 50% of the profits from this sale will be donated to provide clean water to those in need.
      </Typography>
      <Typography style={{ justifyContent: 'center', textAlign: 'center', marginTop: '20px' }}>
        As the artist, I am deeply grateful for your support. This means a lot to me, and I hope you enjoy your new artwork.
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button className={buttonStyles.navButton} style={{ margin: '10px 20px' }} onClick={handleBackToExhibition}>
          Back to Exhibition Space
        </button>
        <button className={buttonStyles.navButton} style={{ margin: '10px 20px' }} onClick={handleBackToImageGrid}>
          Back to Image Grid
        </button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box position="relative">
            <PurchaseArtworkCarousel />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box position="sticky" top={0}>
            {artworkDetails && (
              <PurchaseArtworkDetails artworkDetails={artworkDetails} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Success;
