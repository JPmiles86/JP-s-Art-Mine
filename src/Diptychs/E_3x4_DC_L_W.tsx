// E_3x4_DC_L_W.tsx
import React from 'react';
import useStore from '../screens/store';

const E_3x4_DC_L_W = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5vw' }}>
      <svg style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="50" y="-50" height="400" width="300" transform="translate(300,0) scale(-1, 1) rotate(270,150,200)" preserveAspectRatio="xMidYMid meet" />
      </svg>
      <svg style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="50" y="50" height="400" width="300" transform="rotate(270,150,200)" preserveAspectRatio="xMidYMid meet" />
      </svg>
    </div>
  );
};

export default E_3x4_DC_L_W;
