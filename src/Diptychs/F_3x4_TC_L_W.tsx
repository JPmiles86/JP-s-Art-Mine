// F_3x4_TC_L_W.tsx
import React from 'react';
import useStore from '../screens/store';

const F_3x4_TC_L_W = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }}>
      <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="-100" y="0" height="400" width="300" transform="rotate(270,100,100)" preserveAspectRatio="xMidYMid meet" />
        <image href={imageUrl} x="200" y="-300" height="400" width="300" transform="translate(800,0) scale(-1, 1) rotate(270,400,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
      </div>
  );
};

export default F_3x4_TC_L_W;
