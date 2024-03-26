// my-gallery/src/components/forms/LocationForm.tsx

import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Typography } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface LocationFormProps {
  location: Location;
  onSubmit: (location: Location) => void;
  onRemove?: () => void;
  isRequired?: boolean;
  locationIndex: number;
}

export interface Location {
  locationId: number;
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
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Location #{locationIndex}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={buttonStyles.formfieldlarge}
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required={isRequired}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={buttonStyles.formfieldlarge}
            label="Address Line 2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={buttonStyles.formfieldmedium}
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required={isRequired}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={buttonStyles.formfieldmedium}
            label="State/Province"
            name="stateProvince"
            value={formData.stateProvince}
            onChange={handleChange}
            required={isRequired}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={buttonStyles.formfieldmedium}
            label="Postal Code/Zip Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required={isRequired}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={buttonStyles.formfieldmedium}
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required={isRequired}
            fullWidth
          />
        </Grid>
      </Grid>
      <FormControl fullWidth margin="normal" style={{ marginLeft: '10px' }}>
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
      <div>
        {onRemove && (
          <button type="button" className={buttonStyles.button} style={{ marginBottom: '10px' }} onClick={onRemove}>
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