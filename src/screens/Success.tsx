import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import PurchaseArtworkCarousel from './PurchaseArtworkCarousel';
import PurchaseArtworkDetails from './PurchaseArtworkDetails';
import SalesDetailsModule from './SalesDetailsModule';
import axios from 'axios';

const Success: React.FC = () => {
  const { filter, photoID, artworkID } = useParams<{ filter: string; photoID: string; artworkID: string }>();
  const navigate = useNavigate();
  const [artworkDetails, setArtworkDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [saleDetails, setSaleDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAndAuthenticate = async () => {
      try {
        const token = localStorage.getItem('purchaseToken');
        console.log('Token:', token);

        if (!token) {
          setError('No purchase token found. Please complete a purchase first.');
          setIsLoading(false);
          return;
        }

        const authResponse = await axios.get('/api/purchase-success', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authResponse.data && authResponse.data.sale) {
          setSaleDetails(authResponse.data.sale);
          console.log('Fetched Sale Details:', authResponse.data.sale);

        } else {
          setError('Sale details not found in the response.');
        }

        if (artworkID) {
          fetchArtworkDetails(artworkID);
        } else {
          setError('Artwork ID is missing in URL parameters');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setError('An error occurred while fetching sale details.');
        setIsLoading(false);
      }
    };

    const fetchArtworkDetails = async (artworkID: string) => {
      try {
        const response = await axios.get(`/api/artworks/${artworkID}/details`);
        console.log('Artwork Details Response:', response.data);

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
        setError('An error occurred while fetching artwork details.');
        setIsLoading(false);
      }
    };

    fetchTokenAndAuthenticate();
  }, [navigate, artworkID]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
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
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box style={{ marginTop: '30px' }} position="relative">
            <PurchaseArtworkCarousel />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box position="sticky" top={0}>
            {artworkDetails && (
              <PurchaseArtworkDetails artworkDetails={artworkDetails} />
            )}
            {saleDetails ? (
              <SalesDetailsModule saleDetails={saleDetails} />
            ) : (
              <Typography>Sale details are not available.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Success;