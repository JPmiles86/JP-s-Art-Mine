// E_3x4_SD_P_B.tsx
import React from 'react';
import useStore from '../screens/store';

const E_3x4_SD_P_B = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2vw' }}>
      <svg style={{ border: '0.75vw solid black', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="0" height="400" width="300" transform="translate(300) scale(-1, 1)" preserveAspectRatio="xMidYMid meet" />
      </svg>
      <svg style={{ border: '0.75vw solid black', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="0" height="400" width="300" preserveAspectRatio="xMidYMid meet" />
      </svg>
    </div>
  );
};

export default E_3x4_SD_P_B;
