// F_3x4_TS_L_B.tsx
import React from 'react';
import useStore from '../screens/store';

const F_3x4_TS_L_B = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '.75vw solid black', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }}>
      <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="0" height="400" width="300" transform="translate(200,0) scale(-1, 1) rotate(90,100,100)" preserveAspectRatio="xMidYMid meet" />
        <image href={imageUrl} x="300" y="-300" height="400" width="300" transform="rotate(90,400,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
      </div>
  );
};

export default F_3x4_TS_L_B;
