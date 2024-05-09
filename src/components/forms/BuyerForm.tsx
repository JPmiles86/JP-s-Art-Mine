// my-gallery/src/components/forms/BuyerForm.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import BuyerPersonContactInfoForm from './BuyerPersonContactInfoForm';
import BuyerOrganizationContactInfoForm from './BuyerOrganizationContactInfoForm';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import axios from 'axios';

interface BuyerFormProps {
  onSubmit: (buyerInfo: any) => void;
  userId: number;
}

const BuyerForm: React.FC<BuyerFormProps> = ({ onSubmit, userId }) => {
  const [entityType, setEntityType] = useState('');
  const [personContactInfo, setPersonContactInfo] = useState<any>(null);
  const [organizationContactInfo, setOrganizationContactInfo] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [buyerEmail, setBuyerEmail] = useState('');

  const handleEntityTypeChange = async (event: SelectChangeEvent<string>) => {
    const selectedEntityType = event.target.value as string;
    setEntityType(selectedEntityType);
    try {
      await axios.put(`/api/users/${userId}/profile`, { entityType: selectedEntityType });
    } catch (error) {
      console.error('Error updating entity type:', error);
    }
  };

  const handleSubmit = (buyerInfo: any) => {
    onSubmit({ ...buyerInfo, entityType });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/profile`);
        const { user, personContactInfo, organizationContactInfo } = response.data;
        setEntityType(user.entityType || '');
        setPersonContactInfo(personContactInfo);
        setOrganizationContactInfo(organizationContactInfo);
        setBuyerEmail(user.email); // Set the buyer's email
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div style={{ backgroundColor: isEditing ? '#f5f5f5' : '#ffffff', padding: '20px' }}>
      <Typography variant="h6" style={{ backgroundColor: '#000000', color: '#ffffff', padding: '20px', justifyContent: 'center', textAlign: 'center' }}>
        <strong>Buyer Information</strong>
      </Typography>
      {!entityType ? (
        <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
          <Grid item xs={4}>
            <Select value={entityType} onChange={handleEntityTypeChange} displayEmpty fullWidth>
              <MenuItem value="" disabled>
                Select Buyer Type
              </MenuItem>
              <MenuItem value="Person">Person</MenuItem>
              <MenuItem value="Organization">Organization</MenuItem>
            </Select>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', marginTop: '0px', backgroundColor: isEditing ? '#f5f5f5' : '#ffffff' }}>
          {isEditing && (
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Buyer is a:</strong> {entityType}
              </Typography>
              <button className={buttonStyles.navButton} style={{ marginLeft: '0px' }} onClick={() => setEntityType('')}>
                Edit Buyer Type
              </button>
            </Grid>
          )}
          {entityType === 'Person' && (
            <Grid item xs={12}>
              <BuyerPersonContactInfoForm
                onSubmit={handleSubmit}
                initialValues={personContactInfo}
                isEditing={isEditing}
                userId={userId}
                onEditClick={handleEditClick}
              />
            </Grid>
          )}
          {entityType === 'Organization' && (
            <Grid item xs={12}>
              <BuyerOrganizationContactInfoForm
                onSubmit={handleSubmit}
                initialValues={organizationContactInfo}
                isEditing={isEditing}
                userId={userId}
                onEditClick={handleEditClick}
              />
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default BuyerForm;