
// my-gallery/src/components/forms/PaymentForm.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { BillingLocation } from './BillingInformationForm';
import { DeliveryLocation } from './DeliveryInformationForm';
import { countryCodeMap } from './countriesStripe';

interface PaymentFormProps {
  isActive: boolean;
  userId: number;
  artworkId: number;
  artworkPrice: number;
  onPaymentSuccess: () => void;
  deliveryLocation: DeliveryLocation | null;
  billingLocation: BillingLocation | null;
  returnUrl: string;
  className?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ isActive, userId, artworkId, artworkPrice, onPaymentSuccess, deliveryLocation, billingLocation, returnUrl, className }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameOnCard, setNameOnCard] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5'); // Initial background color

  useEffect(() => {
    if (paymentCompleted) {
      setBackgroundColor('#ffffff'); // Change to white on payment completion
    }
  }, [paymentCompleted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!nameOnCard.trim()) {
      setError('Please enter the name on the card.');
      return;
    }

    if (!billingLocation) {
      setError('Please provide a billing address.');
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: nameOnCard,
            address: {
              line1: billingLocation.addressLine1 || '',
              line2: billingLocation.addressLine2 || '',
              city: billingLocation.city || '',
              state: billingLocation.stateProvince || '',
              postal_code: billingLocation.postalCode || '',
              country: countryCodeMap[billingLocation.country] || '',
            },
          },
        });

        if (error) {
          setError(error.message || 'An error occurred while processing the payment.');
          console.error('Error creating PaymentMethod:', error);
          setIsProcessing(false);
          return;
        }

        const response = await axios.post('/api/createPaymentIntent', {
          userId,
          artworkId,
          paymentMethodId: paymentMethod.id,
          artworkPrice,
          returnUrl: 'https://jpmilesart.com', // Use a valid placeholder URL
        });

        const clientSecret = response.data.clientSecret;

        const paymentIntentResult = await stripe.retrievePaymentIntent(clientSecret);
        const paymentIntent = paymentIntentResult.paymentIntent;

        if (paymentIntent?.status === 'succeeded') {
          setPaymentCompleted(true);
          onPaymentSuccess();
        } else {
          const { error: confirmError, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
            return_url: 'https://jpmilesart.com', // Use the same placeholder URL
          });

          if (confirmError) {
            setError(confirmError.message || 'An error occurred while confirming the payment.');
            console.error('Error confirming Card Payment:', confirmError);
          } else if (confirmedPaymentIntent?.status === 'succeeded') {
            setPaymentCompleted(true);
            onPaymentSuccess();
          } else {
            setError('Payment was not successful.');
            console.error('PaymentIntent status:', confirmedPaymentIntent?.status);
          }
        }
      }
    } catch (error) {
      setError('An error occurred while processing the payment.');
      console.error('An error occurred while processing the payment:', error);
    }

    setIsProcessing(false);
  };

  return (
    <div className={className} style={{ backgroundColor, padding: '20px' }}>
      <Typography
        variant="h6"
        style={{
          backgroundColor: isActive ? '#000000' : '#424242',
          color: '#ffffff',
          padding: '20px',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <strong>Step 4: Payment Information</strong>
      </Typography>
      {isActive && !paymentCompleted && (
        <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Please Enter Your Payment Details</strong></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              All payments are securely processed using Stripe. <br></br>We do not store any credit card information.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name on Card"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '4px' }}>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {billingLocation && (
                    <Typography variant="body2">
                      <strong>Billing Address: </strong><br />
                      {billingLocation.addressLine1}, {billingLocation.addressLine2 ? `${billingLocation.addressLine2}, ` : ''}
                      {billingLocation.city}, {billingLocation.stateProvince}, {billingLocation.postalCode}, {billingLocation.country}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Amount: ${artworkPrice.toFixed(2)} USD</Typography>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <button type="submit" className={buttonStyles.button} disabled={isProcessing || !stripe}>
                    {isProcessing ? 'Processing...' : 'Review Purchase'}
                  </button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
      {paymentCompleted && (
        <Typography variant="body1" style={{ textAlign: 'center', padding: '30px', marginTop: '20px' }}>
          Stripe has confirmed your Payment information, but you have not yet been charged.
          <br></br><strong>Please review the purchase details below and confirm your purchase.</strong>
        </Typography>
      )}
    </div>
  );
};

export default PaymentForm;
