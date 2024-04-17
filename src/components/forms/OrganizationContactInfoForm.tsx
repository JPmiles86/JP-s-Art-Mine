// my-gallery/src/components/forms/OrganizationContactInfoForm.tsx

import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography, SelectChangeEvent, Button } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import axios from 'axios';


interface UserData {
  userId?: number;
  email?: string;
  username?: string;
  isAnonymous?: boolean;
  profilePhotoUrl?: string;
  entityType?: string;
}

interface OrganizationContactInfoFormProps {
  userData: UserData | null;
  organizationContactInfo: OrganizationContactInfo;
  onSubmit: (organizationContactInfo: OrganizationContactInfo) => void;
  isRequired?: boolean;
  isFormModified: boolean;
  setIsFormModified: (isModified: boolean) => void;
}

 export interface OrganizationContactInfo {
  organizationContactId: number;
  userId?: number;
  username?: string;
  organizationName?: string;
  organizationType?: string;
  taxIdNumber?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  locationId?: number;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  contactPersonName?: string;
  contactPersonRole?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
}

interface OrganizationContactInfoFormData extends OrganizationContactInfo {
  [key: string]: any;
}

const OrganizationContactInfoForm: React.FC<OrganizationContactInfoFormProps> = ({
  userData,
  organizationContactInfo,
  onSubmit,
  isRequired = false,
  isFormModified,
  setIsFormModified,
}) => {
  console.log('OrganizationContactInfoForm props:', { userData, organizationContactInfo });

  // const [isFormModified, setIsFormModified] = useState(false);


  const [formData, setFormData] = useState<OrganizationContactInfoFormData>({
    ...organizationContactInfo,
    primaryEmail: userData?.email || organizationContactInfo?.primaryEmail || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const normalizedValue = name === 'primaryEmail' || name === 'secondaryEmail' ? value.toLowerCase() : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormModified(true);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber && phoneNumber.isValid()) {
      setFormData((prevData) => ({
        ...prevData,
        [name as keyof OrganizationContactInfo]: phoneNumber.format('E.164') as string,
      }));
    }
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const organizationContactInfo: OrganizationContactInfo = {
      ...formData,
      userId: userData?.userId,
    };

    onSubmit(organizationContactInfo);
    setIsFormModified(false); // Reset the form modified state after saving
  };

  const isFormUnchanged = JSON.stringify(formData) === JSON.stringify(organizationContactInfo);


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Organization Name */}
        <Grid item xs={12}>
          <TextField
            label="Organization Name"
            name="organizationName"
            value={formData.organizationName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Organization Type */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Organization Type"
            name="organizationType"
            value={formData.organizationType || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Tax ID Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tax ID Number"
            name="taxIdNumber"
            value={formData.taxIdNumber || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Primary Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Primary Email"
            name="primaryEmail"
            value={formData.primaryEmail || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Secondary Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Secondary Email"
            name="secondaryEmail"
            value={formData.secondaryEmail || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Primary Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Primary Phone"
            name="primaryPhone"
            value={formData.primaryPhone || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Secondary Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Secondary Phone"
            name="secondaryPhone"
            value={formData.secondaryPhone || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Instagram */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Instagram"
            name="instagram"
            value={formData.instagram || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Twitter */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Twitter"
            name="twitter"
            value={formData.twitter || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* LinkedIn */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="LinkedIn"
            name="linkedIn"
            value={formData.linkedIn || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Website */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Website"
            name="website"
            value={formData.website || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Contact Person */}
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Contact Person
          </Typography>
        </Grid>

        {/* Contact Person Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="contactPersonName"
            value={formData.contactPersonName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Contact Person Role */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Role"
            name="contactPersonRole"
            value={formData.contactPersonRole || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Contact Person Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="contactPersonEmail"
            value={formData.contactPersonEmail || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Contact Person Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            name="contactPersonPhone"
            value={formData.contactPersonPhone || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        {isFormModified && !isFormUnchanged && (
          <Grid item xs={12} container justifyContent="center">
            <button className={buttonStyles.button} type="submit">
              Save Profile
            </button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default OrganizationContactInfoForm;