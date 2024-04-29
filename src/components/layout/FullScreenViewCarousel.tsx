// my-gallery/src/components/layout/FullScreenViewCarousel.tsx

// FullScreenViewCarousel.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DiptychCarouselDynamic from '../../Diptychs/DiptychCarouselDynamic';
import DiptychCarousel from '../../Diptychs/DiptychCarousel';
import { LayoutSpecs } from '../../Diptychs/LayoutSpecs';
import './FullScreenViewCarousel.css';

interface FullScreenViewCarouselProps {
  open: boolean;
  onClose: () => void;
  photoId: string;
  imagePath: string;
  diptychId: number;
  aspectRatio: string;
  areShapesVisible: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  handleCanvasReady: (canvasRef: fabric.Canvas, diptychIdCode: string) => void;
  handleLayoutSpecsReady: (layoutSpecs: LayoutSpecs) => void;
  onDiptychIdCodeChange: (code: string) => void;
}

const FullScreenViewCarousel: React.FC<FullScreenViewCarouselProps> = ({
  open,
  onClose,
  photoId,
  imagePath,
  diptychId,
  aspectRatio,
  areShapesVisible,
  containerRef,
  handleCanvasReady,
  handleLayoutSpecsReady,
  onDiptychIdCodeChange,
}) => {
  // ... (implementation similar to FullScreenView)

  if (!open) return null;

  return (
    <Box
      className="full-screen-carousel"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor="rgba(0, 0, 0, 0.9)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
      overflow="auto"
    >
      <Box position="absolute" top={8} right={8} zIndex={9999}>
        <IconButton onClick={onClose} style={{ color: 'white', cursor: 'pointer' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box width="90%" height="90%" ref={containerRef}>
      {diptychId === 1 ? (
        <DiptychCarouselDynamic
          photoId={photoId}
          imagePath={imagePath}
          frameId={3}
          diptychId={diptychId}
          aspectRatio={aspectRatio}
          areShapesVisible={areShapesVisible}
          containerRef={containerRef}
          handleCanvasReady={handleCanvasReady}
          handleLayoutSpecsReady={handleLayoutSpecsReady}
          onDiptychIdCodeChange={onDiptychIdCodeChange}
        />
      ) : (
        <DiptychCarousel
          photoId={photoId}
          imagePath={imagePath}
          frameId={3}
          diptychId={diptychId}
          aspectRatio={aspectRatio}
          areShapesVisible={areShapesVisible}
          containerRef={containerRef}
          handleCanvasReady={handleCanvasReady}
          handleLayoutSpecsReady={handleLayoutSpecsReady}
          onDiptychIdCodeChange={onDiptychIdCodeChange}
        />
      )}
      </Box>
    </Box>
  );
};

export default FullScreenViewCarousel;
//export {};