// my-gallery/src/components/layout/TopNavBar.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AuthModal from '../modals/AuthModal';
import { useAuth } from '../../contexts/AuthContext';
import ButtonStyles from '../../screens/ButtonStyles.module.css';
import useStore from '../../utils/store';

const TopNavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const isAnonymous = useStore((state) => state.isAnonymous);
  const navigate = useNavigate();

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
              <AccountCircle />
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