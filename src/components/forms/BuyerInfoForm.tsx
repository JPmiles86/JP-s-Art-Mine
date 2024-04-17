// my-gallery/src/components/forms/BuyerInfoForm.tsx
import React, { useState, useEffect } from 'react';
import { Typography, Select, MenuItem, Box, Checkbox, SelectChangeEvent, TextField } from '@mui/material';
import PersonContactInfoForm, { PersonalContactInfo } from './PersonContactInfoForm';
import OrganizationContactInfoForm, { OrganizationContactInfo } from './OrganizationContactInfoForm';
import axios from 'axios';
import useStore from '../../utils/store';

interface BuyerInfoFormProps {
    onSubmit: (buyerInfo: any, collectorInfo: any) => void;
    userId: number;
  }

  const BuyerInfoForm: React.FC<BuyerInfoFormProps> = ({ onSubmit, userId }) => {
  const [buyerEntityType, setBuyerEntityType] = useState('');
  const [collectorEntityType, setCollectorEntityType] = useState('');
  const [isFormModified, setIsFormModified] = useState(false);
  const [buyerPersonContactInfo, setBuyerPersonContactInfo] = useState<PersonalContactInfo | null>(null);
  const [buyerOrganizationContactInfo, setBuyerOrganizationContactInfo] = useState<OrganizationContactInfo | null>(null);
  const [collectorPersonContactInfo, setCollectorPersonContactInfo] = useState<PersonalContactInfo | null>(null);
  const [collectorOrganizationContactInfo, setCollectorOrganizationContactInfo] = useState<OrganizationContactInfo | null>(null);
  const [isBuyingForSomeoneElse, setIsBuyingForSomeoneElse] = useState(false);
  const [collectorEmail, setCollectorEmail] = useState('');
  const [creationReason, setCreationReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  //const userId = useStore((state) => state.userId);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/profile`);
      const { user, personContactInfo, organizationContactInfo } = response.data;
      setBuyerEntityType(user.entityType || '');

      if (user.entityType === 'Person') {
        setBuyerPersonContactInfo(personContactInfo);
      } else if (user.entityType === 'Organization') {
        setBuyerOrganizationContactInfo(organizationContactInfo);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleBuyerEntityTypeChange = (event: SelectChangeEvent<string>) => {
    setBuyerEntityType(event.target.value);
  };
  
  const handleCollectorEntityTypeChange = (event: SelectChangeEvent<string>) => {
    setCollectorEntityType(event.target.value);
  };

  const handleBuyingForSomeoneElseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBuyingForSomeoneElse(event.target.checked);
  };

  const handleCreationReasonChange = (event: SelectChangeEvent<string>) => {
    setCreationReason(event.target.value);
  };

  const handleOtherReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherReason(event.target.value);
  };

  const handleCollectorEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollectorEmail(event.target.value);
  };

  const handleSubmit = async (buyerInfo: any, collectorInfo: any) => {
    if (isBuyingForSomeoneElse) {
      try {
        const response = await axios.get(`/api/users/check-email?email=${collectorEmail}`);
        if (response.data.exists) {
          // Associate the collector with the existing account
          collectorInfo.userId = response.data.userId;
        } else {
          // Create a new user record for the collector
          const newUserResponse = await axios.post('/api/users', {
            email: collectorEmail,
            createdBy: userId,
            creationReason: creationReason === 'Other' ? otherReason : creationReason,
          });
          collectorInfo.userId = newUserResponse.data.userId;
        }
      } catch (error) {
        console.error('Error checking collector email:', error);
        // Handle the error appropriately
      }
    }

    onSubmit(buyerInfo, collectorInfo);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt={4}>
        <Checkbox
          checked={isBuyingForSomeoneElse}
          onChange={handleBuyingForSomeoneElseChange}
          color="primary"
        />
        <Typography variant="body1" component="span">
          I am buying this artwork for someone else
        </Typography>
      </Box>
      {isBuyingForSomeoneElse && (
        <>
          <TextField
            label="Collector Email"
            value={collectorEmail}
            onChange={handleCollectorEmailChange}
            fullWidth
            margin="normal"
          />
          <Select
            value={creationReason}
            onChange={handleCreationReasonChange}
            displayEmpty
            style={{ width: '200px', marginTop: '10px', marginBottom: '20px' }}
        >
            <MenuItem value="" disabled>
            Select a reason
            </MenuItem>
            <MenuItem value="Gift">Gift</MenuItem>
            <MenuItem value="Art advisor purchasing for a client">Art advisor purchasing for a client</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
        </Select>
          {creationReason === 'Other' && (
            <TextField
              label="Other Reason"
              value={otherReason}
              onChange={handleOtherReasonChange}
              fullWidth
              margin="normal"
            />
          )}
          <Typography variant="h6">Collector Information</Typography>
          <Select
            value={collectorEntityType}
            onChange={handleCollectorEntityTypeChange}
            displayEmpty
            style={{ width: '200px', marginTop: '10px', marginBottom: '20px' }}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value="Person">Person</MenuItem>
            <MenuItem value="Organization">Organization</MenuItem>
          </Select>
          {collectorEntityType === 'Person' && (
            <PersonContactInfoForm
              userData={null}
              personContactInfo={collectorPersonContactInfo || { personContactId: 0 }}
              onSubmit={(collectorInfo) => handleSubmit(null, collectorInfo)}
              isRequired={true}
              isFormModified={isFormModified}
              setIsFormModified={setIsFormModified}
            />
          )}
          {collectorEntityType === 'Organization' && (
            <OrganizationContactInfoForm
              userData={null}
              organizationContactInfo={collectorOrganizationContactInfo || { organizationContactId: 0 }}
              onSubmit={(collectorInfo) => handleSubmit(null, collectorInfo)}
              isRequired={true}
              isFormModified={isFormModified}
              setIsFormModified={setIsFormModified}
            />
          )}
        </>
      )}
      <Typography variant="h6">Buyer Information</Typography>
      <Select
        value={buyerEntityType}
        onChange={handleBuyerEntityTypeChange}
        displayEmpty
        style={{ width: '200px', marginTop: '10px', marginBottom: '20px' }}
      >
        <MenuItem value="" disabled>
          Select an option
        </MenuItem>
        <MenuItem value="Person">Person</MenuItem>
        <MenuItem value="Organization">Organization</MenuItem>
      </Select>
      {buyerEntityType === 'Person' && (
        <PersonContactInfoForm
          userData={null}
          personContactInfo={buyerPersonContactInfo || { personContactId: 0 }}
          onSubmit={(buyerInfo) => handleSubmit(buyerInfo, null)}
          isRequired={true}
          isFormModified={isFormModified}
          setIsFormModified={setIsFormModified}
        />
      )}
      {buyerEntityType === 'Organization' && (
        <OrganizationContactInfoForm
          userData={null}
          organizationContactInfo={buyerOrganizationContactInfo || { organizationContactId: 0 }}
          onSubmit={(buyerInfo) => handleSubmit(buyerInfo, null)}
          isRequired={true}
          isFormModified={isFormModified}
          setIsFormModified={setIsFormModified}
        />
      )}
    </Box>
  );
}

  export default BuyerInfoForm;