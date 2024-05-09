// my-gallery/src/components/forms/CollectorPersonContactInfoForm.tsx

import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import axios from 'axios';

interface CollectorPersonContactInfoFormProps {
  onSubmit: (personInfo: any) => void;
  isEditing?: boolean;
  buyerUserId: number;
  buyerEmail: string;
  onEditClick: () => void;
}

const CollectorPersonContactInfoForm: React.FC<CollectorPersonContactInfoFormProps> = ({ onSubmit, isEditing: isEditingProp = true, buyerUserId, buyerEmail, onEditClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    primaryEmail: '',
    primaryPhone: '',
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
    const personInfo = { ...formData, buyerEmail };
  
    try {
      const response = await axios.post('/api/users/create-collector', { personInfo, buyerUserId });
      const { userId, newCollectorCreated } = response.data;
      onSubmit({ ...personInfo, collectorUserId: userId, newCollectorCreated, collectorEmail: personInfo.primaryEmail, buyerEmail });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving collector information:', error);
      // Display an error message to the user
      alert('An error occurred while saving the collector information. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: isEditing ? '#f5f5f5' : '#ffffff' }}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" name="primaryEmail" type="email" value={formData.primaryEmail} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Phone" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} fullWidth required />
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
            <Grid item xs={12} style={{ marginTop: '0px', marginBottom: '20px' }}>
              <Typography>{formData.firstName} {formData.middleName} {formData.lastName}</Typography>
              <Typography>{formData.primaryEmail}</Typography>
              <Typography>{formData.primaryPhone}</Typography>
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

export default CollectorPersonContactInfoForm;