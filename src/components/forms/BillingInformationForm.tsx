// my-gallery/src/components/forms/BillingInformationForm.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Typography, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import LocationFormPurchase, { Location } from './LocationFormPurchase';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface BillingInformationFormProps {
  userId: number;
  onSubmit: (billingLocation: Location) => void;
  isActive: boolean;
  deliveryLocation: Location | null;
}

export interface BillingLocation extends Location {
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

const BillingInformationForm: React.FC<BillingInformationFormProps> = ({ userId, onSubmit, isActive, deliveryLocation }) => {
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(deliveryLocation);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

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
    setIsSelecting(false);
    onSubmit(location);
  };

  const handleAddNewLocation = () => {
    setSelectedLocation(null);
    setIsEditing(true);
    setIsSelecting(false);
  };

  const handleCancelNewLocation = () => {
    setSelectedLocation(null);
    setIsEditing(false);
    setIsSelecting(true);
  };

  const handleLocationSubmit = async (location: Location) => {
    console.log('Submitting location:', location);
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
        setIsSelecting(false);
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
      setIsSelecting(false);
    }
  };

  const handleChangeLocation = () => {
    setIsSelecting(true);
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: isEditing || isSelecting || !selectedLocation ? '#f5f5f5' : '#ffffff', padding: '20px' }}>
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
        <strong>Billing Information</strong>
      </Typography>
      {isActive && (
        <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
          {selectedLocation && !isEditing && !isSelecting ? (
            <>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Selected Billing Location:</strong>
                </Typography>
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
                <button className={buttonStyles.buttonLarge} onClick={handleChangeLocation}>
                  Change Location
                </button>
              </Grid>
            </>
          ) : !isEditing && !isSelecting ? (
            <>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Selected Billing Location:</strong>
                </Typography>
                <Typography variant="body2">{deliveryLocation?.addressLine1}</Typography>
                {deliveryLocation?.addressLine2 && <Typography variant="body2">{deliveryLocation.addressLine2}</Typography>}
                <Typography variant="body2">
                  {deliveryLocation?.city}, {deliveryLocation?.stateProvince}
                </Typography>
                <Typography variant="body2">{deliveryLocation?.postalCode}</Typography>
                <Typography variant="body2">{deliveryLocation?.country}</Typography>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '30px' }}>
                <Typography variant="h6">OR</Typography>
              </Grid>
              <Grid item xs={12}>
                <button className={buttonStyles.buttonXLarge} onClick={() => setIsSelecting(true)}>
                  Change Billing Address
                </button>
              </Grid>
            </>
          ) : isSelecting && !isEditing ? (
            <>
              {savedLocations.length > 0 ? (
                <>
                  <Grid item xs={12}>
                    <Typography variant="body1">Would you like to use one of your existing saved billing locations?</Typography>
                  </Grid>
                  <Grid container item xs={12} spacing={3} justifyContent="center">
                    {savedLocations.map((savedLocation, index) => (
                      <Grid item xs={6} key={savedLocation.locationId}>
                        <button className={buttonStyles.buttonSelection} onClick={() => handleLocationSelect(savedLocation)}>
                          <div>
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
                  <Typography variant="body1">No saved billing locations found.</Typography>
                  <button className={buttonStyles.buttonLarge} onClick={handleAddNewLocation}>
                    Add New Address
                  </button>
                </Grid>
              )}
            </>
          ) : isEditing && (
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
        </Grid>
      )}
    </div>
  );
};

export default BillingInformationForm;