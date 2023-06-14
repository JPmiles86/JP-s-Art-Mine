// E_2x3_CT_P_W.tsx
import React from 'react';
import useStore from '../screens/store';

const E_2x3_CT_P_W = () => {
  const { selectedImage } = useStore();
  const imageUrl = selectedImage ? `http://localhost:4000/images${selectedImage.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2vw' }}>
      <svg style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 200 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="0" height="300" width="200" transform="translate(200) scale(-1, 1) rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
      </svg>
      <svg style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 200 300" preserveAspectRatio="xMidYMid meet">
        <image href={imageUrl} x="0" y="0" height="300" width="200" transform="rotate(180, 100, 150)" preserveAspectRatio="xMidYMid meet" />
      </svg>
    </div>
  );
};

export default E_2x3_CT_P_W;
