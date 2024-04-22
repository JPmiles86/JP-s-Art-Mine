// my-gallery/src/components/layout/DownloadFavsButton.tsx
import React from 'react';
import { fabric } from 'fabric';
import { downloadDiptych, generateFilename } from './downloadDiptych';
import { LayoutSpecs } from '../../Diptychs/LayoutSpecs';
import { createOffScreenCanvas } from '../../Diptychs/createOffScreenCanvas';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface DownloadFavsButtonProps {
  photoId: string;
  diptychIdCode: string;
  fabricCanvasRef: fabric.Canvas | undefined;
  layoutSpecs?: LayoutSpecs;
  areShapesVisible: boolean;
  size?: string;
}

const DownloadFavsButton: React.FC<DownloadFavsButtonProps> = ({ photoId, diptychIdCode, fabricCanvasRef, layoutSpecs, areShapesVisible, size }) => {
    console.log('DownloadFavsButton props:', { photoId, diptychIdCode, fabricCanvasRef, layoutSpecs, areShapesVisible, size });
    const buttonClass = size === 'small' ? `${buttonStyles.button} ${buttonStyles.small}` : buttonStyles.button;

const handleDownload = async () => {
    if (!fabricCanvasRef || !layoutSpecs || !Object.keys(layoutSpecs).length) {
        console.log("DownloadFavsButton missing data:", { fabricCanvasRef, layoutSpecs });
        return;
    }
    
    // Create off-screen canvas with full-resolution layout specs
    const offScreenCanvas = await createOffScreenCanvas(layoutSpecs, layoutSpecs.originalWidth, layoutSpecs.originalHeight, areShapesVisible);
      
    if (!offScreenCanvas) {
      console.error('Failed to create off-screen canvas');
      return;
    }

    // Generate data URL from the off-screen canvas
    const fullSizeDataURL = offScreenCanvas.toDataURL({
      format: 'png',
      multiplier: 1, // Ensure full resolution
    });

    // Initiate download
    downloadDiptych(fullSizeDataURL, photoId, diptychIdCode);
  };

  return (
    <button className={buttonClass} onClick={handleDownload}>Download Art</button>
  );
};

export default DownloadFavsButton;