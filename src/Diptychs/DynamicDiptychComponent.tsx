// my-gallery/src/Diptychs/DynamicDiptychComponent.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import useStore from '../utils/store';
import urlConfig from '../screens/urlConfig';
// import { dataService } from '../utils/DataService';
import { scaleCanvas } from './scaleCanvas';
import { layoutDiptych, LayoutDiptychResult } from './layoutDiptych';
import initializeCanvas from './initializeCanvas';
import applyLayoutAndScaling from './applyLayoutAndScaling';

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
    const shapesVisibilityRef = useRef(areShapesVisible);

    const shapeRefs = useRef<{
      shapesImg: fabric.Image | null,
      mirroredShapesImg: fabric.Image | null
    }>({
      shapesImg: null,
      mirroredShapesImg: null
    });
    

    const fetchPhotoDetails = useCallback(async (photoId: string) => {
      console.log('fetchPhotoDetails triggered');
      try {
        const response = await fetch(`/api/photos/${photoId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching photo details:', error);
        return null;
      }
    }, []);

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
    shapesVisibilityRef.current = areShapesVisible;
    if (isCanvasReady) {
      // Defer the update to ensure canvas is in a valid state
      setTimeout(() => updateShapesVisibility(), 0);
    }
  }, [areShapesVisible, isCanvasReady, updateShapesVisibility]);
  

  useEffect(() => {
    console.log("DynamicDiptychComponent render or re-render");
    let isMounted = true;

    if (!DiptychIdCode) {
      console.log("Waiting for DiptychIdCode");
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

       // Update fabricCanvasRef in store
      setFabricCanvasRef(DiptychIdCode, fabricCanvas.current);

      const photoDetails = photoId ? await fetchPhotoDetails(photoId) : selectedPhoto;
      if (!photoDetails) return;

       const layoutSpecs = {
          ...config as LayoutSpecs,
        DiptychIdCode,
        photoId: photoDetails.photoID,
        photoUrl: getPhotoUrl(photoDetails.imagePath),
        mirroredPhotoUrl: getPhotoUrl(photoDetails.imagePath),
      };

      useStore.getState().setLayoutSpecs(DiptychIdCode, layoutSpecs);
      console.log(`Layout specs set for ${DiptychIdCode}:`, layoutSpecs);

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

        console.log('Canvas is ready. Setting initial visibility for shapes.');
        // Set initial visibility for shapes
        updateShapesVisibility();
      }
    }

    setupCanvas();

    return () => {
      isMounted = false;
      clearFabricCanvasRef(DiptychIdCode);
      fabricCanvas.current?.dispose();
    };
  }, [photoId, selectedPhoto, DiptychIdCode, areShapesVisible, fetchPhotoDetails, updateShapesVisibility]);

  useEffect(() => {
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
      <canvas ref={canvasRef} style={{ display: isCanvasReady ? 'block' : 'none', width: '100%', height: '100%' }} />
    </div>
  );
};

export default React.memo(DynamicDiptychComponent);