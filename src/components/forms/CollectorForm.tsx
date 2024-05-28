// my-gallery/src/components/forms/CollectorForm.tsx

import React, { useState } from 'react';
import { Grid, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import CollectorPersonContactInfoForm from './CollectorPersonContactInfoForm';
import CollectorOrganizationContactInfoForm from './CollectorOrganizationContactInfoForm';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface CollectorFormProps {
  onSubmit: (collectorInfo: any) => void;
  userId: number;
  buyerEmail: string;
  className?: string;
}

const CollectorForm: React.FC<CollectorFormProps> = ({ onSubmit, userId, buyerEmail, className }) => {
  const [entityType, setEntityType] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [collectorInfo, setCollectorInfo] = useState<any>(null);

  const handleEntityTypeChange = (event: SelectChangeEvent<string>) => {
    setEntityType(event.target.value as string);
  };

  const handleSubmit = (collectorInfo: any) => {
    onSubmit({ ...collectorInfo, entityType });
    setIsEditing(false);
    setCollectorInfo(collectorInfo);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={className} style={{ backgroundColor: isEditing ? '#f5f5f5' : '#ffffff', padding: '20px' }}>
      <Typography variant="h6" style={{ backgroundColor: '#000000', color: '#ffffff', padding: '20px', justifyContent: 'center', textAlign: 'center' }}>
        <strong>Step 1.1: Collector Information</strong>
      </Typography>
      {!entityType ? (
        <Grid container spacing={2} style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px', padding: '20px', backgroundColor: isEditing ? '#f5f5f5' : '#ffffff' }}>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Are you purchasing the art for a person or an organization?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select value={entityType} onChange={handleEntityTypeChange} displayEmpty fullWidth style={{ marginBottom: '20px' }}>
              <MenuItem value="" disabled>
                Person or Organization?
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
                <strong>Collector is a:</strong> {entityType}
              </Typography>
              <button className={buttonStyles.navButton} style={{ marginLeft: '0px' }} onClick={() => setEntityType('')}>
                Edit Collector Type
              </button>
            </Grid>
          )}
          {entityType === 'Person' && (
            <Grid item xs={12}>
              <CollectorPersonContactInfoForm
                onSubmit={handleSubmit}
                isEditing={isEditing}
                buyerUserId={userId}
                buyerEmail={buyerEmail}
                onEditClick={handleEditClick}
              />
            </Grid>
          )}
          {entityType === 'Organization' && (
            <Grid item xs={12}>
              <CollectorOrganizationContactInfoForm
                onSubmit={handleSubmit}
                isEditing={isEditing}
                buyerUserId={userId}
                buyerEmail={buyerEmail}
                onEditClick={handleEditClick}
              />
            </Grid>
          )}
          {!isEditing && collectorInfo && collectorInfo.newCollectorCreated && (
            <Grid item xs={12}>
              <Typography variant="body2" style={{ marginTop: '10px', marginBottom: '30px' }}>
                Please Note: An account has been created for the collector.
                <br />
                Log in: {collectorInfo.collectorEmail}
                <br />
                Password: {collectorInfo.buyerEmail}
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default CollectorForm;