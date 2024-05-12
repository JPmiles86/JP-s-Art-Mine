import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { BillingLocation } from './BillingInformationForm';
import { DeliveryLocation } from './DeliveryInformationForm';

interface PaymentFormProps {
  isActive: boolean;
  userId: number;
  artworkId: number;
  artworkPrice: number;
  onPaymentSuccess: () => void;
  deliveryLocation: DeliveryLocation | null;
  billingLocation: BillingLocation | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ isActive, userId, artworkId, artworkPrice, onPaymentSuccess, deliveryLocation, billingLocation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameOnCard, setNameOnCard] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Basic validation
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
        console.log('Billing details being passed to Stripe:', {
          name: nameOnCard,
          address: {
            line1: billingLocation.addressLine1 || '',
            line2: billingLocation.addressLine2 || '',
            city: billingLocation.city || '',
            state: billingLocation.stateProvince || '',
            postal_code: billingLocation.postalCode || '',
            country: billingLocation.country || '',
          },
        });

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
              country: billingLocation.country || '',
            },
          },
        });

        if (error) {
          setError(error.message || 'An error occurred while processing the payment.');
        } else {
          const response = await axios.post('/api/createPaymentIntent', {
            userId,
            artworkId,
            paymentMethodId: paymentMethod.id,
            artworkPrice,
          });

          if (response.data.clientSecret) {
            const { error: confirmError } = await stripe.confirmCardPayment(response.data.clientSecret);

            if (confirmError) {
              setError(confirmError.message || 'An error occurred while confirming the payment.');
            } else {
              onPaymentSuccess();
            }
          }
        }
      }
    } catch (error) {
      setError('An error occurred while processing the payment.');
    }

    setIsProcessing(false);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
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
        <strong>Payment Information</strong>
      </Typography>
      {isActive && (
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
                    {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                  </button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PaymentForm;