// my-gallery/src/components/layout/TopNavBar.tsx

import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Box, Typography } from '@mui/material';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    anchorElRef.current = event.currentTarget;
    setMenuOpen(true);
  };
  
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleAuthModalOpen = () => {
    setIsAuthModalOpen(true);
    setMenuOpen(false); // Close the menu when opening the AuthModal
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAnonymousSignUp = () => {
    setIsAuthModalOpen(true);
    setMenuOpen(false);
  };

  const handleSuccessfulAuth = () => {
    setMenuOpen(false); // Close the menu when authentication is successful
    setIsAuthModalOpen(false); // Close the AuthModal when authentication is successful
  };

  const handleMenuItemClick = (path: string) => {
    handleMenuClose();
    navigate(path);
  };

  const fetchUserData = async () => {
    const userId = useStore.getState().userId;
    if (userId) {
      try {
        const response = await axios.get(`/api/users/${userId}/profile`);
        setUserData(response.data.user);
        console.log('User data in TopNavBar:', response.data.user);
      } catch (error) {
        console.error('Error fetching user data in TopNavBar:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('Updated userData in TopNavBar:', userData);
  }, [userData]);

  const renderBackButton = () => {
    if (location.pathname !== '/') {
      return (
        <Box display="flex" alignItems="center" marginRight="auto" whiteSpace="nowrap">
          <Typography
            variant="body1"
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
          >
            ← Last Page
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const renderLinks = () => {
    const pathSegments = location.pathname.split('/');
    const filter = pathSegments[1];
    const photoID = pathSegments[2];
  
    if (location.pathname === '/favorites') {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/profile" className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            My Profile
          </Link>
        </>
      );
    } else if (location.pathname === '/profile') {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/favorites" className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            My Favorites
          </Link>
        </>
      );
    } else if (location.pathname === '/refer-a-friend') {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/favorites" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            My Favorites
          </Link>
          <Link to="/profile" className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            My Profile
          </Link>
        </>
      );
    } else if (location.pathname === '/') {
      return null;
    } else if (location.pathname.startsWith(`/${filter}`) && !location.pathname.includes(`/${photoID}`)) {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/favorites" className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            My Favorites
          </Link>
        </>
      );
    } else if (location.pathname === `/${filter}/${photoID}`) {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to={`/${filter}`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Image Grid
          </Link>
          <Link to="/favorites" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            My Favorites
          </Link>
          <Link to={`/${filter}/${photoID}/inquire`} className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            Inquire
          </Link>
        </>
      );
    } else if (location.pathname === `/${filter}/${photoID}/inquire`) {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to={`/${filter}`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Image Grid
          </Link>
          <Link to={`/${filter}/${photoID}`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Exhibition Gallery
          </Link>
          <Link to="/favorites" className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            My Favorites
          </Link>
        </>
      );
    } else if (location.pathname.startsWith(`/${filter}/${photoID}/purchase`) || location.pathname.startsWith(`/${filter}/${photoID}/request`)) {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to={`/${filter}`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Image Grid
          </Link>
          <Link to={`/${filter}/${photoID}`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Exhibition Gallery
          </Link>
          <Link to={`/${filter}/${photoID}/inquire`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Inquire
          </Link>
          <Link to="/favorites" className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            My Favorites
          </Link>
        </>
      );
    } else if (location.pathname.startsWith(`/${filter}/${photoID}/success`)) {
      return (
        <>
          <Link to="/" className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to={`/${filter}`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Image Grid
          </Link>
          <Link to={`/${filter}/${photoID}`} className={ButtonStyles.navButtonBig} style={{ marginRight: '20px', textDecoration: 'none' }}>
            Exhibition Gallery
          </Link>
          <Link to="/favorites" className={ButtonStyles.navButtonBig} style={{ textDecoration: 'none' }}>
            My Favorites
          </Link>
        </>
      );
    }
  
    return null;
  };  
  
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: location.pathname === '/' ? 'transparent' : 'white',
        color: 'black',
        boxShadow: 'none',
        width: '100%',
        height: '60px',
        margin: '0 auto',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          minHeight: 'unset',
        }}
      >
        {renderBackButton()}
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          {renderLinks()}
        </Box>
        {isAuthenticated ? (
          <Box display="flex" alignItems="center" marginLeft="auto">
            <IconButton
              onClick={handleMenuOpen}
              color="inherit"
              aria-label="User Profile"
              ref={anchorElRef}
            >
              <Avatar
                alt={userData?.username || ''}
                src={profilePhotoUrl ? `${urlConfig.baseURL}${profilePhotoUrl}` : userData?.profilePhotoUrl ? `${urlConfig.baseURL}${userData.profilePhotoUrl}` : ''}
                sx={{ width: 45, height: 45 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorElRef.current}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {isAuthenticated && isAnonymous && (
                <MenuItem onClick={handleAnonymousSignUp}>Sign Up</MenuItem>
              )}
              <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/favorites')}>
                Favorites
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/curation-lists')}>
                Curation Lists
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/refer-a-friend')}>
                Refer a Friend {/* Add this menu item */}
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
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
