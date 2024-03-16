// my-gallery/src/screens/Profile.tsx
// src/screens/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';

interface UserData {
    userId: number;
    email: string;
    username: string;
    role: string;
    // Add any other properties from the Users table
  }
  
  interface PersonalContactInfo {
    personContactId: number;
    entityId: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    primaryEmail: string;
    secondaryEmail?: string;
    primaryPhone: string;
    secondaryPhone?: string;
    locationId?: number;
    instagram?: string;
    twitter?: string;
    linkedIn?: string;
    website?: string;
    profilePhotoUrl?: string;
    relationshipToArtist?: string;
    purchasePrivacyLevel: string;
    preferences?: string;
  }
  
  interface OrganizationContactInfo {
    organizationContactId: number;
    entityId: number;
    organizationName: string;
    primaryEmail: string;
    secondaryEmail?: string;
    primaryPhone: string;
    secondaryPhone?: string;
    locationId?: number;
    instagram?: string;
    twitter?: string;
    linkedIn?: string;
    website?: string;
    profilePhotoUrl?: string;
    preferences?: string;
    contactPerson1?: string;
    contactPerson1Role?: string;
    contactPerson1Email?: string;
    contactPerson1Phone?: string;
    contactPerson2?: string;
    contactPerson2Role?: string;
    contactPerson2Email?: string;
    contactPerson2Phone?: string;
    contactPerson3?: string;
    contactPerson3Role?: string;
    contactPerson3Email?: string;
    contactPerson3Phone?: string;
  }
  
  interface EntityType {
    entityId: number;
    entityType: string; // 'Person', 'Company', 'Organization'
  }
  
  interface Location {
    locationId: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    locationType: string; // 'Home', 'Business', 'Other'
  }

const Profile: React.FC = () => {
  const { currentUser } = useAuth(); // Assuming this is now available from the AuthContext
  const [userData, setUserData] = useState<UserData | null>(null);
  const [personalContactInfo, setPersonalContactInfo] = useState<PersonalContactInfo | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the Users table
        const response = await axios.get(`/api/users/${currentUser?.userId}`);
        setUserData(response.data);

        // Fetch personal contact information from the PersonContactInfos table
        const contactResponse = await axios.get(`/api/personal-contacts/${currentUser?.userId}`);
        setPersonalContactInfo(contactResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Avatar
            alt={`${personalContactInfo?.firstName} ${personalContactInfo?.lastName}`}
            src={personalContactInfo?.profilePhotoUrl || ''} // Replace with the actual property name for profile photo URL
            sx={{ width: 200, height: 200 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">
            {personalContactInfo?.firstName} {personalContactInfo?.lastName}
          </Typography>
          <Typography variant="body1">
            Email: {personalContactInfo?.primaryEmail}
          </Typography>
          <Typography variant="body1">
            Username: {userData?.username}
          </Typography>
          <Typography variant="body1">
            Role: {userData?.role}
          </Typography>
          {/* Display any other user information */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;