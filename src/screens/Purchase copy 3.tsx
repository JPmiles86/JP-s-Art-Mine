import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Link } from '@mui/material';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import useStore from '../utils/store';
import buttonStyles from './ButtonStyles.module.css';
import TimerOverModal from '../components/modals/TimerOverModal';
import useTimer from '../utils/useTimer';
import TimerDisplay from '../utils/TimerDisplay';
import { useAuth } from '../contexts/AuthContext';
import { updateArtworkStatus, updateArtworkPendingEntry } from '../utils/artworkApi';
import AuthModal from '../components/modals/AuthModal';
import DownloadButton from '../components/layout/DownloadButton'; 
import FullScreenButton from '../components/layout/FullScreenButton';
import FullScreenViewCarousel from '../components/layout/FullScreenViewCarousel';


interface Artwork {
  id: number;
  artworkID: string;
  status: string;
}

const Purchase: React.FC = () => {
  const { artworkID, filter, photoID } = useParams<{ artworkID: string; filter: string; photoID: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>(null);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [diptychId, setDiptychId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [diptych, setDiptych] = useState<any>(null);
  const FrameId = useStore((state) => state.FrameId);
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const userId = useStore((state) => state.userId);
  const { isAuthenticated } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAnonymous = useStore((state) => state.isAnonymous);
  const [pendingEntryExists, setPendingEntryExists] = useState(false);
  const [carouselSelectedDiptychIdCode, setCarouselSelectedDiptychIdCode] = useState('');
  const { remainingTime, startCountdownTimer, renewTimer } = useTimer(artwork?.id || 0, userId);
  const [showModal, setShowModal] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);

  useEffect(() => {
    const checkAndInitialize = async () => {
      try {
        const response = await axios.get(`/api/artworks/${artworkID}`);
        setArtwork(response.data);

        if (response.data.status === 'Available') {
          if (userId) {
            await updateArtworkStatus(response.data.artworkID, userId);
            await updateArtworkPendingEntry(response.data.id, userId);
            startCountdownTimer();
          } else {
            await updateArtworkStatus(response.data.artworkID, null);
            await updateArtworkPendingEntry(response.data.id, null);
            startCountdownTimer();
            setTimeout(() => {
              setShowAuthModal(true);
            }, 500);
          }
        } else if (response.data.status === 'Pending Sale') {
          if (userId) {
            const pendingEntryResponse = await axios.get(`/api/artworkPending/${response.data.id}/${userId}`);
            if (pendingEntryResponse.data) {
              startCountdownTimer();
            }
          }
        }
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndInitialize();
  }, [artworkID, userId, startCountdownTimer]);

  useEffect(() => {
    if (userId) {
      updateArtworkPendingEntry(artwork?.id || 0, userId);
    }
  }, [userId, artwork]);

  const toggleTimerDisplay = () => {
    setMinimized(!minimized);
  };

  const handleBackToInquire = () => {
    navigate(`/${filter}/${photoID}/inquire`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenFullScreen = () => {
    setFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setFullScreenOpen(false);
  };

  useEffect(() => {
    if (remainingTime === 0) {
      setShowModal(true);
    }
  }, [remainingTime]);

  useEffect(() => {
    const checkPendingEntry = async () => {
      if (artwork?.status === 'Pending Sale' && userId && artwork.id) {
        try {
          const pendingEntryResponse = await axios.get(`/api/artworkPending/${artwork.id}/${userId}`);
          setPendingEntryExists(!!pendingEntryResponse.data);
        } catch (error) {
          console.error('Error fetching pending entry:', error);
        }
      }
    };
  
    checkPendingEntry();
  }, [artwork, userId]);  

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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (artwork?.status === 'Pending Sale' && userId && artwork.id && !pendingEntryExists) {
    return (
      <div>
        <Typography>This artwork is currently pending sale for another user.</Typography>
        <Link href={`/${filter}/${photoID}/inquire`}>Choose a different variation or size</Link>
      </div>
    );
  }

  if (artwork?.status === 'Sold') {
    return (
      <div>
        <Typography>This artwork has already been sold.</Typography>
        <Link href={`/${filter}/${photoID}/inquire`}>Choose a different variation or size</Link>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" style={{ justifyContent: 'center', textAlign: 'center', marginTop: '55px' }}>Purchase Page</Typography>
      <Typography style={{ justifyContent: 'center', textAlign: 'center', marginTop: '20px' }}>
        {artwork?.artworkID} - {artwork?.status}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button className={buttonStyles.button} onClick={handleBackToInquire}>
          Back to Inquire
        </button>
      </div>
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
        <FullScreenButton onClick={handleOpenFullScreen} />
      </div>
      <TimerDisplay
        remainingTime={remainingTime}
        minimized={minimized}
        toggleTimerDisplay={toggleTimerDisplay}
        renewTimer={renewTimer}
      />
      {showModal && <TimerOverModal renewTimer={renewTimer} backToInquire={handleBackToInquire} onClose={handleCloseModal} artworkID={artworkID ?? ''} userId={userId} />}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        showAnonymousOption={false}
        isLikeTriggered={false}
        isAnonymousUser={isAnonymous}
      />
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
    </div>
  );
};

export default Purchase;