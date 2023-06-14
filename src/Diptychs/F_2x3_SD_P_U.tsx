// F_2x3_CD_P_B.tsx
import React from 'react';
import useStore from '../screens/store';

const F_2x3_CD_P_B = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
      <image href={imageUrl} x="0" y="0" height="300" width="200" transform="translate(200) scale(-1, 1)" preserveAspectRatio="xMidYMid meet" />
      <image href={imageUrl} x="200" y="0" height="300" width="200" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
};

export default F_2x3_CD_P_B;
