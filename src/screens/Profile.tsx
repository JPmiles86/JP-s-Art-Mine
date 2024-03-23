// my-gallery/src/screens/Profile.tsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Typography, Grid, Box, Button, TextField, MenuItem, Select, Link } from '@mui/material';
import axios from 'axios';
import buttonStyles from './ButtonStyles.module.css';
import PersonContactInfoForm from '../components/forms/PersonContactInfoForm';
import OrganizationContactInfoForm from '../components/forms/OrganizationContactInfoForm';
import LocationList from '../components/forms/LocationList';
import useStore from '../utils/store';
import urlConfig from './urlConfig';
import AuthModal from '../components/modals/AuthModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserData {
  userId?: number;
  email?: string;
  username?: string;
  isAnonymous?: boolean;
  profilePhotoUrl?: string;
}
  
interface PersonalContactInfo {
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
  
interface OrganizationContactInfo {
  organizationContactId: number;
  entityId: number;
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
  preferences?: string;
  notes?: string;
  contactPersons: ContactPerson[];
}

interface ContactPerson {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
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

  const [userData, setUserData] = useState<UserData | null>(null);
  const [personalContactInfo, setPersonalContactInfo] = useState<PersonalContactInfo | null>(null);
  const [organizationContactInfo, setOrganizationContactInfo] = useState<OrganizationContactInfo | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entityType, setEntityType] = useState<string | null>(null);
  const [selectedEntityType, setSelectedEntityType] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const userId = useStore((state) => state.userId);
  const { isAuthenticated } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(userData?.username || '');
  const [usernameError, setUsernameError] = useState('');
  const [isFormModified, setIsFormModified] = useState(false);

  const handleCancelUsername = () => {
    setNewUsername(userData?.username || '');
    setEditingUsername(false);
  };

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setNewUsername(newUsername);
  
    try {
      const response = await axios.get(`/api/users/check-username/${newUsername}`);
      const isUnique = response.data.isUnique;
      setUsernameError(isUnique ? '' : 'Username already exists');
    } catch (error) {
      console.error('Error checking username uniqueness:', error);
    }
  };
  
  const handleSaveUsername = async () => {
    try {
      await axios.put(`/api/users/${userId}/profile`, { username: newUsername });
      setUserData((prevData) => ({ ...prevData, username: newUsername }));
      setEditingUsername(false);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/profile`);
      const { user, entityType, personContactInfo, organizationContactInfo } = response.data;
      setUserData(user);
      setIsAnonymous(user.isAnonymous);
      setEntityType(entityType);
      setSelectedEntityType(entityType || '');
  
      if (entityType === 'Person') {
        setPersonalContactInfo(personContactInfo);
      } else if (entityType === 'Organization') {
        setOrganizationContactInfo(organizationContactInfo);
      }
  
      setLocations(response.data.locations || []);
      console.log('User data:', response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);


  const handleSignUp = async () => {
    try {
      await axios.put(`/api/users/${userId}/profile`, {
        email,
        password,
        isAnonymous: false,
      });

      // Send the sign-up email
      await axios.post('/api/auth/send-signup-email', { email });

      // Refresh user data after sign-up
      window.location.reload();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handlePersonContactInfoSubmit = async (updatedPersonContactInfo: PersonalContactInfo) => {
    try {
      await axios.put(`/api/users/${userId}/profile`, {
        entityType: 'Person',
        personContactInfo: updatedPersonContactInfo,
      });
      setPersonalContactInfo(updatedPersonContactInfo);
      toast.success('Profile information saved successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error updating personal contact info:', error);
    }
  };

  const handleLocationUpdate = (updatedLocations: Location[]) => {
    setLocations(updatedLocations);
  };

  const handleOrganizationContactInfoSubmit = async (updatedOrganizationContactInfo: OrganizationContactInfo) => {
    try {
      await axios.put(`/api/users/${userId}/profile`, {
        entityType: 'Organization',
        organizationContactInfo: updatedOrganizationContactInfo,
      });
      setOrganizationContactInfo(updatedOrganizationContactInfo);
      alert('Profile information saved successfully!');
    } catch (error) {
      console.error('Error updating organization contact info:', error);
    }
  };

  const renderProfileForm = () => {
    if (selectedEntityType === 'Person') {
      return (
        <PersonContactInfoForm
          userData={userData}
          personContactInfo={personalContactInfo!}
          onSubmit={handlePersonContactInfoSubmit}
          isRequired={false}
          isFormModified={isFormModified}
          setIsFormModified={setIsFormModified}
        />
      );
    } else if (selectedEntityType === 'Organization') {
      return (
        <OrganizationContactInfoForm
          userData={userData}
          organizationContactInfo={organizationContactInfo!}
          onSubmit={handleOrganizationContactInfoSubmit}
          isRequired={false}
          isFormModified={isFormModified}
          setIsFormModified={setIsFormModified}
        />
      );
    } else {
      return null;
    }
  };

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error('The selected file exceeds the maximum allowed size of 3MB. Please choose a smaller file.', {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      const formData = new FormData();
      formData.append('profilePhoto', file);
  
      try {
        const response = await axios.post(`/api/users/${userId}/profile-photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          setUserData((prevData) => ({
            ...prevData,
            profilePhotoUrl: response.data.profilePhotoUrl,
          }));
          toast.success('Profile photo uploaded successfully!', {
            position: 'top-left',
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          console.error('Error uploading profile photo');
        }
      } catch (error) {
        console.error('Error uploading profile photo:', error);
      }
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      setOpenAuthModal(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormModified) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormModified]);

  useEffect(() => {
    if (selectedEntityType && selectedEntityType !== entityType) {
      setEntityType(selectedEntityType);
      axios.put(`/api/users/${userId}/profile`, {
        entityType: selectedEntityType,
      });
    }
  }, [selectedEntityType, userId, entityType]);

// {userId && (
//  <Box mt={4}>
//  <Typography variant="h6">Locations:</Typography>
//  <LocationList userId={userId} locations={locations} onUpdate={handleLocationUpdate} isRequired={false} selectedEntityType={selectedEntityType} />
//</Box>
//)}

return (
  <Box>
    {!isAuthenticated ? (
      // Render the message and trigger the AuthModal
      <Box>
        <Typography variant="h6" align="center" style={{ marginTop: '60px' }}>
          In order to update your profile, you must be signed in. Please sign in or sign up.
        </Typography>
        <Typography variant="body1" align="center">
          <Link href="/">Go to Homepage</Link>
        </Typography>
        <AuthModal
          open={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
          showAnonymousOption={false}
          isLikeTriggered={false}
        />
      </Box>
    ) : (
      <>
        {isAnonymous ? (
          <Box>
            <Typography variant="h6">Sign Up to Save Your Favorites</Typography>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={buttonStyles.button} onClick={handleSignUp}>Sign Up</button>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} style={{ marginTop: '30px', display: 'flex', alignItems: 'flex-end' }}>
                <Avatar
                  alt={`${userData?.username}`}
                  src={userData?.profilePhotoUrl ? `${urlConfig.baseURL}${userData.profilePhotoUrl}` : ''}
                  sx={{ width: 150, height: 150 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-photo-upload"
                  onChange={handleProfilePhotoUpload}
                />
                <label htmlFor="profile-photo-upload" className={buttonStyles.navButton} style={{ marginLeft: '0px', cursor: 'pointer', alignSelf: 'flex-end' }}>
                  Update Profile Photo
                </label>
              </Grid>
              <Grid item xs={12} md={3} style={{ marginTop: '20px' }}>
                {editingUsername ? (
                  <>
                    <TextField
                      label="Username"
                      value={newUsername}
                      onChange={handleUsernameChange}
                      fullWidth
                      margin="normal"
                      error={Boolean(usernameError)}
                      helperText={usernameError}
                    />
                    <Box display="flex" justifyContent="space-between">
                      <button className={buttonStyles.button} onClick={handleSaveUsername}>
                        Save
                      </button>
                      <button className={buttonStyles.button} onClick={handleCancelUsername}>
                        Cancel
                      </button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography style={{ marginTop: '60px' }} variant="h6">
                      Username: <strong>{userData?.username}</strong>
                    </Typography>
                    <button className={buttonStyles.navButton} onClick={() => {
                      setNewUsername(userData?.username || '');
                      setEditingUsername(true);
                    }}>
                      Change Username
                    </button>
                  </>
                )}
              </Grid>
            </Grid>
            {entityType ? (
              <Box mt={4} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" component="span">Account Type: {entityType}</Typography>
                <Typography variant="body2" component="span" style={{ marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setEntityType(null)}>Edit</Typography>
              </Box>
            ) : (
              <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6">Is this account for a Person or an Organization?</Typography>
                <Select
                  value={selectedEntityType}
                  onChange={(e) => setSelectedEntityType(e.target.value as string)}
                  displayEmpty
                  style={{ width: '200px', marginTop: '10px', marginBottom: '20px' }}
                >
                  <MenuItem value="" disabled>Select an option</MenuItem>
                  <MenuItem value="Person">Person</MenuItem>
                  <MenuItem value="Organization">Organization</MenuItem>
                </Select>
              </Box>
            )}
            <Box px={4}>
              {renderProfileForm()}
            </Box>
            <Box mb={4} />
          </>
        )}
      </>
    )}
    <ToastContainer />
  </Box>
);
 }
export default Profile;