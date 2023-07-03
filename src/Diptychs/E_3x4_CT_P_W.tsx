import React from 'react';
import useStore from '../screens/store';

const E_3x4_CT_P_W = () => {
  const { selectedPhoto } = useStore();
  const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5vw' }}>
      <svg style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet" >
        <g transform="scale(1 -1)"> <image href={imageUrl} x="0" y="-400" height="400" width="300" preserveAspectRatio="xMidYMid meet" /> </g>
      </svg>
      <svg
        style={{ border: '0.75vw solid white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }} viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(300 400) scale(-1 -1)"> <image href={imageUrl} x="0" y="0" height="400" width="300" preserveAspectRatio="xMidYMid meet" /> </g>
      </svg>
    </div>
  );
};

export default E_3x4_CT_P_W;
