// my-gallery/src/components/forms/PurchaseReviewForm.tsx

import React from 'react';
import { Grid, Typography } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { formatDimensions } from '../../utils/formatDimensions';

interface PurchaseReviewFormProps {
  buyerInfo: any;
  collectorInfo: any;
  deliveryLocation: any;
  billingLocation: any;
  artworkDetails: any;
  onConfirmPurchase: (artworkPrice: number) => void; // Add artworkPrice parameter
  isActive: boolean;
  className?: string;
}

const PurchaseReviewForm: React.FC<PurchaseReviewFormProps> = ({
  buyerInfo,
  collectorInfo,
  deliveryLocation,
  billingLocation,
  artworkDetails,
  onConfirmPurchase,
  isActive,
  className,
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
    <div className={className} style={{ backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '30px' }}>
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
            <Typography variant="body2"><strong>Artist:</strong> J.P. Miles</Typography>
            <Typography variant="body2"><strong>Photo ID:</strong> {artworkDetails?.photoId}</Typography>
            <Typography variant="body2"><strong>Artwork ID:</strong> {artworkDetails?.artworkId}</Typography>
            <Typography variant="body2"><strong>Diptych Variation:</strong> {artworkDetails?.diptychName}</Typography>
            <Typography variant="body2"><strong>Edition:</strong> {artworkDetails?.edition === 'CP' ? "Collector's Print - 1/1" : "Artist's Print - 1/1"}</Typography>
            <br></br>
            <Typography variant="body2"><strong>Artwork Size:</strong> {artworkDetails?.sizeName}</Typography>
            <Typography variant="body2"><strong>Print Size (inches):</strong> {formatDimensions(artworkDetails?.printSizeInInches)}</Typography>
            <Typography variant="body2"><strong>Print Size (cm):</strong> {formatDimensions(artworkDetails?.printSizeInCm)}</Typography>
            <br></br>
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
            <button className={buttonStyles.button} style={{ marginBottom: '15px' }} onClick={() => onConfirmPurchase(artworkDetails?.price)}>
              Confirm Purchase
            </button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PurchaseReviewForm;
