// E_2x3_TS_L_U.tsx
import React from 'react';
import useStore from '../screens/store';

const E_2x3_TS_L_U = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
      <svg viewBox="0 0 610 200" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="-50" y="0" height="300" width="300" transform="translate(200,0) scale(-1, 1) rotate(90,100,100)" preserveAspectRatio="xMidYMid meet" />
        <image href={imageUrl} x="260" y="-100" height="300" width="300" transform="rotate(90,410,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
  );
};

export default E_2x3_TS_L_U;
