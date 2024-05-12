// my-gallery/src/components/forms/LocationFormDelivery.tsx

import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Typography } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { Autocomplete } from '@react-google-maps/api';

interface LocationFormDeliveryProps {
  location: Location;
  onSubmit: (location: Location) => void;
  onCancel: () => void;
  isRequired?: boolean;
  isNewLocation?: boolean;
  isEditing: boolean;
}

export interface Location {
  locationId: number;
  businessName?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  locationType: string;
  customLocationType?: string;
  isNewLocation?: boolean;
}

const LocationFormDelivery: React.FC<LocationFormDeliveryProps> = ({ location, onSubmit, onCancel, isRequired = false, isNewLocation = false, isEditing }) => {
    const [formData, setFormData] = useState({
      locationId: location.locationId || 0,
      businessName: location.businessName || '',
      addressLine1: location.addressLine1 || '',
      addressLine2: location.addressLine2 || '',
      city: location.city || '',
      stateProvince: location.stateProvince || '',
      postalCode: location.postalCode || '',
      country: location.country || '',
      locationType: location.locationType || '',
      customLocationType: location.customLocationType || '',
      isNewLocation: isNewLocation,
    });

  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);

  const handleAddressSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.address_components) {
        const addressComponents = place.address_components;
        const addressDetails = {
          addressLine1: '',
          addressLine2: '',
          businessName: formData.locationType !== 'Home' ? place.name || '' : '', // Clear businessName for 'Home' type
          city: '',
          stateProvince: '',
          postalCode: '',
          country: '',
        };
  
        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes('street_number')) {
            addressDetails.addressLine1 = component.long_name;
          } else if (types.includes('route')) {
            addressDetails.addressLine1 += ` ${component.long_name}`;
          } else if (types.includes('subpremise')) {
            addressDetails.addressLine2 = component.long_name;
          } else if (types.includes('locality')) {
            addressDetails.city = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            addressDetails.stateProvince = component.long_name;
          } else if (types.includes('postal_code')) {
            addressDetails.postalCode = component.long_name;
          } else if (types.includes('country')) {
            addressDetails.country = component.long_name;
          }
        });
  
        setFormData((prevData) => ({
          ...prevData,
          addressLine1: addressDetails.addressLine1,
          addressLine2: addressDetails.addressLine2,
          businessName: addressDetails.businessName,
          city: addressDetails.city,
          stateProvince: addressDetails.stateProvince,
          postalCode: addressDetails.postalCode,
          country: addressDetails.country,
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof Location]: value as string,
      businessName: name === 'locationType' && value === 'Home' ? '' : prevData.businessName, // Clear businessName when 'Home' is selected
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: isEditing ? '#f5f5f5' : '#ffffff' }}>
      <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '10px' }}>
            What type of location is it?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>
            <FormControl fullWidth margin="normal" style={{ width: '300px' }}>
              <Select
                className={buttonStyles.formfieldmedium}
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
                required={isRequired}
                displayEmpty // Add this prop to enable the placeholder
              >
                <MenuItem value="" disabled>Select an option</MenuItem>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Museum">Museum</MenuItem>
                <MenuItem value="Gallery">Gallery</MenuItem>
                <MenuItem value="Storage Facility">Storage Facility</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>

        {formData.locationType && (
          <>
            {formData.locationType === 'Other' && (
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px', marginBottom: '20px' }}>
                <TextField
                  className={buttonStyles.formfieldmedium}
                  label="Please specify the type of location..."
                  name="customLocationType"
                  value={formData.customLocationType || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Autocomplete
                onLoad={(autocomplete) => {
                  console.log('Autocomplete loaded');
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handleAddressSelect}
              >
                <TextField
                  style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                  className={buttonStyles.formfieldmedium}
                  label="Address"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required={isRequired}
                  fullWidth
                  InputLabelProps={{ shrink: formData.addressLine1 !== '' }}
                />
              </Autocomplete>
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <TextField
                className={buttonStyles.formfieldmedium}
                label="Apartment, Suite, Unit, Building (Optional)"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: formData.addressLine2 !== '' }}
              />
            </Grid>

            {formData.locationType !== 'Home' && (
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <TextField
                  className={buttonStyles.formfieldmedium}
                  label="Business Name"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: formData.businessName !== '' }}
                />
              </Grid>
            )}

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <TextField
                className={buttonStyles.formfieldmedium}
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required={isRequired}
                fullWidth
                InputLabelProps={{ shrink: formData.city !== '' }}
              />
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <TextField
                className={buttonStyles.formfieldmedium}
                label="State/Province"
                name="stateProvince"
                value={formData.stateProvince}
                onChange={handleChange}
                required={isRequired}
                fullWidth
                InputLabelProps={{ shrink: formData.stateProvince !== '' }}
              />
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <TextField
                className={buttonStyles.formfieldmedium}
                label="Postal Code/Zip Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required={isRequired}
                fullWidth
                InputLabelProps={{ shrink: formData.postalCode !== '' }}
              />
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <TextField
                className={buttonStyles.formfieldmedium}
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required={isRequired}
                fullWidth
                InputLabelProps={{ shrink: formData.country !== '' }}
              />
            </Grid>
          </>
        )}
      </Grid>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
        <button type="submit" className={buttonStyles.button}>
          Save Location
        </button>
        {isNewLocation && (
          <button type="button" className={buttonStyles.button} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default LocationFormDelivery;