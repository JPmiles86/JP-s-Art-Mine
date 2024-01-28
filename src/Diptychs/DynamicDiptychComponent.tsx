// my-gallery/src/Diptychs/DynamicDiptychComponent.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import urlConfig from '../screens/urlConfig';
import { scaleCanvas } from './scaleCanvas';
import { layoutDiptych } from './layoutDiptych';
import initializeCanvas from './initializeCanvas';
import useFetchPhotoDetails from './useFetchPhotoDetails';
import { diptychConfigurations } from '../Diptychs/diptychFabricConfigurations';
import { LayoutSpecs } from './LayoutSpecs';
import applyLayoutAndScaling from './applyLayoutAndScaling';

// Helper function to get photo URL
export function getPhotoUrl(imagePath: string) {
  const pathIndex = imagePath.indexOf('/originals');
  return pathIndex >= 0 ? `${urlConfig.baseURL}${imagePath.slice(pathIndex + '/originals'.length)}` : imagePath;
}

interface DynamicDiptychComponentProps {
  photoId: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onCanvasReady: (canvasRef: fabric.Canvas, DiptychIdCode: string) => void;
  DiptychIdCode: string;
  areShapesVisible?: boolean;
  updateHeight?: (height: number, diptychIdCode: string) => void;
  onLayoutSpecsReady?: (layoutSpecs: LayoutSpecs) => void; // New callback prop
}

interface Placement {
    angle: number;
    left: number;
    top?: number;
    originX: 'center' | 'left' | 'right';
    originY: 'center' | 'top' | 'bottom';
    flipX?: boolean;
  }

  type CanvasStyles = React.CSSProperties & {
    visibility: 'visible' | 'hidden';
  };
  

  const DynamicDiptychComponent: React.FC<DynamicDiptychComponentProps> = ({ photoId, containerRef, onCanvasReady, DiptychIdCode, areShapesVisible, updateHeight, onLayoutSpecsReady }) => {
    console.log('DynamicDiptychComponent Mounted', { DiptychIdCode, photoId });
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvas = useRef<fabric.Canvas | null>(null);
    const shapesVisibilityRef = useRef(areShapesVisible);
    const config = diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations];
    const fetchPhotoDetails = useFetchPhotoDetails();

    const shapeRefs = useRef<{
      shapesImg: fabric.Image | null,
      mirroredShapesImg: fabric.Image | null
    }>({
      shapesImg: null,
      mirroredShapesImg: null
    });
    
    const canvasStyles: CanvasStyles = {
      display: 'block', // Always display as a block
      visibility: isCanvasReady ? 'visible' : 'hidden', // Control visibility instead of rendering
      width: '100%',
      height: '100%'
    };

  // Function to update shapes visibility on canvas
  const updateShapesVisibility = useCallback(() => {
   console.log('Attempting to update shape visibility:', shapesVisibilityRef.current);

    if (fabricCanvas.current && shapeRefs.current.shapesImg && shapeRefs.current.mirroredShapesImg) {
      console.log('Updating shape visibility to:', shapesVisibilityRef.current);
      shapeRefs.current.shapesImg.visible = shapesVisibilityRef.current;
      shapeRefs.current.mirroredShapesImg.visible = shapesVisibilityRef.current;
      fabricCanvas.current.renderAll();
    } else {
      console.log('Canvas or shape references are not ready.');
    }
  }, []);

  useEffect(() => {
    console.log('useEffect for shapesVisibilityRef and isCanvasReady triggered', { areShapesVisible, isCanvasReady });
    shapesVisibilityRef.current = areShapesVisible;
    if (isCanvasReady) {
      // Defer the update to ensure canvas is in a valid state
      setTimeout(() => updateShapesVisibility(), 0);
    }
  }, [areShapesVisible, isCanvasReady, updateShapesVisibility]);
  

  useEffect(() => {
    console.log('useEffect for component setup and shapes visibility triggered', { DiptychIdCode, photoId, areShapesVisible });
    let isMounted = true;
  
    // Early exit if we don't have the necessary IDs.
    if (!DiptychIdCode || !photoId) {
      console.log("Waiting for DiptychIdCode and photoId");
      return;
    }

    async function setupCanvas() {
      console.log(`Setting up canvas for ${DiptychIdCode}`);

      const config = diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations];
      if (!config) {
        console.error('Configuration not found for DiptychIdCode:', DiptychIdCode);
        return;
      }

      fabricCanvas.current = initializeCanvas(canvasRef, config);
      if (!fabricCanvas.current) return;

      const photoDetails = photoId ? await fetchPhotoDetails(photoId):null;
      if (!photoDetails) return;

       const layoutSpecs = {
          ...config as LayoutSpecs,
        DiptychIdCode,
        photoId: photoDetails.photoID,
        photoUrl: getPhotoUrl(photoDetails.imagePath),
        mirroredPhotoUrl: getPhotoUrl(photoDetails.imagePath),
      };

      // Call the new callback with the constructed layout specs
      onLayoutSpecsReady?.(layoutSpecs);

      if (isMounted) {
        const result = await layoutDiptych(fabricCanvas.current, layoutSpecs, false, areShapesVisible);
        const { shapesImg, mirroredShapesImg } = result || {};
        shapeRefs.current = { shapesImg, mirroredShapesImg };
  
        // Ensure canvas is properly scaled before making it visible
        scaleCanvas(fabricCanvas.current, config.originalWidth, config.originalHeight, containerRef.current, (newHeight: number) => {
          if (updateHeight) {
            updateHeight(newHeight, DiptychIdCode);
          }
          // Set canvas ready state after scaling
          setIsCanvasReady(true);
        });
  
        onCanvasReady?.(fabricCanvas.current, DiptychIdCode);
  
        console.log('Canvas setup complete. Ensuring shapes visibility is correct.');
        updateShapesVisibility();
      }
    }
  
    setupCanvas();  

    return () => {
      isMounted = false;
      fabricCanvas.current?.dispose();
      console.log('DynamicDiptychComponent Unmounted', { DiptychIdCode });
    };
  }, [photoId, DiptychIdCode, areShapesVisible, fetchPhotoDetails]);

  useEffect(() => {
    console.log('useEffect for resize handling triggered', { DiptychIdCode });
    const handleResize = () => {
      console.log('Handling resize in DynamicDiptychComponent');
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
      <canvas ref={canvasRef} style={canvasStyles} />
    </div>
  );
};

export default React.memo(DynamicDiptychComponent);