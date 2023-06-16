// E_3x4_TC_L_U.tsx
import React from 'react';
import useStore from '../screens/store';

const E_3x4_TC_L_U = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2vw' }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="-100" y="0" height="400" width="300" transform="rotate(270,100,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="-100" y="0" height="400" width="300" transform="translate(400,0) scale(-1, 1) rotate(270,100,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
    </div>
  );
};

export default E_3x4_TC_L_U;
