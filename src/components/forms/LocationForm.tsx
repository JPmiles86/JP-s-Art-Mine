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
  isNewLocation?: boolean;
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

const LocationForm: React.FC<LocationFormProps> = ({ location, onSubmit, onRemove, isRequired = false, locationIndex, isNewLocation = false }) => {
  const [isEditing, setIsEditing] = useState(isNewLocation);

  //console.log('Rendering LocationForm with isNewLocation:', isNewLocation);
 // console.log('Rendering LocationForm with isEditing:', isEditing);

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
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof Location]: value as string,
    }));
  };
 
  const handleEditClick = () => {
    console.log("Edit clicked: changing isEditing to true");
    setIsEditing(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Submitting data", formData);
      onSubmit(formData);
      console.log("Setting isEditing to false after form submission");
      setIsEditing(false);
    }
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save clicked: submitting data", formData);
    onSubmit(formData);
    console.log("Setting isEditing to false after saving");
    setIsEditing(false);
  };

  const renderFormField = (label: string, name: keyof Location) => {
    const value = formData[name];
    const formattedValue =
      value === undefined
        ? '—'
        : typeof value === 'string'
        ? value.trim() || '—'
        : value;
  
    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography align="right" style={{ fontWeight: 'bold' }}>
            {label}:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="left" style={{ marginLeft: '10px' }}>
            {formattedValue}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>
          <strong>Location #{locationIndex}</strong>
        </Typography>
        {isEditing ? (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>
                <FormControl fullWidth margin="normal" style={{ width: '300px' }}>
                  {/* ... */}
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
            </div>
            {formData.locationType === 'Other' && (
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px', marginBottom: '20px', }}>
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
            <Autocomplete 
              onLoad={(autocomplete) => {
                console.log('Autocomplete loaded');
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handleAddressSelect}
            >
              <TextField style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
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
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {formData.locationType !== 'Home' && (
              <TextField
                className={buttonStyles.formfieldmedium}
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: formData.businessName !== '' }}
              />
            )}
          </Grid>
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
        </Grid>
      ) : (
        <>
          <br />
          <Grid container spacing={2} justifyContent="center">
            {renderFormField('Location Type', 'locationType')}
            {formData.locationType === 'Other' && renderFormField('Custom Location Type', 'customLocationType')}
            {renderFormField('Address', 'addressLine1')}
            {renderFormField('Apartment, Suite, Unit', 'addressLine2')}
            {formData.locationType !== 'Home' && renderFormField('Business Name', 'businessName')}
            {renderFormField('City', 'city')}
            {renderFormField('State/Province', 'stateProvince')}
            {renderFormField('Postal Code/Zip Code', 'postalCode')}
            {renderFormField('Country', 'country')}
          </Grid>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
        {onRemove && (
          <button type="button" className={buttonStyles.button} style={{ marginRight: isEditing ? '0px' : '20px' }} onClick={onRemove}>
            Remove Location
          </button>
        )}
        {isEditing ? (
          <button type="button" className={buttonStyles.button} onClick={handleSaveClick}>
            Save Location
          </button>
        ) : (
          <button type="button" className={buttonStyles.button} onClick={handleEditClick}>
            Edit Location
          </button>
        )}
      </div>
      </div>
    </form>
  );
};

export default LocationForm;