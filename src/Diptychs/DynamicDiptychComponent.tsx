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
    // const [isMounted, setIsMounted] = useState(true);


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
    // Ensure the canvas is not null before attempting to update visibility
    if (fabricCanvas.current && shapeRefs.current.shapesImg && shapeRefs.current.mirroredShapesImg) {
      console.log('Updating shape visibility to:', shapesVisibilityRef.current);
      shapeRefs.current.shapesImg.visible = shapesVisibilityRef.current;
      shapeRefs.current.mirroredShapesImg.visible = shapesVisibilityRef.current;
      fabricCanvas.current.renderAll(); // Safe to call renderAll() because we checked fabricCanvas.current is not null
    } else {
      console.log('Canvas or shape references are not ready.');
    }
  }, []);  

  useEffect(() => {
    console.log('useEffect for shapesVisibilityRef and isCanvasReady triggered', { areShapesVisible, isCanvasReady });
    shapesVisibilityRef.current = areShapesVisible;
    if (isCanvasReady) {
      console.log(`[Shapes Visibility] Before updating shapes visibility: ${areShapesVisible}`);
      setTimeout(() => updateShapesVisibility(), 0);
    }
  }, [areShapesVisible, isCanvasReady, updateShapesVisibility]);  
  
  useEffect(() => {
    console.log(`[Initialization useEffect] Called for ${DiptychIdCode} with photoId: ${photoId}`);
    if (!fabricCanvas.current && canvasRef.current && DiptychIdCode && photoId) {
      console.log(`[Initialization useEffect] Before initializing canvas for ${DiptychIdCode}`);
      fabricCanvas.current = initializeCanvas(canvasRef, diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations]);
      console.log(`[Initialization useEffect] After initializing canvas for ${DiptychIdCode}`);
      console.log('[Initialization useEffect] Canvas dimensions after initialization:', canvasRef.current?.width, canvasRef.current?.height);
      console.log('[Initialization useEffect] Canvas initialized:', !!fabricCanvas.current); 
    }
  
    return () => {
      console.log(`[Initialization useEffect] Cleanup for ${DiptychIdCode}`);
      // setIsMounted(false); // Set isMounted to false when the component is about to unmount
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
        console.log(`[Initialization useEffect] Canvas disposed for ${DiptychIdCode}`);
        fabricCanvas.current = null;
      }
    };
  }, []); // This will only run once on mount
  
  
  // Function to update the canvas with new layout specs
  const updateCanvas = async (canvas: fabric.Canvas, photoId: string, DiptychIdCode: string, areShapesVisible: boolean | undefined) => {
    console.log('updateCanvas called with:', { photoId, DiptychIdCode, areShapesVisible });
    console.log(`[updateCanvas] Starting update: ${DiptychIdCode}`);
  
    if (!fabricCanvas.current) {
      console.error('fabricCanvas ref is not current or valid.');
      return;
    }
  
    console.log('[updateCanvas] Before fetching photo details');
    const photoDetails = await fetchPhotoDetails(photoId);
    console.log('[updateCanvas] After fetching photo details:', photoDetails);
  
    if (!photoDetails) {
      console.log('[updateCanvas] No photo details found, aborting update');
      return;
    }

  
    // Define layout specifications
    const layoutSpecs: LayoutSpecs = {
      ...diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations],
      DiptychIdCode,
      photoId: photoDetails.photoID,
      photoUrl: getPhotoUrl(photoDetails.imagePath),
      mirroredPhotoUrl: getPhotoUrl(photoDetails.imagePath),
      photoPlacement: {
        ...config.photoPlacement,
        originX: 'center', 
        originY: 'center', 
      },
      mirroredPhotoPlacement: {
        ...config.mirroredPhotoPlacement,
        originX: 'center', 
        originY: 'center', 
      },
    };

    // Clear the canvas first
    if (fabricCanvas.current) {
      fabricCanvas.current.clear();
    console.log('Canvas object count after clear:', fabricCanvas.current.getObjects().length);
    }

    // Perform the layout update
    console.log('[updateCanvas] Before layout update');
    const result = await layoutDiptych(canvas, layoutSpecs, false, areShapesVisible);
    console.log('[updateCanvas] After layout update:', result);

    if (result) {
      scaleCanvas(fabricCanvas.current, config.originalWidth, config.originalHeight, containerRef.current, (newHeight: number) => {
        console.log('Canvas dimensions after initial scaling:', fabricCanvas.current?.getWidth(), fabricCanvas.current?.getHeight());
        if (updateHeight) {
          updateHeight(newHeight, DiptychIdCode);  
        }
        console.log('[updateCanvas] After scaling canvas');
      });
      // Update shape visibility if needed
      updateShapesVisibility();

      // Set canvas as ready and re-render to apply the updates
      setIsCanvasReady(true);
      fabricCanvas.current.renderAll();

      // Notify parent components that the canvas is ready
      onCanvasReady?.(fabricCanvas.current, DiptychIdCode);
      onLayoutSpecsReady?.(layoutSpecs);
      console.log('[updateCanvas] Update complete for', { DiptychIdCode });
  } else {
    console.error('[updateCanvas] layoutDiptych did not return a result');
    }
  };

  useEffect(() => {
    console.log(`[Props Change useEffect] Called for ${DiptychIdCode} with photoId: ${photoId} and areShapesVisible: ${areShapesVisible}`);
    if (fabricCanvas.current && photoId && DiptychIdCode) {
      console.log(`[Props Change useEffect] Updating canvas for changes in props for ${DiptychIdCode}`);
      updateCanvas(fabricCanvas.current, photoId, DiptychIdCode, areShapesVisible);
    }
  
    return () => {
      console.log(`[Props Change useEffect] Cleanup for ${DiptychIdCode}`);
      // Here you would add cleanup for this effect if needed.
    };
  }, [photoId, DiptychIdCode, areShapesVisible]);
  
  
  useEffect(() => {
    console.log('useEffect for resize handling triggered', { DiptychIdCode });
    const handleResize = () => {
      console.log('Handling resize in DynamicDiptychComponent', { width: containerRef.current?.clientWidth, height: containerRef.current?.clientHeight });
      if (fabricCanvas.current && containerRef.current) {
        // const config = diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations];
        scaleCanvas(fabricCanvas.current, config.originalWidth, config.originalHeight, containerRef.current, (newHeight: number) => {
          console.log('Canvas dimensions after resize:', { width: fabricCanvas.current?.getWidth(), height: fabricCanvas.current?.getHeight() });
          if (updateHeight) {
            updateHeight(newHeight, DiptychIdCode);  
          }
        });
      }
    };
  
    console.log('[Resize Handling] Adding resize event listener');
    window.addEventListener('resize', handleResize);
    return () => {
      console.log('[Resize Handling] Removing resize event listener');
      console.log('useEffect for resize handling cleanup', { DiptychIdCode });
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, DiptychIdCode]);
  
  

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={canvasStyles} />
    </div>
  );
};

export default React.memo(DynamicDiptychComponent);