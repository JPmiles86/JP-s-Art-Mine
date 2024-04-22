// my-gallery/src/screens/Purchase.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import useStore from '../utils/store';
import buttonStyles from './ButtonStyles.module.css';
import BuyerInfoForm from '../components/forms/BuyerInfoForm';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/modals/AuthModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Purchase: React.FC = () => {
  const { photoID, artworkID } = useParams<{ photoID: string; artworkID: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>(null);
  const [artwork, setArtwork] = useState<any>(null);
  const [diptychId, setDiptychId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isSold, setIsSold] = useState(false);
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
  const [remainingTime, setRemainingTime] = useState(1200); // 20 minutes in seconds
  const [toastId, setToastId] = useState<React.ReactText | null>(null);
  const [timerExpired, setTimerExpired] = useState(false);

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
    // Handle the selected diptych ID code change
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated || !userId) {
        setOpenAuthModal(true);
      }
    }, 500); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, [isAuthenticated, userId]);

  useEffect(() => {
    checkArtworkStatusAndInitializeTimer();
  }, [photoID, artworkID]);

  const checkArtworkStatusAndInitializeTimer = async () => {
    try {
      const photoResponse = await axios.get(`/api/photos/${photoID}`);
      const artworkResponse = await axios.get(`/api/artworks/${artworkID}`);
      setPhoto(photoResponse.data);
      setArtwork(artworkResponse.data);
      setDiptychId(artworkResponse.data.diptychId);

      if (artworkResponse.data.status === 'Available') {
        startCountdownTimer();
      } else {
        setIsPending(artworkResponse.data.status === 'Pending Sale');
        setIsSold(artworkResponse.data.status === 'Sold');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdownTimer = async () => {
    console.log('Attempting to start countdown timer...'); // Debugging log
    try {
      const pendingResponse = await axios.post('/api/artworkPending', {
        artworkID: artworkID,
        userId: userId || null,
      });
      console.log('ArtworkPending entry created:', pendingResponse.data);

      const updateResponse = await axios.put(`/api/artworks/${artworkID}`, { status: 'Pending Sale' });
      console.log('Artwork status update response:', updateResponse.data);

      if (updateResponse.data.success) {  // Assuming your API returns a success flag
        console.log('Artwork status updated to Pending Sale');
        const timer = setInterval(() => {
          setRemainingTime(prevTime => {
            if (prevTime <= 0) {
              clearInterval(timer);
              handleTimerExpiration();
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        const newToastId = toast.info(`Time remaining to complete the purchase: ${formatTime(remainingTime)}`, {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          position: 'top-center',
        });
        setToastId(newToastId);
      } else {
        console.error('Failed to update artwork status. Received:', updateResponse.data);
      }
    } catch (error) {
      console.error('Error starting countdown timer:', error);
    }
};

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimerExpiration = async () => {
    try {
      await axios.delete('/api/artworkPending', { data: { artworkID, userId: userId || null } });
      await axios.put(`/api/artworks/${artworkID}`, { status: 'Available' });
      if (toastId) toast.dismiss(toastId);
    } catch (error) {
      console.error('Error handling timer expiration:', error);
    }
  };

 // useEffect(() => {
 //   const checkArtworkStatus = async () => {
 //     try {
 //       const response = await axios.get(`/api/artworks/${artworkID}/status`);
 //       setIsPending(response.data.status === 'Pending');
 //       setIsSold(response.data.status === 'Sold');
  //    } catch (error) {
  //      console.error('Error checking artwork status:', error);
  //    }
  //  };

   // if (artworkID) {
   //   checkArtworkStatus();
   // }
  //}, [artworkID]);

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

   // Render logic remains unchanged
   if (isLoading) return <Typography>Loading...</Typography>;
   if (isSold) return (<div><Typography>This artwork has already been sold.</Typography></div>);
   if (isPending) return (<div><Typography>This artwork is currently pending another sale.</Typography></div>);
 

  if (isSold) {
    return (
      <div>
        <Typography>This artwork has already been sold.</Typography>
        <button className={buttonStyles.button} onClick={handleBackToInquire}>Back to Inquire Page</button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div>
        <Typography>This artwork is currently pending another sale.</Typography>
        <button className={buttonStyles.button} onClick={handleBackToInquire}>Back to Inquire Page</button>
      </div>
    );
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
      <ToastContainer />
    </div>
  );
};

export default Purchase;