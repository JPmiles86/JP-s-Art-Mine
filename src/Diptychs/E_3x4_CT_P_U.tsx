// E_3x4_CT_P_U.tsx
import React from 'react';
import useStore from '../screens/store';

const E_3x4_CT_P_U = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox="0 0 615 400" preserveAspectRatio="xMidYMid meet">
      <image href={imageUrl} x="0" y="0" height="400" width="300" transform="translate(200) scale(-1, 1) rotate(180, 100, 200)" preserveAspectRatio="xMidYMid meet" />
      <image href={imageUrl} x="330" y="0" height="400" width="300" transform="translate(745) rotate(180, 100, 200)" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
};

export default E_3x4_CT_P_U;