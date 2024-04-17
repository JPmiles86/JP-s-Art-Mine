// my-gallery/src/screens/RequestAccess.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import useStore from '../utils/store';
import buttonStyles from './ButtonStyles.module.css';

const RequestAccess: React.FC = () => {
  const { photoID, artworkID } = useParams<{ photoID: string; artworkID: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>(null);
  const [artwork, setArtwork] = useState<any>(null);
  const [diptychId, setDiptychId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [diptych, setDiptych] = useState<any>(null);
  const FrameId = useStore((state) => state.FrameId);
  const { filter } = useParams<{ filter: string }>();

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
    // Handle the selected diptych ID code change
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

  const handleRequestAccess = async () => {
    try {
      await axios.post(`/api/artworks/${artworkID}/request-access`, {
        // Request access data
      });
      // Handle successful request
    } catch (error) {
      console.error('Error requesting access:', error);
    }
  };

  const handleBackToInquire = () => {
    navigate(`/${filter}/${photoID}/inquire`);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Request Access Page</Typography>
      {/* Display photo and artwork details */}
      {diptychId === 1 ? (
        <DiptychCarouselDynamic
          photoId={photoID}
          imagePath={photo.imagePath}
          frameId={3}
          diptychId={diptychId}
          aspectRatio={photo.aspectRatio}
          areShapesVisible={areShapesVisible}
          containerRef={containerRef}
          handleCanvasReady={handleCanvasReady}
          onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
          handleLayoutSpecsReady={handleLayoutSpecsReady}
        />
      ) : (
        <DiptychCarousel
          photoId={photoID}
          imagePath={photo.imagePath}
          frameId={3}
          diptychId={diptychId}
          aspectRatio={photo.aspectRatio}
          areShapesVisible={areShapesVisible}
          containerRef={containerRef}
          handleCanvasReady={handleCanvasReady}
          onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
          handleLayoutSpecsReady={handleLayoutSpecsReady}
        />
      )}
      {/* Request access form */}
      <button className={buttonStyles.button} onClick={handleRequestAccess}>Request Access</button>
      <button className={buttonStyles.button}onClick={handleBackToInquire}>Back to Inquire Page</button>
    </div>
  );
};

export default RequestAccess;