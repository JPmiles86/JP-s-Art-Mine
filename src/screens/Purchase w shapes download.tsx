// my-gallery/src/screens/Purchase.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import useStore from '../utils/store';
import buttonStyles from './ButtonStyles.module.css';
import BuyerInfoForm from '../components/forms/BuyerInfoForm';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/modals/AuthModal';
import DownloadButton from '../components/layout/DownloadButton'; 

const Purchase: React.FC = () => {
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
  const [buyerInfo, setBuyerInfo] = useState(null);
  const userId = useStore((state) => state.userId);
  const { isAuthenticated } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const isAnonymous = useStore((state) => state.isAnonymous);
  const [carouselSelectedDiptychIdCode, setCarouselSelectedDiptychIdCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated || !userId) {
        setOpenAuthModal(true);
      }
    }, 500); // Adjust the delay as needed
  
    return () => clearTimeout(timer);
  }, [isAuthenticated, userId]);

  const handleBuyerInfoSubmit = (buyerInfo: any) => {
    setBuyerInfo(buyerInfo);
  };

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

  const handleBuyNow = async () => {
    try {
      await axios.post(`/api/artworks/${artworkID}/purchase`, {
        buyerInfo,
        // Purchase data
      });
      // Handle successful purchase
    } catch (error) {
      console.error('Error purchasing artwork:', error);
    }
  };

  const handleBackToInquire = () => {
    navigate(`/${filter}/${photoID}/inquire`);
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
    if (diptych && photo) {
      const defaultFrameType = useStore.getState().frames[useStore.getState().FrameId - 1]?.frameType;
      const defaultDiptychIdCode = `E_${photo.aspectRatio.replace(':', 'x')}_CD_P_${defaultFrameType.charAt(0).toUpperCase()}`;
      setCarouselSelectedDiptychIdCode(defaultDiptychIdCode);
    }
  }, [diptych, photo]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Purchase Page</Typography>
      {/* Display photo and artwork details */}
      {diptychId === 1 ? (
        <DiptychCarouselDynamic
          photoId={photoID ?? ''}
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
          photoId={photoID ?? ''}
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
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        {renderDownloadButton(photoID, carouselSelectedDiptychIdCode)}
        <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}>
          {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
        </button>
      </div>
      {/* Provenance form */}
      {userId && <BuyerInfoForm onSubmit={handleBuyerInfoSubmit} userId={userId} />}
      <button className={buttonStyles.button} onClick={handleBuyNow}>Buy Now</button>
      <button className={buttonStyles.button} onClick={handleBackToInquire}>Back to Inquire Page</button>
      <AuthModal
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        showAnonymousOption={false}
        isLikeTriggered={false}
        onSuccessfulAuth={() => {}}
        isAnonymousUser={isAnonymous}
      />
    </div>
  );
};

export default Purchase;