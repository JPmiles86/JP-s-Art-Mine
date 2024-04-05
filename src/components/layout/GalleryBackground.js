// GalleryBackground.js
import React from 'react';

const GalleryBackground = ({ imageUrl }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        position: 'relative', // This ensures that we can absolutely position children
        zIndex: 1, // Lower z-index since this is the background
        width: '100%',
        height: '100vh', // This will make it fill the height of the viewport
        // ... add other styles as needed
      }}
    />
  );
};
export default GalleryBackground;
