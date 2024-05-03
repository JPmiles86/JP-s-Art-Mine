// my-gallery/src/screens/PurchaseArtworkDetails.tsx

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Box, useTheme, useMediaQuery, Typography } from '@mui/material';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import useStore from '../utils/store';
import DownloadButton from '../components/layout/DownloadButton'; 
import FullScreenButtonFavs from '../components/layout/FullScreenButtonFavs';
import FullScreenViewCarousel from '../components/layout/FullScreenViewCarousel';
import buttonStyles from './ButtonStyles.module.css';


interface PurchaseArtworkDetailsProps {
    artworkID?: string;
    photoID?: string;
    diptychId?: number;
  }

interface Artwork {
    id: number;
    artworkID: string;
    status: string;
    photoRefId: number;
    diptychId: number;
    edition: string;
    sizeCategoryId: number;
    printSizeId: number;
    pricingId: number;
  }

const PurchaseArtworkDetails: React.FC = () => {
  const { artworkID, photoID } = useParams<{ artworkID: string, photoID: string }>();
  // const [PurchaseArtworkDetails, setPurchaseArtworkDetails] = useState(null);
  const [artworkDetails, setArtworkDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [carouselSelectedDiptychIdCode, setCarouselSelectedDiptychIdCode] = useState('');
  const [photo, setPhoto] = useState<any>(null);
  const [diptychId, setDiptychId] = useState<number | null>(null);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [diptych, setDiptych] = useState<any>(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const response = await axios.get(`/api/artworks/${artworkID}/details`);
        setArtworkDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
        setIsLoading(false);
      }
    };
  
    if (artworkID) {
      fetchArtworkDetails();
    }
  }, [artworkID]);
 
  useEffect(() => {
    if (artworkDetails && photo) {
      const defaultFrameType = useStore.getState().frames[useStore.getState().FrameId - 1]?.frameType;
      const defaultDiptychIdCode = `E_${photo.aspectRatio.replace(':', 'x')}_CD_P_${defaultFrameType.charAt(0).toUpperCase()}`;
      setCarouselSelectedDiptychIdCode(defaultDiptychIdCode);
    }
  }, [artworkDetails, photo]);

   // Function to handle canvas ready from Diptych component
   const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
    console.log("handleCanvasReady called", { canvasRef, diptychIdCode });
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
    const fetchData = async () => {
      try {
        const photoResponse = await axios.get(`/api/photos/${photoID}`);
        setPhoto(photoResponse.data);
  
        const artworkResponse = await axios.get(`/api/artworks/${artworkID}`);
        setArtwork(artworkResponse.data);
        setDiptychId(artworkResponse.data.diptychId);
  
        const diptychResponse = await axios.get(`/api/diptychs/${artworkResponse.data.diptychId}`);
        setDiptych(diptychResponse.data);
  
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [photoID, artworkID]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoResponse = await axios.get(`/api/photos/${photoID}`);
        setPhoto(photoResponse.data);
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };
  
    if (photoID && artworkID) {
      fetchPhoto();
    }
  }, [photoID, artworkID]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!artworkDetails) {
    return <Typography>Artwork details not found.</Typography>;
  }

  const edition = artworkDetails.edition === 'CP' ? "Collector's Print - 1/1" : "Artist's Print - 1/1";


  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
      {/* Render DiptychCarousel or DiptychCarouselDynamic based on diptychId */}
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
      {photo && photo.imagePath && (
        <Box display="flex" justifyContent="center" mt={2}>
          {renderDownloadButton(photoID, carouselSelectedDiptychIdCode)}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}>
            {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
          </button>
          <FullScreenButtonFavs onClick={handleOpenFullScreen} />
        </Box>
      )}

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
    </div>
  );
};

export default PurchaseArtworkDetails;