// my-gallery/src/Diptychs/DownloadButton.tsx
import React from 'react';
import { fabric } from 'fabric';
import { downloadDiptych, generateFilename } from './downloadDiptych';
import { LayoutSpecs } from './LayoutSpecs'; // Import LayoutSpecs
import { createOffScreenCanvas } from './createOffScreenCanvas';
import styles from './DiptychControls.module.css';

interface DownloadButtonProps {
  photoId: string;
  DiptychIdCode: string;
  fabricCanvasRef: fabric.Canvas | null; // Adjusted type
  layoutSpecs: LayoutSpecs;
  areShapesVisible: boolean; // Add this line
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ photoId, DiptychIdCode, fabricCanvasRef, layoutSpecs, areShapesVisible}) => {
  console.log('DownloadButton Props:', { photoId, DiptychIdCode, fabricCanvasRef, layoutSpecs });
  const handleDownload = async () => {
    if (!fabricCanvasRef || !layoutSpecs) return;

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
    downloadDiptych(fullSizeDataURL, photoId, DiptychIdCode);
  };

  return (
    <button className={styles.button} onClick={handleDownload}>Download Art</button>
  );
};

export default DownloadButton;
