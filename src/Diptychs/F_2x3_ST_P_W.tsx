// F_2x3_ST_P_W.tsx
import React from 'react';
import useStore from '../screens/store';

const F_2x3_ST_P_W = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }}>
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
      <image href={imageUrl} x="0" y="0" height="300" width="200" transform="rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
      <image href={imageUrl} x="200" y="0" height="300" width="200" transform="translate(200) scale(-1, 1) rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
    </svg>
  </div>
  );
};

export default F_2x3_ST_P_W;