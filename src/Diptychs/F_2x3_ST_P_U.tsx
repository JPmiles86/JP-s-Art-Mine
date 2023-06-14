// F_2x3_ST_P_U.tsx
import React from 'react';
import useStore from '../screens/store';

const F_2x3_ST_P_U = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
      <image href={imageUrl} x="0" y="0" height="300" width="200" transform="rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
      <image href={imageUrl} x="200" y="0" height="300" width="200" transform="translate(200) scale(-1, 1) rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
};

export default F_2x3_ST_P_U;
