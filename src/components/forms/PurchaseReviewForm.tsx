// my-gallery/src/components/forms/PurchaseReviewForm.tsx

import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface PurchaseReviewFormProps {
  buyerInfo: any;
  collectorInfo: any;
  deliveryLocation: any;
  billingLocation: any;
  artworkDetails: any;
  onConfirmPurchase: (artworkPrice: number) => void; // Add artworkPrice parameter
  isActive: boolean;
}

const PurchaseReviewForm: React.FC<PurchaseReviewFormProps> = ({
  buyerInfo,
  collectorInfo,
  deliveryLocation,
  billingLocation,
  artworkDetails,
  onConfirmPurchase,
  isActive,
}) => {
  const getPersonName = (info: any) => {
    return `${info.firstName} ${info.middleName} ${info.lastName}`;
  };

  const getOrganizationInfo = (info: any) => {
    return (
      <>
        <Typography variant="body2">Organization: {info.organizationName}</Typography>
        <Typography variant="body2">Contact Person: {info.contactPersonName}</Typography>
      </>
    );
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
        <strong>Step 5: Review Purchase Details</strong>
      </Typography>
      {isActive && (
        <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Artwork Details:</strong></Typography>
            <Typography variant="body2">Artwork ID: {artworkDetails?.artworkId}</Typography>
            <Typography variant="body2">Photo ID: {artworkDetails?.photoId}</Typography>
            <Typography variant="body2">Diptych Variation: {artworkDetails?.diptychName}</Typography>
            <Typography variant="body2">Edition: {artworkDetails?.edition === 'CP' ? "Collector's Print - 1/1" : "Artist's Print - 1/1"}</Typography>
            <Typography variant="body2">Artist: J.P. Miles</Typography>
            <Typography variant="body2">Artwork Size: {artworkDetails?.sizeName}</Typography>
            <Typography variant="body2">Print Size (inches): {artworkDetails?.printSizeInInches}</Typography>
            <Typography variant="body2">Print Size (cm): {artworkDetails?.printSizeInCm}</Typography>
            <Typography variant="body1"><strong>Price: ${artworkDetails?.price}</strong></Typography>
            <Typography variant="body2"><strong>Currency: {artworkDetails?.currency}</strong></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Buyer:</strong></Typography>
            {buyerInfo?.entityType === 'Person' ? (
              <>
                <Typography variant="body2">{getPersonName(buyerInfo)}</Typography>
                <Typography variant="body2">{buyerInfo.primaryEmail}</Typography>
                <Typography variant="body2">{buyerInfo.primaryPhone}</Typography>
              </>
            ) : buyerInfo ? (
              getOrganizationInfo(buyerInfo)
            ) : null}
          </Grid>
          {collectorInfo && (
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Collector:</strong></Typography>
              {collectorInfo.entityType === 'Person' ? (
                <>
                  <Typography variant="body2">{getPersonName(collectorInfo)}</Typography>
                  <Typography variant="body2">{collectorInfo.primaryEmail}</Typography>
                  <Typography variant="body2">{collectorInfo.primaryPhone}</Typography>
                </>
              ) : (
                getOrganizationInfo(collectorInfo)
              )}
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Delivery Address:</strong></Typography>
            <Typography variant="body2">{deliveryLocation?.businessName || ''}</Typography>
            <Typography variant="body2">{deliveryLocation?.addressLine1}</Typography>
            {deliveryLocation?.addressLine2 && <Typography variant="body2">{deliveryLocation.addressLine2}</Typography>}
            <Typography variant="body2">{deliveryLocation?.city}, {deliveryLocation?.stateProvince}</Typography>
            <Typography variant="body2">{deliveryLocation?.postalCode}</Typography>
            <Typography variant="body2">{deliveryLocation?.country}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Billing Address:</strong></Typography>
            <Typography variant="body2">{billingLocation?.businessName || ''}</Typography>
            <Typography variant="body2">{billingLocation?.addressLine1}</Typography>
            {billingLocation?.addressLine2 && <Typography variant="body2">{billingLocation.addressLine2}</Typography>}
            <Typography variant="body2">{billingLocation?.city}, {billingLocation?.stateProvince}</Typography>
            <Typography variant="body2">{billingLocation?.postalCode}</Typography>
            <Typography variant="body2">{billingLocation?.country}</Typography>
          </Grid>
          <Grid item xs={12}>
            <button className={buttonStyles.button} style={{ marginBottom: '30px' }} onClick={() => onConfirmPurchase(artworkDetails?.price)}>
              Confirm Purchase
            </button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PurchaseReviewForm;
