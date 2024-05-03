// my-gallery/src/components/forms/BuyerOrganizationContactInfoForm.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Select, MenuItem, SelectChangeEvent, FormControlLabel, Checkbox, TextField } from '@mui/material';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import axios from 'axios';

interface BuyerOrganizationContactInfoFormProps {
  onSubmit: (organizationInfo: any) => void;
  initialValues?: any;
  isEditing?: boolean;
  userId: number;
}

const BuyerOrganizationContactInfoForm: React.FC<BuyerOrganizationContactInfoFormProps> = ({ onSubmit, initialValues, isEditing: isEditingProp = true, userId }) => {
  const [formData, setFormData] = useState(initialValues || {});
  const [isEditing, setIsEditing] = useState(isEditingProp);
  const [isArtworkOwnerSameAsPurchaser, setIsArtworkOwnerSameAsPurchaser] = useState(true);
  const [purchaseReason, setPurchaseReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const organizationInfo = {
      organizationName: formData.get('organizationName'),
      primaryEmail: formData.get('primaryEmail'),
      primaryPhone: formData.get('primaryPhone'),
      contactPersonName: formData.get('contactPersonName'),
      isArtworkOwnerSameAsPurchaser,
      purchaseReason,
      customReason,
      // Add other fields as needed
    };
  
    try {
      await axios.put(`/api/users/${userId}/buyer-organization-contact-info`, organizationInfo);
      onSubmit({ ...organizationInfo, isArtworkOwnerSameAsPurchaser });
      setIsEditing(false);
      // Add toast notification for success
    } catch (error) {
      console.error('Error saving buyer information:', error);
      // Add toast notification for error
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
                value={formData.organizationName || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Organization Email"
                name="email"
                type="primaryEmail"
                value={formData.primaryEmail || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Organization Phone"
                name="primaryPhone"
                value={formData.primaryPhone || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Person"
                name="contactPersonName"
                value={formData.contactPersonName || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!isArtworkOwnerSameAsPurchaser}
                    onChange={(event) => setIsArtworkOwnerSameAsPurchaser(!event.target.checked)}
                  />
                }
                label="Are you purchasing this artwork for someone else?"
                labelPlacement="start"
              />
            </Grid>
            {!isArtworkOwnerSameAsPurchaser && (
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Select
                  value={purchaseReason}
                  onChange={(event) => setPurchaseReason(event.target.value)}
                  displayEmpty
                  style={{ width: '300px', marginRight: '20px' }}
                >
                  <MenuItem value="" disabled>
                    Select a reason
                  </MenuItem>
                  <MenuItem value="Gift">Gift</MenuItem>
                  <MenuItem value="Purchasing for a Client">Purchasing for a Client</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {purchaseReason === 'Other' && (
                  <TextField
                    label="Reason for purchase"
                    value={customReason}
                    onChange={(event) => setCustomReason(event.target.value)}
                    style={{ width: '300px' }}
                  />
                )}
              </Grid>
            )}
            <Grid item xs={12}>
              <button type="submit" className={buttonStyles.button}>
                Save
              </button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginTop: '10px', marginBottom: '20px'}}>
              <Typography>{formData.organizationName || '—'}</Typography>
              <Typography>{formData.primaryEmail || '—'}</Typography>
              <Typography>{formData.primaryPhone || '—'}</Typography>
              <Typography>Contact Person: {formData.contactPersonName || '—'}</Typography>
              <br></br>
              {!isArtworkOwnerSameAsPurchaser && (
                <>
                  <Typography>
                    The buyer is purchasing the artwork for someone else.
                  </Typography>
                  <Typography>
                    <strong>Reason:</strong> {purchaseReason === 'Other' ? customReason : purchaseReason}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
          <button
            className={buttonStyles.buttonLarge}
            onClick={() => setIsEditing(true)}
          >
            Edit Buyer Info
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerOrganizationContactInfoForm;