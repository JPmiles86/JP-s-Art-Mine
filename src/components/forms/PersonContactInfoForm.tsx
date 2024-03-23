// my-gallery/src/components/forms/PersonContactInfoForm.tsx

import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

interface UserData {
  userId?: number;
  email?: string;
  username?: string;
  isAnonymous?: boolean;
  profilePhotoUrl?: string;
}

interface PersonContactInfoFormProps {
  userData: UserData | null;
  personContactInfo: PersonalContactInfo;
  onSubmit: (personContactInfo: PersonalContactInfo) => void;
  isRequired?: boolean;
  isFormModified: boolean;
  setIsFormModified: (isModified: boolean) => void;
}

export interface PersonalContactInfo {
  personContactId: number;
  entityId: number;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  profession?: string;
  locationId?: number;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  relationshipToArtist?: string;
}

const PersonContactInfoForm: React.FC<PersonContactInfoFormProps> = ({
  userData,
  personContactInfo,
  onSubmit,
  isRequired = false,
  isFormModified,
  setIsFormModified,
}) => {
  console.log('PersonContactInfoForm props:', { userData, personContactInfo });
  
  const [formData, setFormData] = useState({
    ...personContactInfo,
    primaryEmail: userData?.email || personContactInfo?.primaryEmail || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const normalizedValue = name === 'primaryEmail' || name === 'secondaryEmail' ? value.toLowerCase() : value;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name as keyof PersonalContactInfo]: value as string,
      };
      setIsFormModified(true);
            return updatedData;
    });
  };

 // const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 //   const { name, value } = e.target;
 //   const phoneNumber = parsePhoneNumberFromString(value);
 //   if (phoneNumber && phoneNumber.isValid()) {
 //     setFormData((prevData) => ({
 //       ...prevData,
 //       [name as keyof PersonalContactInfo]: phoneNumber.format('E.164') as string,
 //     }));
 //   }
 // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Preferred Name" name="preferredName" value={formData.preferredName} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Primary Email" name="primaryEmail" type="email" value={formData.primaryEmail} onChange={handleChange} required={isRequired} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Secondary Email" name="secondaryEmail" type="email" value={formData.secondaryEmail} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Primary Phone" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Secondary Phone" name="secondaryPhone" value={formData.secondaryPhone} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Profession" name="profession" value={formData.profession} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Relationship to Artist" name="relationshipToArtist" value={formData.relationshipToArtist} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Twitter" name="twitter" value={formData.twitter} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="LinkedIn" name="linkedIn" value={formData.linkedIn} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Website" name="website" value={formData.website} onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        {isFormModified && (
          <Grid item xs={12} display="flex" justifyContent="center">
            <button type="submit" className={buttonStyles.button}>
              Save
            </button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default PersonContactInfoForm;