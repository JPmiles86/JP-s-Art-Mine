
// F_3x4_DS_L_U.tsx
import React from 'react';
import useStore from '../screens/store';

const F_3x4_DS_L_U = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
      <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="-200" height="400" width="300" transform="rotate(90,100,100)" preserveAspectRatio="xMidYMid meet" />
        <image href={imageUrl} x="300" y="0" height="400" width="300" transform="translate(900,0) scale(-1, 1) rotate(90,400,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
  );
};

export default F_3x4_DS_L_U;
