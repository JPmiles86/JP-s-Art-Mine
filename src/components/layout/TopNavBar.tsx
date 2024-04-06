// my-gallery/src/components/layout/TopNavBar.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AuthModal from '../modals/AuthModal';
import { useAuth } from '../../contexts/AuthContext';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
import useStore from '../../utils/store';
import axios from 'axios';
import urlConfig from '../../utils/urlConfig';

interface UserData {
  userId?: number;
  email?: string;
  username?: string;
  isAnonymous?: boolean;
  profilePhotoUrl?: string;
  entityType?: string;
}

const TopNavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const isAnonymous = useStore((state) => state.isAnonymous);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const userId = useStore((state) => state.userId);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAuthModalOpen = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleSuccessfulAuth = () => {
    handleMenuClose(); // Close the menu when authentication is successful
  };

  const handleMenuItemClick = (path: string) => {
    handleMenuClose();
    navigate(path);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/profile`);
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    const handleProfilePhotoChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ profilePhotoUrl: string }>;
      setProfilePhotoUrl(customEvent.detail.profilePhotoUrl);
    };
  
    window.addEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);
  
    return () => {
      window.removeEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);
    };
  }, []);


  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        width: '100%',
        height: '0px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          height: '30px',
          minHeight: 'unset',
        }}
      >
        {isAuthenticated ? (
          <>
            <IconButton
              onClick={handleMenuOpen}
              color="inherit"
              aria-label="User Profile"
            >
              <Avatar
                alt={userData?.username || ''}
                src={profilePhotoUrl ? `${urlConfig.baseURL}${profilePhotoUrl}` : userData?.profilePhotoUrl ? `${urlConfig.baseURL}${userData.profilePhotoUrl}` : ''}
                sx={{ width: 45, height: 45 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/favorites')}>
                Favorites
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/curation-lists')}>
                Curation Lists
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <button
            onClick={handleAuthModalOpen}
            className={ButtonStyles.signinbutton}
          >
            Sign In
          </button>
        )}
      </Toolbar>
      <AuthModal
        open={isAuthModalOpen}
        onClose={handleAuthModalClose}
        showAnonymousOption={true}
        isLikeTriggered={false}
        onSuccessfulAuth={handleSuccessfulAuth}
        isAnonymousUser={isAnonymous}
      />
    </AppBar>
  );
};

export default TopNavBar;