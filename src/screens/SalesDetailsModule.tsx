// my-gallery/src/screens/SalesDetailsModule.tsx

import React from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';

interface PersonInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  primaryEmail: string;
  primaryPhone: string;
}

interface OrganizationInfo {
  organizationName: string;
  contactPersonName: string;
  primaryEmail: string;
  primaryPhone: string;
}

interface DeliveryLocation {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

interface SaleDetails {
  buyerInfo: PersonInfo | OrganizationInfo;
  collectorInfo: PersonInfo | OrganizationInfo;
  deliveryLocation: DeliveryLocation;
  saleDate: string;
  salePrice: number;
  paymentMethod: string;
}

interface SalesDetailsModuleProps {
  saleDetails: SaleDetails;
}

const SalesDetailsModule: React.FC<SalesDetailsModuleProps> = ({ saleDetails }) => {
    console.log('SalesDetailsModule saleDetails:', saleDetails);
    if (!saleDetails) {
      return <Typography>Sale details are not available.</Typography>;
    }
  
    const {
      buyerInfo,
      collectorInfo,
      deliveryLocation,
      saleDate,
      salePrice,
      paymentMethod,
    } = saleDetails;   
  
    const formatDate = (dateString: string): string => {
      if (!dateString) return 'Not available';
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const formatPrice = (price: any): string => {
      if (typeof price === 'number') {
        return `$${price.toFixed(2)}`;
      } else if (typeof price === 'string' && !isNaN(parseFloat(price))) {
        return `$${parseFloat(price).toFixed(2)}`;
      }
      return 'Not available';
    };
  
    const renderPersonInfo = (info: PersonInfo) => (
      <>
        <Typography><strong>Name:</strong> {`${info.firstName || ''} ${info.middleName || ''} ${info.lastName || ''}`.trim() || 'Not available'}</Typography>
        <Typography><strong>Email:</strong> {info.primaryEmail || 'Not available'}</Typography>
        <Typography><strong>Phone:</strong> {info.primaryPhone || 'Not available'}</Typography>
      </>
    );
  
    const renderOrganizationInfo = (info: OrganizationInfo) => (
      <>
        <Typography><strong>Organization:</strong> {info.organizationName || 'Not available'}</Typography>
        <Typography><strong>Contact Person:</strong> {info.contactPersonName || 'Not available'}</Typography>
        <Typography><strong>Email:</strong> {info.primaryEmail || 'Not available'}</Typography>
        <Typography><strong>Phone:</strong> {info.primaryPhone || 'Not available'}</Typography>
      </>
    );
  
    const isPersonInfo = (info: PersonInfo | OrganizationInfo): info is PersonInfo => {
      return info && 'firstName' in info;
    };
  
    const renderInfo = (info: PersonInfo | OrganizationInfo | null | undefined) => {
      if (!info) {
        return <Typography>Information not available</Typography>;
      }
      return isPersonInfo(info) ? renderPersonInfo(info) : renderOrganizationInfo(info);
    };
  
    return (
        <Box mt={4} style={{ backgroundColor: '#f5f5f5', padding: '16px', marginBottom: '30px' }}>
          <Typography variant="h5" gutterBottom>
            <strong>Sales Details</strong>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <Typography variant="h6">Buyer Information</Typography>
                {renderInfo(buyerInfo)}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <Typography variant="h6">Collector Information</Typography>
                {renderInfo(collectorInfo)}
              </Box>
            </Grid>
            {deliveryLocation && (
              <Grid item xs={12}>
                <Divider />
                <Box my={2}>
                  <Typography variant="h6">Delivery Information</Typography>
                  <Typography><strong>Address:</strong> {deliveryLocation.addressLine1}</Typography>
                  {deliveryLocation.addressLine2 && <Typography>{deliveryLocation.addressLine2}</Typography>}
                  <Typography>{`${deliveryLocation.city}, ${deliveryLocation.stateProvince} ${deliveryLocation.postalCode}`}</Typography>
                  <Typography>{deliveryLocation.country}</Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider />
              <Box my={2}>
                <Typography variant="h6">Transaction Details</Typography>
                <Typography><strong>Sale Date:</strong> {formatDate(saleDate)}</Typography>
                <Typography><strong>Sale Price:</strong> {formatPrice(salePrice)}</Typography>
                <Typography><strong>Payment Method:</strong> {paymentMethod || 'Not available'}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    };
    
    export default SalesDetailsModule;