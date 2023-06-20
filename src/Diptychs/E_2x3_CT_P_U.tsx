// E_2x3_CT_P_U.tsx
import React from 'react';
import useStore from '../screens/store';

const E_2x3_CT_P_U = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox="0 0 410 300" preserveAspectRatio="xMidYMid meet">
      <image href={imageUrl} x="0" y="0" height="300" width="200" transform="translate(200) scale(-1, 1) rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
      <image href={imageUrl} x="210" y="0" height="300" width="200" transform="translate(420) rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
};

export default E_2x3_CT_P_U;
