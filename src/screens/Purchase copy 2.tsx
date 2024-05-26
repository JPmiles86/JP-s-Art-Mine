// my-gallery/src/screens/Purchase.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Link, Grid, Box } from '@mui/material';
import useStore from '../utils/store';
import buttonStyles from './ButtonStyles.module.css';
import TimerOverModal from '../components/modals/TimerOverModal';
import useTimer from '../utils/useTimer';
import TimerDisplay from '../utils/TimerDisplay';
import { updateArtworkStatus, updateArtworkPendingEntry } from '../utils/artworkApi';
import AuthModal from '../components/modals/AuthModal';
import PurchaseArtworkDetails from './PurchaseArtworkDetails';
import PurchaseArtworkCarousel from './PurchaseArtworkCarousel';
import BuyerForm from '../components/forms/BuyerForm';
import CollectorForm from '../components/forms/CollectorForm';
import DeliveryInformationForm, { DeliveryLocation } from '../components/forms/DeliveryInformationForm';
import BillingInformationForm, { BillingLocation } from '../components/forms/BillingInformationForm';
import PaymentForm from '../components/forms/PaymentForm';
import PurchaseReviewForm from '../components/forms/PurchaseReviewForm';

interface Artwork {
  id: number;
  artworkID: string;
  status: string;
}

const Purchase: React.FC = () => {
  const { artworkID, filter, photoID } = useParams<{ artworkID: string; filter: string; photoID: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const userId = useStore((state) => state.userId);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAnonymous = useStore((state) => state.isAnonymous);
  const [pendingEntryExists, setPendingEntryExists] = useState(false);
  const { remainingTime, startCountdownTimer, renewTimer } = useTimer(artwork?.id || 0, userId);
  const [showModal, setShowModal] = useState(false);
  const [showSignUpNote, setShowSignUpNote] = useState(false);
  const [showCollectorForm, setShowCollectorForm] = useState(false);
  const [collectorInfo, setCollectorInfo] = useState<any>(null);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [artworkPrice, setArtworkPrice] = useState(0);
  const [buyerInfo, setBuyerInfo] = useState<any>(null);
  const [billingLocation, setBillingLocation] = useState<BillingLocation | null>(null);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [artworkDetails, setArtworkDetails] = useState<any>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const checkAndInitialize = async () => {
      try {
        const response = await axios.get(`/api/artworks/${artworkID}`);
        setArtwork(response.data);

        if (response.data.status === 'Available') {
          if (userId) {
            if (isAnonymous) {
              setShowAuthModal(true);
              setShowSignUpNote(true);
            } else {
              await updateArtworkStatus(response.data.artworkID, userId);
              await updateArtworkPendingEntry(response.data.id, userId);
              startCountdownTimer();
            }
          } else {
            await updateArtworkStatus(response.data.artworkID, null);
            await updateArtworkPendingEntry(response.data.id, null);
            startCountdownTimer();
            setTimeout(() => {
              setShowAuthModal(true);
              setShowSignUpNote(true);
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
  }, [artworkID, userId, startCountdownTimer, isAnonymous]);

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const response = await axios.get(`/api/artworks/${artworkID}/details`);
        setArtworkPrice(response.data.price);
        setArtworkDetails(response.data);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      }
    };

    if (artworkID) {
      fetchArtworkDetails();
    }
  }, [artworkID]);

  useEffect(() => {
    if (userId) {
      updateArtworkPendingEntry(artwork?.id || 0, userId);
    }
  }, [userId, artwork]);

  const handleConfirmPurchase = async () => {
    try {
      const response = await axios.post('/api/confirmPurchase', {
        userId,
        artworkId: artwork?.id,
        buyerInfo,
        collectorInfo,
        deliveryLocation,
        billingLocation,
        artworkPrice,
      });

      if (response.data.success) {
        // Store the token in localStorage
        localStorage.setItem('purchaseToken', response.data.token);

        // Navigate to the success page
        navigate(`/${filter}/${photoID}/success/${artworkID}`);
      } else {
        // Handle purchase failure
        console.error('Purchase failed');
        // Show an error message to the user
      }
    } catch (error) {
      console.error('Error confirming purchase:', error);
      // Show an error message to the user
    }
  };

  const toggleTimerDisplay = () => {
    setMinimized(!minimized);
  };

  const handleBackToInquire = () => {
    navigate(`/${filter}/${photoID}/inquire`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSignUp = () => {
    setShowAuthModal(true);
  };

  const handlePaymentSuccess = () => {
    console.log('Payment successful');
    setShowReviewForm(true);
  };

  const handleBuyerInfoSubmit = (buyerInfo: any) => {
    console.log('Buyer Info:', buyerInfo);
    setBuyerInfo(buyerInfo);
    setShowCollectorForm(buyerInfo.isArtworkOwnerSameAsPurchaser === false);
    if (!showCollectorForm) {
      setShowDeliveryForm(true);
    }
  };

  const handleCollectorInfoSubmit = (collectorInfo: any) => {
    console.log('Collector Info:', collectorInfo);
    setCollectorInfo(collectorInfo);
    setShowDeliveryForm(true);
  };

  const handleDeliveryLocationSubmit = (location: DeliveryLocation) => {
    console.log('Delivery Location:', location);
    setDeliveryLocation(location);
    setShowBillingForm(true);
  };

  const handleBillingLocationSubmit = (location: BillingLocation) => {
    console.log('Billing Location:', location);
    setBillingLocation(location);
    setShowPaymentForm(true);
  };

  const generateReturnUrl = () => {
    return 'https://jpmilesart.com';
  };

  useEffect(() => {
    if (remainingTime === 0) {
      setShowModal(true);
    }
  }, [remainingTime]);

  useEffect(() => {
    const fetchBuyerEmail = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/profile`);
        const { user } = response.data;
        setBuyerEmail(user.email);
      } catch (error) {
        console.error('Error fetching buyer email:', error);
      }
    };

    if (userId) {
      fetchBuyerEmail();
    }
  }, [userId]);

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
    <Box>
      <Typography variant="h4" align="center" mt={8}>
        Checkout
      </Typography>
      <Typography style={{ justifyContent: 'center', textAlign: 'center', marginTop: '20px' }}>
        Thanks for your interest in purchasing: <br />
        <strong>{artwork?.artworkID}</strong>
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button className={buttonStyles.navButton} style={{ margin: '10px 20px' }} onClick={handleBackToInquire}>
          Choose Another Size Or Variation
        </button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box position="relative">
            {!userId || (userId && isAnonymous) ? (
              <div style={{ marginTop: '40px' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {isAnonymous ? 'Hello Mr. or Mrs. Anonymous' : 'Welcome!'}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  To purchase an artwork, you need to {isAnonymous ? 'sign up with an email and password' : 'sign in or sign up'}.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button className={buttonStyles.buttonLarge} onClick={handleSignUp}>
                    {isAnonymous ? 'Sign Up' : 'Sign In or Sign Up'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <BuyerForm onSubmit={handleBuyerInfoSubmit} userId={userId} />
                {showCollectorForm && <CollectorForm onSubmit={handleCollectorInfoSubmit} userId={userId} buyerEmail={buyerEmail} />}
                <DeliveryInformationForm
                  userId={userId}
                  onSubmit={handleDeliveryLocationSubmit}
                  isActive={showDeliveryForm}
                  buyerInfo={buyerInfo}
                  collectorInfo={collectorInfo}
                />
                <BillingInformationForm
                  userId={userId}
                  onSubmit={handleBillingLocationSubmit}
                  isActive={showBillingForm}
                  deliveryLocation={deliveryLocation}
                />
                <PaymentForm
                  isActive={showPaymentForm}
                  userId={userId}
                  artworkId={artwork?.id || 0}
                  artworkPrice={artworkPrice}
                  onPaymentSuccess={handlePaymentSuccess}
                  deliveryLocation={deliveryLocation}
                  billingLocation={billingLocation}
                  returnUrl={generateReturnUrl()}
                />
                <PurchaseReviewForm
                  isActive={showReviewForm}
                  buyerInfo={buyerInfo}
                  collectorInfo={collectorInfo}
                  deliveryLocation={deliveryLocation}
                  billingLocation={billingLocation}
                  artworkDetails={artworkDetails}
                  onConfirmPurchase={handleConfirmPurchase}
                />
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box position="sticky" top="10px">
            <PurchaseArtworkCarousel />
            {artworkDetails && (
              <PurchaseArtworkDetails artworkDetails={artworkDetails} />
            )}
          </Box>
        </Grid>
      </Grid>

      <TimerDisplay remainingTime={remainingTime} minimized={minimized} toggleTimerDisplay={toggleTimerDisplay} renewTimer={renewTimer} />
      {showModal && (
        <TimerOverModal
          renewTimer={renewTimer}
          backToInquire={handleBackToInquire}
          onClose={handleCloseModal}
          artworkID={artworkID ?? ''}
          userId={userId}
        />
      )}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        showAnonymousOption={false}
        isLikeTriggered={false}
        isAnonymousUser={isAnonymous}
        isPurchasePage={true}
        handleBackToInquire={handleBackToInquire}
      />
    </Box>
  );
};

export default Purchase;
