// my-gallery/src/components/forms/DeliveryInformationForm.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import LocationFormDelivery, { Location } from './LocationFormDelivery';
// import LocationDeliveryForm, { Location } from './LocationDeliveryForm';
// import LocationForm from './LocationForm';
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
}

const DeliveryInformationForm: React.FC<DeliveryInformationFormProps> = ({ userId, onSubmit }) => {
    const [savedLocations, setSavedLocations] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [isEditing, setIsEditing] = useState(false);
  
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

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '0px' }}>
      <Typography variant="h6" style={{ backgroundColor: '#000000', color: '#ffffff', padding: '20px', justifyContent: 'center', textAlign: 'center' }}>
        <strong>Delivery Information</strong>
      </Typography>
      <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
        {selectedLocation && !isEditing ? (
          <>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Selected Delivery Location:</strong></Typography>
              <Typography variant="body2">{selectedLocation?.businessName || ''}</Typography>
              <Typography variant="body2">{selectedLocation.addressLine1}</Typography>
              {selectedLocation.addressLine2 && <Typography variant="body2">{selectedLocation.addressLine2}</Typography>}
              <Typography variant="body2">{selectedLocation.city}, {selectedLocation.stateProvince}</Typography>
              <Typography variant="body2">{selectedLocation.postalCode}</Typography>
              <Typography variant="body2">{selectedLocation.country}</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <button className={buttonStyles.buttonLarge} onClick={handleEditLocation}>Edit Location</button>
              <button className={buttonStyles.buttonLarge} onClick={() => { setSelectedLocation(null); setIsEditing(false); }}>
                Change Location
              </button>
            </Grid>
          </>
        ) : (
          <>
            {!isEditing && savedLocations.length > 0 ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="body1">Would you like to deliver to one of your existing saved locations?</Typography>
                </Grid>
                <Grid container item xs={12} spacing={3} justifyContent="center">
                  {savedLocations.map((savedLocation, index) => (
                    <Grid item xs={6} key={savedLocation.locationId}>
                      <button className={buttonStyles.buttonSelection} onClick={() => handleLocationSelect(savedLocation)}>
                        <div>
                          <Typography variant="body2">{savedLocation.businessName}</Typography>
                          <Typography variant="body2">{savedLocation.addressLine1}</Typography>
                          {savedLocation.addressLine2 && <Typography variant="body2">{savedLocation.addressLine2}</Typography>}
                          <Typography variant="body2">{savedLocation.city}, {savedLocation.stateProvince}</Typography>
                          <Typography variant="body2">{savedLocation.postalCode}</Typography>
                          <Typography variant="body2">{savedLocation.country}</Typography>
                        </div>
                      </button>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <button className={buttonStyles.buttonLarge} style={{ marginTop: '20px', marginBottom: '30px' }} onClick={handleAddNewLocation}>
                      Add New Address
                    </button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <LocationFormDelivery
                  location={selectedLocation || {} as Location}
                  onSubmit={handleLocationSubmit}
                  isRequired={true}
                  isNewLocation={!selectedLocation}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
}

export default DeliveryInformationForm;