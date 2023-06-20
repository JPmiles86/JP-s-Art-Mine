// F_3x4_SD_P_U.tsx
import React from 'react';
import useStore from '../screens/store';

const F_3x4_SD_P_U = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
      <image href={imageUrl} x="0" y="0" height="400" width="300" transform="translate(300) scale(-1, 1)" preserveAspectRatio="xMidYMid meet" />
      <image href={imageUrl} x="300" y="0" height="400" width="300" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
};

export default F_3x4_SD_P_U;
