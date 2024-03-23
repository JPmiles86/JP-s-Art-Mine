// my-gallery/src/components/forms/LocationForm.tsx

import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface LocationFormProps {
  location: Location;
  onSubmit: (location: Location) => void;
  onRemove?: () => void;
  isRequired?: boolean;
}

export interface Location {
  locationId: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  locationType: string; // 'Home', 'Business', 'Other'
}

const LocationForm: React.FC<LocationFormProps> = ({ location, onSubmit, onRemove, isRequired = false }) => {
  const [formData, setFormData] = useState(location);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof Location]: value as string,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={buttonStyles.formfieldlarge}
        label="Address Line 1"
        name="AddressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
        required={isRequired}
        fullWidth
        margin="normal"
      />
      <TextField
        className={buttonStyles.formfieldlarge}
        label="Address Line 2"
        name="AddressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        className={buttonStyles.formfieldmedium}
        label="City"
        name="City"
        value={formData.city}
        onChange={handleChange}
        required={isRequired}
        fullWidth
        margin="normal"
      />
      <TextField
        className={buttonStyles.formfieldmedium}
        label="State/Province"
        name="StateProvince"
        value={formData.stateProvince}
        onChange={handleChange}
        required={isRequired}
        fullWidth
        margin="normal"
      />
      <TextField
        className={buttonStyles.formfieldmedium}
        label="Postal Code"
        name="PostalCode"
        value={formData.postalCode}
        onChange={handleChange}
        required={isRequired}
        fullWidth
        margin="normal"
      />
      <TextField
        className={buttonStyles.formfieldmedium}
        label="Country"
        name="Country"
        value={formData.country}
        onChange={handleChange}
        required={isRequired}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Location Type</InputLabel>
        <Select
          className={buttonStyles.formfieldmedium}
          name="LocationType"
          value={formData.locationType}
          onChange={handleChange}
          required={isRequired}
        >
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <div>
        <button type="submit" className={buttonStyles.button}>
          Save
        </button>
        {onRemove && (
          <button type="button" className={buttonStyles.button} onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
    </form>
  );
};

export default LocationForm;