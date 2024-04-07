// my-gallery/src/components/forms/LocationForm.tsx

import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Typography } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { Autocomplete } from '@react-google-maps/api';



interface LocationFormProps {
  location: Location;
  onSubmit: (location: Location) => void;
  onRemove?: () => void;
  isRequired?: boolean;
  locationIndex: number;
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
}

const LocationForm: React.FC<LocationFormProps> = ({ location, onSubmit, onRemove, isRequired = false, locationIndex }) => {
  const [isFormModified, setIsFormModified] = useState(false);
  const [formData, setFormData] = useState({
    ...location,
    locationType: location.locationType || '',
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
          businessName: place.name || '',
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
        setIsFormModified(true);
      }
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof Location]: value as string,
    }));
    setIsFormModified(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const locationData = {
      ...formData,
      locationType: formData.locationType === 'Other' ? 'Other' : formData.locationType,
      customLocationType: formData.locationType === 'Other' ? formData.customLocationType : undefined,
    };
    onSubmit(locationData);
    setIsFormModified(false); 
  };

  
  
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
      <strong>Location #{locationIndex}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <FormControl fullWidth margin="normal" style={{ marginLeft: '10px', marginBottom: '20px' }}>
        <InputLabel>What kind of location is it?</InputLabel>
        <Select
          className={buttonStyles.formfieldmedium}
          name="locationType"
          value={formData.locationType}
          onChange={handleChange}
          required={isRequired}
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
      {formData.locationType === 'Other' && (
        <Grid item xs={12}>
          <TextField
            className={buttonStyles.formfieldmedium}
            label="What kind of location is it?"
            name="customLocationType"
            value={formData.customLocationType || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
      )}
          <Autocomplete
            onLoad={(autocomplete) => {
              console.log('Autocomplete loaded');
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handleAddressSelect}
          >
            <TextField
              className={buttonStyles.formfieldlarge}
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
        <Grid item xs={12}>
          <TextField
            className={buttonStyles.formfieldlarge}
            label="Apartment, Suite, Unit, Building (Optional)"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: formData.addressLine2 !== '' }}
          />
        </Grid>
        <Grid item xs={12}>
          {formData.locationType !== 'Home' && (
            <TextField
              className={buttonStyles.formfieldlarge}
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: formData.businessName !== '' }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
      </Grid>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        {onRemove && (
          <button type="button" className={buttonStyles.button} style={{ marginRight: '0px' }} onClick={onRemove}>
            Remove
          </button>
        )}
        {isFormModified && (
          <button type="submit" className={buttonStyles.button}>
            Save Location(s)
          </button>
        )}
      </div>
    </form>
  );
};

export default LocationForm;