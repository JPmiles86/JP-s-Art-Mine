// F_2x3_TC_L_U.tsx
import React from 'react';
import useStore from '../screens/store';

const F_2x3_TC_L_U = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
      <svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="-50" y="0" height="300" width="300" transform="rotate(270,100,100)" preserveAspectRatio="xMidYMid meet" />
        <image href={imageUrl} x="250" y="-100" height="300" width="300" transform="translate(800,0) scale(-1, 1) rotate(270,400,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
  );
};

export default F_2x3_TC_L_U;
