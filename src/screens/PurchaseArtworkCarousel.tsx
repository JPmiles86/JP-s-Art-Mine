//my-gallery/src/screens/PurchaseArtworkCarousel.tsx

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic'; // Import DiptychCarouselDynamic
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import useStore from '../utils/store';
import DownloadButton from '../components/layout/DownloadButton';
import FullScreenButtonFavs from '../components/layout/FullScreenButtonFavs';
import FullScreenViewCarousel from '../components/layout/FullScreenViewCarousel';
import buttonStyles from './ButtonStyles.module.css';

const PurchaseArtworkCarousel: React.FC = React.memo(() => {
  const { artworkID, photoID } = useParams<{ artworkID: string; photoID: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [carouselSelectedDiptychIdCode, setCarouselSelectedDiptychIdCode] = useState('');
  const [photo, setPhoto] = useState<any>(null);
  const [diptychId, setDiptychId] = useState<number | null>(null);
  const [artwork, setArtwork] = useState<any>(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoResponse = await axios.get(`/api/photos/${photoID}`);
        setPhoto(photoResponse.data);

        const artworkResponse = await axios.get(`/api/artworks/${artworkID}`);
        setArtwork(artworkResponse.data);
        setDiptychId(artworkResponse.data.diptychId);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [photoID, artworkID]);

  useEffect(() => {
    if (artwork && photo) {
      const defaultFrameType = useStore.getState().frames[useStore.getState().FrameId - 1]?.frameType;
      const defaultDiptychIdCode = `E_${photo.aspectRatio.replace(':', 'x')}_CD_P_${defaultFrameType.charAt(0).toUpperCase()}`;
      setCarouselSelectedDiptychIdCode(defaultDiptychIdCode);
    }
  }, [artwork, photo]);

  const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
    updateFabricCanvas(diptychIdCode, canvasRef);
  }, []);

  const updateFabricCanvas = (diptychIdCode: string, canvas: fabric.Canvas) => {
    setFabricCanvas((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(diptychIdCode, canvas);
      return newMap;
    });
  };

  const handleLayoutSpecsReady = useCallback((layoutSpecs: LayoutSpecs) => {
    setLayoutSpecsMap((prevMap) => new Map(prevMap).set(layoutSpecs.DiptychIdCode, layoutSpecs));
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

  const updateContainerHeight = useCallback((height: number) => {
    if (containerRef.current) {
      containerRef.current.style.height = `${height}px`;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const carousel = containerRef.current.querySelector('.slick-list');
        if (carousel) {
          containerRef.current.style.height = `${carousel.clientHeight + 100}px`; // Add some padding if needed
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateContainerHeight]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div ref={containerRef} style={{ backgroundColor: '#f5f5f5', padding: '16px', border: '2px dotted red' }}>
      {photo && photo.imagePath && (
        <DiptychCarouselDynamic // Use DiptychCarouselDynamic instead of CarouselWrapper
          photoId={photoID ?? ''}
          imagePath={photo.imagePath}
          frameId={3}
          diptychId={artwork.diptychId}
          aspectRatio={photo.aspectRatio}
          areShapesVisible={areShapesVisible}
          containerRef={containerRef}
          onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
          handleCanvasReady={handleCanvasReady}
          handleLayoutSpecsReady={handleLayoutSpecsReady}
        />
      )}
      {photo && photo.imagePath && (
        <Box display="flex" justifyContent="center" mt={2} style={{ border: '2px dotted blue' }}>
          {renderDownloadButton(photoID, carouselSelectedDiptychIdCode)}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible((prev) => !prev)}>
            {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
          </button>
          <FullScreenButtonFavs onClick={handleOpenFullScreen} />
        </Box>
      )}
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
});

export default PurchaseArtworkCarousel;
