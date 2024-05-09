// my-gallery/src/components/forms/PaymentForm.tsx

import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface PaymentFormProps {
    isActive: boolean;
    userId: number;
    artworkId: number;
    artworkPrice: number; 
    onPaymentSuccess: () => void;
  }

const PaymentForm: React.FC<PaymentFormProps> = ({ isActive, userId, artworkId, artworkPrice, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
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
            <form onSubmit={handleSubmit}>
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
              {error && (
                <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                  {error}
                </Typography>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
                <button type="submit" className={buttonStyles.button} disabled={isProcessing || !stripe}>
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </form>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PaymentForm;