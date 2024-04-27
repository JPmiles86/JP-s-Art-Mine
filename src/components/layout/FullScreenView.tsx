// my-gallery/src/components/layout/FullScreenView.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { diptychConfigurations } from '../../Diptychs/diptychFabricConfigurations';

interface FullScreenViewProps {
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
  diptychIdCode: string;
}

const FullScreenView: React.FC<FullScreenViewProps> = ({ open, onClose, onPrev, onNext, children, diptychIdCode }) => {
  const [maxDimensions, setMaxDimensions] = useState({ width: 0, height: 0 });

  const updateMaxDimensions = useCallback(() => {
    const config = diptychConfigurations[diptychIdCode as keyof typeof diptychConfigurations];
    const aspectRatio = config ? config.originalWidth / config.originalHeight : 16 / 9;

    const maxWidth = window.innerWidth * 0.97;
    const maxHeight = window.innerHeight * 0.97;

    const calculatedWidth = maxHeight * aspectRatio;
    const calculatedHeight = maxWidth / aspectRatio;

    const finalWidth = calculatedWidth > maxWidth ? maxWidth : calculatedWidth;
    const finalHeight = calculatedHeight > maxHeight ? maxHeight : calculatedHeight;

    setMaxDimensions({ width: finalWidth, height: finalHeight });
  }, [diptychIdCode]);

  useEffect(() => {
    updateMaxDimensions();
    const handleResize = () => {
      updateMaxDimensions();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateMaxDimensions]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        onPrev();
      } else if (event.key === 'ArrowRight') {
        onNext();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPrev, onNext, onClose]);

  if (!open) return null;

  return (
    <Box
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
      <Box
        position="absolute"
        left={8}
        top="50%"
        sx={{ transform: 'translateY(-50%)', zIndex: 9998 }}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        width="50%"
        height="100%"
      >
        <IconButton onClick={onPrev} style={{ color: 'white' }}>
          <NavigateBeforeIcon />
        </IconButton>
      </Box>
      <Box
        position="absolute"
        right={8}
        top="50%"
        sx={{ transform: 'translateY(-50%)', zIndex: 9998 }}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        width="50%"
        height="100%"
      >
        <IconButton onClick={onNext} style={{ color: 'white' }}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
      <Box width={maxDimensions.width} height={maxDimensions.height}>
        {children}
      </Box>
    </Box>
  );
};

export default FullScreenView;