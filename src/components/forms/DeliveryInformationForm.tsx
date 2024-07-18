// my-gallery/src/components/forms/DeliveryInformationForm.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Typography, SelectChangeEvent, TextField, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import LocationFormPurchase, { Location } from './LocationFormPurchase';
import buttonStyles from '../../screens/ButtonStyles.module.css';

export interface DeliveryLocation {
  locationId: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  locationType: string;
  businessName?: string;
}

interface DeliveryInformationFormProps {
  userId: number;
  onSubmit: (deliveryLocation: Location) => void;
  isActive: boolean;
  buyerInfo: any;
  collectorInfo: any;
  className?: string;
}

const DeliveryInformationForm: React.FC<DeliveryInformationFormProps> = ({ userId, onSubmit, isActive, buyerInfo, collectorInfo, className }) => {
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryRecipient, setDeliveryRecipient] = useState('');
  const [otherRecipientInfo, setOtherRecipientInfo] = useState({ name: '', phoneNumber: '' });
  const [isEditingRecipient, setIsEditingRecipient] = useState(false);

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  const fetchSavedLocations = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/locations`);
      console.log('Saved locations response:', response.data);
      const formattedLocations = response.data.map((location: any) => location.Location);
      setSavedLocations(formattedLocations);
    } catch (error) {
      console.error('Error fetching saved locations:', error);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsEditing(false);
    onSubmit(location);
  };

  const handleAddNewLocation = () => {
    setSelectedLocation(null);
    setIsEditing(true);
  };

  const handleCancelNewLocation = () => {
    setSelectedLocation(null);
    setIsEditing(false);
  };

  const handleLocationSubmit = async (location: Location) => {
    try {
      let updatedLocation;
      if (location.locationId) {
        // Update existing location
        const response = await axios.put(`/api/users/${userId}/locations/${location.locationId}`, {
          locationData: location,
        });
        console.log('Updated location response:', response.data);
        updatedLocation = response.data;
      } else {
        // Create new location
        const response = await axios.post(`/api/users/${userId}/locations`, { locationData: location });
        console.log('New location response:', response.data);
        updatedLocation = response.data;
      }

      console.log('Updated location data:', updatedLocation);

      if (updatedLocation) {
        setSelectedLocation(updatedLocation);
        setIsEditing(false);
        onSubmit(updatedLocation);
        fetchSavedLocations();
      } else {
        console.error('Invalid location data:', updatedLocation);
        // Display an error message to the user
        alert('Failed to save the location. Please try again.');
      }
    } catch (error) {
      console.error('Error saving location:', error);
      // Display an error message to the user
      alert('An error occurred while saving the location. Please try again.');
    }
  };

  const handleEditLocation = () => {
    if (selectedLocation) {
      setIsEditing(true);
    }
  };

  const handleDeliveryRecipientChange = (event: SelectChangeEvent<string>) => {
    setDeliveryRecipient(event.target.value as string);
    if (event.target.value === 'other') {
      setIsEditingRecipient(true);
    }
  };

  const handleOtherRecipientInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherRecipientInfo({
      ...otherRecipientInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditRecipient = () => {
    setIsEditingRecipient(true);
  };

  const handleSaveRecipient = () => {
    setIsEditingRecipient(false);
  };

  const handleCancelRecipient = () => {
    setDeliveryRecipient('');
    setIsEditingRecipient(false);
    setOtherRecipientInfo({ name: '', phoneNumber: '' });
  };

  const getRecipientInfo = (recipient: string) => {
    const info = recipient === 'buyer' ? buyerInfo : collectorInfo;

    if (info.entityType === 'Person') {
      return {
        name: `${info.firstName} ${info.middleName} ${info.lastName}`,
        phone: info.primaryPhone,
      };
    } else if (info.entityType === 'Organization') {
      return {
        name: info.organizationName,
        phone: info.primaryPhone,
        contactPerson: info.contactPersonName,
      };
    }

    return null;
  };

  return (
    <div className={className} style={{ backgroundColor: isEditing || !selectedLocation ? '#f5f5f5' : '#ffffff', padding: '20px' }}>
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
        <strong>Step 2: Delivery Information</strong>
      </Typography>
      {isActive && (
        <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
          {!deliveryRecipient ? (
            <>
              <Grid item xs={12}>
                <Typography variant="body1">Who are we delivering the artwork to?</Typography>
              </Grid>
              <Grid item xs={6}>
                <Select value={deliveryRecipient} onChange={handleDeliveryRecipientChange} displayEmpty fullWidth>
                  <MenuItem value="" disabled>
                    Select Delivery Recipient
                  </MenuItem>
                  {buyerInfo && <MenuItem value="buyer">Buyer</MenuItem>}
                  {collectorInfo && <MenuItem value="collector">Collector</MenuItem>}
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </Grid>
            </>
          ) : (
            <>
              {!isEditingRecipient ? (
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Delivery Recipient:</strong>
                  </Typography>
                  {['buyer', 'collector'].includes(deliveryRecipient) && (
                    <>
                      {getRecipientInfo(deliveryRecipient)?.name && (
                        <Typography variant="body2">{getRecipientInfo(deliveryRecipient)?.name}</Typography>
                      )}
                      {getRecipientInfo(deliveryRecipient)?.phone && (
                        <Typography variant="body2">{getRecipientInfo(deliveryRecipient)?.phone}</Typography>
                      )}
                      {getRecipientInfo(deliveryRecipient)?.contactPerson && (
                        <Typography variant="body2">Contact Person: {getRecipientInfo(deliveryRecipient)?.contactPerson}</Typography>
                      )}
                    </>
                  )}
                  {deliveryRecipient === 'other' && (
                    <>
                      <Typography variant="body2">{otherRecipientInfo.name}</Typography>
                      <Typography variant="body2">{otherRecipientInfo.phoneNumber}</Typography>
                    </>
                  )}
                  <Grid item xs={12} style={{ marginTop: '20px' }}>
                    <button className={buttonStyles.buttonLarge} onClick={handleEditRecipient}>
                      Edit Recipient
                    </button>
                    <button className={buttonStyles.buttonLarge} onClick={() => setDeliveryRecipient('')}>
                      Change Recipient
                    </button>
                  </Grid>
                </Grid>
              ) : (
                <>
                  {deliveryRecipient === 'other' && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          label="Recipient Name"
                          name="name"
                          value={otherRecipientInfo.name}
                          onChange={handleOtherRecipientInfoChange}
                          fullWidth
                          required
                          style={{ marginBottom: '20px' }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Recipient Phone Number"
                          name="phoneNumber"
                          value={otherRecipientInfo.phoneNumber}
                          onChange={handleOtherRecipientInfoChange}
                          fullWidth
                          required
                          style={{ marginBottom: '20px' }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <button className={buttonStyles.button} onClick={handleSaveRecipient}>
                          Save
                        </button>
                        <button className={buttonStyles.button} onClick={handleCancelRecipient}>
                          Cancel
                        </button>
                      </Grid>
                    </>
                  )}
                  {(deliveryRecipient === 'buyer' || deliveryRecipient === 'collector') && (
                    <Grid item xs={12}>
                      <TextField
                        label="Recipient Name"
                        name="name"
                        value={
                          deliveryRecipient === 'buyer'
                            ? `${buyerInfo.firstName} ${buyerInfo.middleName} ${buyerInfo.lastName}`
                            : `${collectorInfo.firstName} ${collectorInfo.middleName} ${collectorInfo.lastName}`
                        }
                        onChange={handleOtherRecipientInfoChange}
                        fullWidth
                        required
                        style={{ marginBottom: '20px' }}
                      />
                      <TextField
                        label="Recipient Phone Number"
                        name="phoneNumber"
                        value={deliveryRecipient === 'buyer' ? buyerInfo.primaryPhone : collectorInfo.primaryPhone}
                        onChange={handleOtherRecipientInfoChange}
                        fullWidth
                        required
                        style={{ marginBottom: '20px' }}
                      />
                      <Grid item xs={12}>
                        <button className={buttonStyles.button} onClick={handleSaveRecipient}>
                          Save
                        </button>
                        <button className={buttonStyles.button} onClick={handleCancelRecipient}>
                          Cancel
                        </button>
                      </Grid>
                    </Grid>
                  )}
                </>
              )}
            </>
          )}
          {deliveryRecipient && !isEditingRecipient && (
            <>
              {selectedLocation && !isEditing ? (
                <>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Selected Delivery Address:</strong>
                    </Typography>
                    <Typography variant="body2">{selectedLocation?.businessName || ''}</Typography>
                    <Typography variant="body2">{selectedLocation.addressLine1}</Typography>
                    {selectedLocation.addressLine2 && <Typography variant="body2">{selectedLocation.addressLine2}</Typography>}
                    <Typography variant="body2">
                      {selectedLocation.city}, {selectedLocation.stateProvince}
                    </Typography>
                    <Typography variant="body2">{selectedLocation.postalCode}</Typography>
                    <Typography variant="body2">{selectedLocation.country}</Typography>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: '30px' }}>
                    <button className={buttonStyles.buttonLarge} onClick={handleEditLocation}>
                      Edit Location
                    </button>
                    <button className={buttonStyles.buttonLarge} onClick={() => setSelectedLocation(null)}>
                      Change Location
                    </button>
                  </Grid>
                </>
              ) : (
                <>
                  {!isEditing && savedLocations.length > 0 ? (
                    <>
                      <Grid item xs={12} style={{ marginTop: '20px'}}>
                        <Typography variant="body1"><strong>Would you like to deliver to one of your existing saved locations?</strong></Typography>
                      </Grid>
                      <Grid container item xs={12} spacing={3} justifyContent="center">
                        {savedLocations.map((savedLocation, index) => (
                          <Grid item xs={6} key={savedLocation.locationId}>
                            <button className={buttonStyles.buttonSelection} onClick={() => handleLocationSelect(savedLocation)}>
                              <div>
                                <Typography variant="body2">{savedLocation.businessName}</Typography>
                                <Typography variant="body2">{savedLocation.addressLine1}</Typography>
                                {savedLocation.addressLine2 && <Typography variant="body2">{savedLocation.addressLine2}</Typography>}
                                <Typography variant="body2">
                                  {savedLocation.city}, {savedLocation.stateProvince}
                                </Typography>
                                <Typography variant="body2">{savedLocation.postalCode}</Typography>
                                <Typography variant="body2">{savedLocation.country}</Typography>
                              </div>
                            </button>
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <button
                            className={buttonStyles.buttonLarge}
                            style={{ marginTop: '20px', marginBottom: '30px' }}
                            onClick={handleAddNewLocation}
                          >
                            Add New Address
                          </button>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <LocationFormPurchase
                        location={selectedLocation || ({} as Location)}
                        onSubmit={handleLocationSubmit}
                        onCancel={handleCancelNewLocation}
                        isRequired={true}
                        isNewLocation={!selectedLocation}
                        isEditing={isEditing}
                      />
                    </Grid>
                  )}
                </>
              )}
            </>
          )}
        </Grid>
      )}
    </div>
  );
};

export default DeliveryInformationForm;
