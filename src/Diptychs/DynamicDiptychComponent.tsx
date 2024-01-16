// my-gallery/src/Diptychs/DynamicDiptychComponent.tsx

import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import useStore from '../screens/store';
import urlConfig from '../screens/urlConfig';
import { dataService } from '../screens/DataService';
import { scaleCanvas } from './scaleCanvas';
import { layoutDiptych } from './layoutDiptych';

// Helper function to get photo URL
function getPhotoUrl(imagePath: string) {
  const pathIndex = imagePath.indexOf('/originals');
  return pathIndex >= 0 ? `${urlConfig.baseURL}${imagePath.slice(pathIndex + '/originals'.length)}` : imagePath;
}

interface SetPhotoIdProps {
  photoId: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onCanvasReady: (canvasRef: fabric.Canvas, DiptychIdCode: string) => void;
  DiptychIdCode: string;
  areShapesVisible?: boolean;
  updateHeight?: (height: number, diptychIdCode: string) => void;  // Update here
}

interface Placement {
    angle: number;
    left: number;
    top?: number;
    originX: 'center' | 'left' | 'right';
    originY: 'center' | 'top' | 'bottom';
    flipX?: boolean;
  }

interface LayoutSpecs {
    photoId: string;
    DiptychIdCode: string;
    frameImagePath: string;
    shapesImagePath: string;
    photoUrl: string;
    mirroredPhotoUrl: string;
    originalWidth: number;
    originalHeight: number;
    photoPlacement: Placement;
    mirroredPhotoPlacement: Placement;
  }

  const DynamicDiptychComponent: React.FC<SetPhotoIdProps> = ({ photoId, containerRef, onCanvasReady, DiptychIdCode, areShapesVisible, updateHeight }) => {
    const { selectedPhoto, setFabricCanvasRef, clearFabricCanvasRef, diptychConfigurations } = useStore();
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvas = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        let isMounted = true;

    async function setupCanvas() {
      if (!canvasRef.current) return;

      const config = diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations];
      if (!config) {
        console.error('Configuration not found for DiptychIdCode:', DiptychIdCode);
        return;
      }
    
      // Cast config to LayoutSpecs type
      const layoutConfig: LayoutSpecs = config as LayoutSpecs;

      const canvas = new fabric.Canvas(canvasRef.current, {
        selection: false,
        interactive: false,
        width: config.originalWidth,
        height: config.originalHeight,
      });

      fabricCanvas.current = canvas;

      const photoDetails = photoId ? await dataService.fetchPhotoDetails(photoId) : selectedPhoto;
      if (!photoDetails) return;

      const layoutSpecs: LayoutSpecs = {
        ...layoutConfig,
        DiptychIdCode,
        photoId: photoDetails.photoID,
        photoUrl: getPhotoUrl(photoDetails.imagePath),
        mirroredPhotoUrl: getPhotoUrl(photoDetails.imagePath),
    };

    // Set layout specs in the store
    useStore.getState().setLayoutSpecs(DiptychIdCode, layoutSpecs);
    console.log(`Layout specs set for ${DiptychIdCode}:`, layoutSpecs);


      setFabricCanvasRef(DiptychIdCode, fabricCanvas.current);

      if (isMounted) {
        const layoutSpecs: LayoutSpecs = {
            ...layoutConfig,
            DiptychIdCode,
            photoId: photoDetails.photoID,
            photoUrl: getPhotoUrl(photoDetails.imagePath),
            mirroredPhotoUrl: getPhotoUrl(photoDetails.imagePath),
        };

        // Call layoutDiptych with the areShapesVisible prop
        await layoutDiptych(fabricCanvas.current, layoutSpecs, false, areShapesVisible);

        scaleCanvas(fabricCanvas.current, config.originalWidth, config.originalHeight, containerRef.current, (calculatedHeight: number) => {
          if (updateHeight) {
            updateHeight(calculatedHeight, DiptychIdCode);  // Pass DiptychIdCode here
          }
          if (isMounted) setIsCanvasReady(true);
        });
      }
    }

    setupCanvas().then(() => {
      if (isMounted && fabricCanvas.current) {
        onCanvasReady?.(fabricCanvas.current, DiptychIdCode);
      }
    });

    return () => {
      isMounted = false;
      clearFabricCanvasRef(DiptychIdCode);
      fabricCanvas.current?.dispose();
      fabricCanvas.current = null;
    };
  }, [photoId, selectedPhoto, containerRef, DiptychIdCode, areShapesVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (fabricCanvas.current && containerRef.current) {
        const config = diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations];
        scaleCanvas(fabricCanvas.current, config.originalWidth, config.originalHeight, containerRef.current, (newHeight: number) => {
          if (updateHeight) {
            updateHeight(newHeight, DiptychIdCode);  
          }
        });
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef, DiptychIdCode]);
  

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: isCanvasReady ? 'block' : 'none', width: '100%', height: '100%' }} />
    </div>
  );
};

export default React.memo(DynamicDiptychComponent);