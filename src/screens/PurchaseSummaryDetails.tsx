// my-gallery/src/screens/PurchaseSummaryDetails.tsx

import React from 'react';
import { Typography, Box } from '@mui/material';

interface PurchaseSummaryDetailsProps {
  buyerInfo: any;
  collectorInfo: any;
  deliveryLocation: any;
}

const PurchaseSummaryDetails: React.FC<PurchaseSummaryDetailsProps> = ({ buyerInfo, collectorInfo, deliveryLocation }) => {
  console.log('PurchaseSummaryDetails props:', { buyerInfo, collectorInfo, deliveryLocation });
  console.log('Buyer Info:', buyerInfo);
  console.log('Collector Info:', collectorInfo);
  console.log('Delivery Location:', deliveryLocation);
  
  if (!buyerInfo && !collectorInfo && !deliveryLocation) {
    return <Typography>No purchase details available.</Typography>;
  }
  
    const getPersonName = (info: any) => `${info.firstName} ${info.middleName || ''} ${info.lastName}`;
  
    const getOrganizationInfo = (info: any) => (
      <>
        <Typography variant="body2">Organization: {info.organizationName}</Typography>
        <Typography variant="body2">Contact Person: {info.contactPersonName}</Typography>
      </>
    );
  
    return (
      <Box mt={4} style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          <strong>Purchase Summary</strong>
        </Typography>
        <Box mt={2}>
          <Typography variant="h6">Buyer Information:</Typography>
          {buyerInfo ? (
            buyerInfo.entityType === 'Person' ? (
              <>
                <Typography variant="body2">{getPersonName(buyerInfo)}</Typography>
                <Typography variant="body2">{buyerInfo.primaryEmail}</Typography>
                <Typography variant="body2">{buyerInfo.primaryPhone}</Typography>
              </>
            ) : (
              getOrganizationInfo(buyerInfo)
            )
          ) : (
            <Typography>No buyer information available.</Typography>
          )}
        </Box>
        {collectorInfo && (
          <Box mt={2}>
            <Typography variant="h6">Collector Information:</Typography>
            {collectorInfo.entityType === 'Person' ? (
              <>
                <Typography variant="body2">{getPersonName(collectorInfo)}</Typography>
                <Typography variant="body2">{collectorInfo.primaryEmail}</Typography>
                <Typography variant="body2">{collectorInfo.primaryPhone}</Typography>
              </>
            ) : (
              getOrganizationInfo(collectorInfo)
            )}
          </Box>
        )}
        <Box mt={2}>
          <Typography variant="h6">Delivery Address:</Typography>
          {deliveryLocation ? (
            <>
              <Typography variant="body2">{deliveryLocation.businessName || ''}</Typography>
              <Typography variant="body2">{deliveryLocation.addressLine1}</Typography>
              {deliveryLocation.addressLine2 && <Typography variant="body2">{deliveryLocation.addressLine2}</Typography>}
              <Typography variant="body2">
                {deliveryLocation.city}, {deliveryLocation.stateProvince}
              </Typography>
              <Typography variant="body2">{deliveryLocation.postalCode}</Typography>
              <Typography variant="body2">{deliveryLocation.country}</Typography>
            </>
          ) : (
            <Typography>No delivery address available.</Typography>
          )}
        </Box>
        {collectorInfo && collectorInfo.newCollectorCreated && (
          <Box mt={2}>
            <Typography variant="body2" style={{ marginTop: '10px', marginBottom: '30px' }}>
              <strong>Please Note: An account has been created for the collector.</strong>
              <br />
              <strong>Log in:</strong> {collectorInfo.primaryEmail}
              <br />
              <strong>Password:</strong> {buyerInfo.primaryEmail}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };
  
  export default PurchaseSummaryDetails;
  