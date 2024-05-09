// my-gallery/src/components/forms/CollectorOrganizationContactInfoForm.tsx

import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import axios from 'axios';

interface CollectorOrganizationContactInfoFormProps {
  onSubmit: (organizationInfo: any) => void;
  isEditing?: boolean;
  buyerUserId: number;
  buyerEmail: string;
  onEditClick: () => void;
}

const CollectorOrganizationContactInfoForm: React.FC<CollectorOrganizationContactInfoFormProps> = ({ onSubmit, isEditing: isEditingProp = true, buyerUserId, buyerEmail, onEditClick }) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    primaryEmail: '',
    primaryPhone: '',
    contactPersonName: '',
  });
  const [isEditing, setIsEditing] = useState(isEditingProp);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    onEditClick();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const organizationInfo = { ...formData, buyerEmail };

    try {
      const response = await axios.post('/api/users/create-collector', { organizationInfo, buyerUserId });
      const { userId, newCollectorCreated } = response.data;
      onSubmit({ ...organizationInfo, collectorUserId: userId, newCollectorCreated, collectorEmail: organizationInfo.primaryEmail, buyerEmail });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving collector information:', error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: isEditing ? '#f5f5f5' : '#ffffff' }}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Organization Name"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Organization Email"
                name="primaryEmail"
                type="email"
                value={formData.primaryEmail}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Organization Phone"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Person"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <button type="submit" className={buttonStyles.button}>
                Save
              </button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginTop: '10px', marginBottom: '20px' }}>
              <Typography>{formData.organizationName}</Typography>
              <Typography>{formData.primaryEmail}</Typography>
              <Typography>{formData.primaryPhone}</Typography>
              <Typography>Contact Person: {formData.contactPersonName}</Typography>
            </Grid>
          </Grid>
          <button className={buttonStyles.buttonLarge} onClick={handleEditClick}>
            Edit Collector Info
          </button>
        </>
      )}
    </div>
  );
};

export default CollectorOrganizationContactInfoForm;