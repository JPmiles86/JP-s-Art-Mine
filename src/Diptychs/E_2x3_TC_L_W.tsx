// E_2x3_TC_L_W.tsx
import React from 'react';
import useStore from '../screens/store';

const E_2x3_TC_L_W = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5vw' }}>
      <svg style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="0" height="300" width="200" transform="rotate(270,100,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
      <svg style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="0" height="300" width="200" transform="translate(300,0) scale(-1, 1) rotate(270,100,100)" preserveAspectRatio="xMidYMid meet" />
      </svg>
    </div>
  );
};

export default E_2x3_TC_L_W;
