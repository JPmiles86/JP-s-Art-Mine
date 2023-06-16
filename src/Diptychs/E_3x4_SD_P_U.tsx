// E_3x4_SD_P_U.tsx
import React from 'react';
import useStore from '../screens/store';

const E_3x4_SD_P_U = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox="0 0 615 400" preserveAspectRatio="xMidYMid meet">
      <image href={imageUrl} x="0" y="0" height="400" width="300" transform="translate(300) scale(-1, 1)" preserveAspectRatio="xMidYMid meet" />
      <image href={imageUrl} x="315" y="0" height="400" width="300" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
};

export default E_3x4_SD_P_U;
