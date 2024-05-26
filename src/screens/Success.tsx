// Success.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import DownloadButton from '../components/layout/DownloadButton';
import FullScreenViewCarousel from '../components/layout/FullScreenViewCarousel';
import buttonStyles from './ButtonStyles.module.css';
import axios from 'axios';

const Success: React.FC = () => {
  const { filter, photoID, artworkID } = useParams<{ filter: string; photoID: string; artworkID: string }>();
  const navigate = useNavigate();
  const [artworkDetails, setArtworkDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [carouselSelectedDiptychIdCode, setCarouselSelectedDiptychIdCode] = useState('');
  const [photo, setPhoto] = useState<any>(null);
  const [diptychId, setDiptychId] = useState<number | null>(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
    updateFabricCanvas(diptychIdCode, canvasRef);
  }, []);

  const updateFabricCanvas = (diptychIdCode: string, canvas: fabric.Canvas) => {
    setFabricCanvas(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(diptychIdCode, canvas);
      return newMap;
    });
  };

  const handleLayoutSpecsReady = useCallback((layoutSpecs: LayoutSpecs) => {
    setLayoutSpecsMap(prevMap => new Map(prevMap).set(layoutSpecs.DiptychIdCode, layoutSpecs));
  }, []);

  const handleCarouselDiptychIdCodeChange = (code: string) => {
    setCarouselSelectedDiptychIdCode(code);
  };

  const handleOpenFullScreen = () => {
    setFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setFullScreenOpen(false);
  };

  const renderDownloadButton = (photoId: string | undefined, diptychIdCode: string) => {
    if (!photoId) return null;

    const fabricCanvasRef = fabricCanvas.get(diptychIdCode);
    const layoutSpecs = layoutSpecsMap.get(diptychIdCode);

    if (fabricCanvasRef && layoutSpecs) {
      return (
        <DownloadButton
          photoId={photoId}
          DiptychIdCode={diptychIdCode}
          fabricCanvasRef={fabricCanvasRef}
          layoutSpecs={layoutSpecs}
          areShapesVisible={areShapesVisible}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const token = localStorage.getItem('purchaseToken');
  
        if (!token) {
          navigate('/');
          return;
        }
  
        const response = await axios.get('/api/purchase-success', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setArtworkDetails(response.data.order);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
        setIsLoading(false);
        navigate('/');
      }
    };
  
    fetchArtworkDetails();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoResponse = await axios.get(`/api/photos/${photoID}`);
        setPhoto(photoResponse.data);

        const artworkResponse = await axios.get(`/api/artworks/${artworkID}`);
        setDiptychId(artworkResponse.data.diptychId);

        const diptychResponse = await axios.get(`/api/diptychs/${artworkResponse.data.diptychId}`);
        setDiptychId(diptychResponse.data.diptychId);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [photoID, artworkID]);

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
        <strong>{artworkID}</strong>
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
            {photo && photo.imagePath ? (
              artworkDetails.diptychId === 1 ? (
                <DiptychCarouselDynamic
                  photoId={photoID ?? ''}
                  imagePath={photo.imagePath}
                  frameId={3}
                  diptychId={artworkDetails.diptychId}
                  aspectRatio={photo.aspectRatio}
                  areShapesVisible={areShapesVisible}
                  containerRef={containerRef}
                  handleCanvasReady={handleCanvasReady}
                  onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
                  handleLayoutSpecsReady={handleLayoutSpecsReady}
                />
              ) : (
                <DiptychCarousel
                  photoId={photoID ?? ''}
                  imagePath={photo.imagePath}
                  frameId={3}
                  diptychId={artworkDetails.diptychId}
                  aspectRatio={photo.aspectRatio}
                  areShapesVisible={areShapesVisible}
                  containerRef={containerRef}
                  handleCanvasReady={handleCanvasReady}
                  onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
                  handleLayoutSpecsReady={handleLayoutSpecsReady}
                />
              )
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box position="sticky" top={0}>
            <Box mt={4} style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
              <Typography variant="h5" gutterBottom>
                <strong>Artwork Details</strong>
              </Typography>
              <Box mt={2}>
                <Typography><strong>Artwork ID:</strong> {artworkDetails.artworkId}</Typography>
                <Typography><strong>Photo ID:</strong> {artworkDetails.photoId}</Typography>
                <Typography><strong>Diptych Variation:</strong> {artworkDetails.diptychName}</Typography>
                <Typography><strong>Edition:</strong> {edition}</Typography>
                <Typography><strong>Artist:</strong> J.P. Miles</Typography>
              </Box>
              <Box mt={2}>
                <Typography><strong>Artwork Size:</strong> {artworkDetails.sizeName}</Typography>
                <Typography><strong>Print Size (inches):</strong> {artworkDetails.printSizeInInches}</Typography>
                <Typography><strong>Print Size (cm):</strong> {artworkDetails.printSizeInCm}</Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="h6"><strong>Price: ${artworkDetails.price}</strong></Typography>
                <Typography><strong>Currency:</strong> {artworkDetails.currency}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {photo && photo.imagePath && (
        <FullScreenViewCarousel
          open={fullScreenOpen}
          onClose={handleCloseFullScreen}
          photoId={photoID ?? ''}
          imagePath={photo.imagePath}
          diptychId={diptychId!}
          aspectRatio={photo.aspectRatio}
          areShapesVisible={areShapesVisible}
          containerRef={fullScreenContainerRef}
          handleCanvasReady={handleCanvasReady}
          handleLayoutSpecsReady={handleLayoutSpecsReady}
          onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
        />
      )}
    </Box>
  );
};

export default Success;
