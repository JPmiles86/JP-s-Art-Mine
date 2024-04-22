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
  
        // Check the artwork status
        const statusResponse = await axios.get(`/api/artworks/${artworkID}/status`);
        const currentStatus = statusResponse.data.status;
  
        if (currentStatus === 'Available') {
          // Start the countdown timer only if the artwork is available
          startCountdownTimer();
        } else {
          setIsPending(currentStatus === 'Pending Sale');
          setIsSold(currentStatus === 'Sold');
        }
  
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [photoID, artworkID]);

  const startCountdownTimer = async () => {
    try {
      console.log('Starting countdown timer');
  
      // Create a new entry in the ArtworkPending table
      const response = await axios.post('/api/artworkPending', {
        artworkId: artworkID,
        userId: userId || null,
      });
  
      console.log('ArtworkPending entry created:', response.data);
  
      // Update the Artwork table's status to 'Pending Sale'
      if (artworkID) {
        await axios.put(`/api/artworks/${artworkID}`, { status: 'Pending Sale' });
        console.log('Artwork status updated to Pending Sale');
      }
  
      // Start the timer
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setTimerExpired(true);
            handleTimerExpiration();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      // Display the toast notification with the timer
      const toastId = toast.info(
        <div>
          Time remaining to complete the purchase: {formatTime(remainingTime)}
          <button onClick={() => handleRenewTimer()}>Renew Timer</button>
          <button onClick={() => handleCancelPurchase()}>Cancel Purchase</button>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          position: 'top-center',
          onClose: () => setToastId(null),
        }
      );
      setToastId(toastId);
  
      return () => {
        clearInterval(timer);
      };
    } catch (error) {
      console.error('Error starting countdown timer:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRenewTimer = async () => {
    try {
      // Update the pendingUntil timestamp in the ArtworkPending table
      await axios.put('/api/artworkPending', {
        artworkId: artworkID,
        userId: userId || null,
        pendingUntil: new Date(Date.now() + 20 * 60 * 1000), // Add 20 minutes to the current time
      });

      // Reset the timer
      setRemainingTime(1200);
      setTimerExpired(false);

      // Close the current toast and open a new one with the renewed timer
      if (toastId) {
        toast.dismiss(toastId);
      }
      const newToastId = toast.info(
        <div>
          Time remaining to complete the purchase: {formatTime(1200)}
          <button onClick={() => handleRenewTimer()}>Renew Timer</button>
          <button onClick={() => handleCancelPurchase()}>Cancel Purchase</button>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          position: 'top-center',
          onClose: () => setToastId(null),
        }
      );
      setToastId(newToastId);
    } catch (error) {
      console.error('Error renewing timer:', error);
    }
  };

  const handleCancelPurchase = async () => {
    try {
      // Remove the entry from the ArtworkPending table
      await axios.delete('/api/artworkPending', {
        data: {
          artworkId: artworkID,
          userId: userId || null,
        },
      });

      // Update the Artwork table's status back to 'Available'
      await axios.put(`/api/artworks/${artworkID}`, { status: 'Available' });

      // Close the toast and navigate back to the inquire page
      if (toastId) {
        toast.dismiss(toastId);
      }
      navigate(`/${filter}/${photoID}/inquire`);
    } catch (error) {
      console.error('Error canceling purchase:', error);
    }
  };

  const handleTimerExpiration = async () => {
    try {
      // Remove the entry from the ArtworkPending table
      await axios.delete('/api/artworkPending', {
        data: {
          artworkId: artworkID,
          userId: userId || null,
        },
      });

      // Update the Artwork table's status back to 'Available'
      await axios.put(`/api/artworks/${artworkID}`, { status: 'Available' });

      // Close the toast and display the expiration modal
      if (toastId) {
        toast.dismiss(toastId);
      }
      // TODO: Open the expiration modal
    } catch (error) {
      console.error('Error handling timer expiration:', error);
    }
  };

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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

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