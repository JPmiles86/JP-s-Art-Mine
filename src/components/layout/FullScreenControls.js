// my-gallery/src/components/layout/FullScreenControls.js

import React from 'react';
import DiptychControls from '../../Diptychs/DiptychControls';

const FullScreenControls = ({ navigateToInquiry, selectedPhoto, fabricCanvasRef, layoutSpecs, areShapesVisible, toggleShapesVisibility, setIsAuthModalOpen, isAuthModalOpen, handleCloseFullScreen }) => {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10000 }}>
      <DiptychControls
        navigateToInquiry={navigateToInquiry}
        selectedPhoto={selectedPhoto}
        fabricCanvasRef={fabricCanvasRef}
        layoutSpecs={layoutSpecs}
        areShapesVisible={areShapesVisible}
        toggleShapesVisibility={toggleShapesVisibility}
        setIsAuthModalOpen={setIsAuthModalOpen}
        isAuthModalOpen={isAuthModalOpen}
        handleOpenFullScreen={handleCloseFullScreen}
      />
    </div>
  );
};

export default FullScreenControls;