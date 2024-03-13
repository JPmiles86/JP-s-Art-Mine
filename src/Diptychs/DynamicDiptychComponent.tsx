// my-gallery/src/Diptychs/DynamicDiptychComponent.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import urlConfig from '../screens/urlConfig';
import { scaleCanvas } from './scaleCanvas';
import { layoutDiptych } from './layoutDiptych';
import initializeCanvas from './initializeCanvas';
import { diptychConfigurations } from '../Diptychs/diptychFabricConfigurations';
import { LayoutSpecs } from './LayoutSpecs';

// Helper function to get photo URL
export function getPhotoUrl(imagePath: string) {
  const pathIndex = imagePath.indexOf('/originals');
  return pathIndex >= 0 ? `${urlConfig.baseURL}${imagePath.slice(pathIndex + '/originals'.length)}` : imagePath;
}

interface DynamicDiptychComponentProps {
  photoId: string;
  imagePath: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onCanvasReady: (canvasRef: fabric.Canvas, DiptychIdCode: string) => void;
  DiptychIdCode: string;
  areShapesVisible?: boolean;
  updateHeight?: (height: number, diptychIdCode: string) => void;
  onLayoutSpecsReady?: (layoutSpecs: LayoutSpecs) => void;
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

const DynamicDiptychComponent: React.FC<DynamicDiptychComponentProps> = ({
  photoId,
  imagePath,
  containerRef,
  onCanvasReady,
  DiptychIdCode,
  areShapesVisible,
  updateHeight,
  onLayoutSpecsReady,
}) => {
  console.log('DynamicDiptychComponent Mounted', { DiptychIdCode, photoId });
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const shapesVisibilityRef = useRef(areShapesVisible);
  const config = diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations];
  const isMounted = useRef(false);

  const shapeRefs = useRef<{
    shapesImg: fabric.Image | null;
    mirroredShapesImg: fabric.Image | null;
  }>({
    shapesImg: null,
    mirroredShapesImg: null,
  });

  const canvasStyles: CanvasStyles = {
    display: 'block',
    visibility: isCanvasReady && !isUpdating ? 'visible' : 'hidden',
    width: '100%',
    height: '100%',
    transition: 'opacity 0.3s ease-in-out', // Add a smooth transition effect
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
    console.log('useEffect for shapesVisibilityRef and isCanvasReady triggered', {
      areShapesVisible,
      isCanvasReady,
    });
    shapesVisibilityRef.current = areShapesVisible;
    if (isCanvasReady) {
      console.log(`[Shapes Visibility] Before updating shapes visibility: ${areShapesVisible}`);
      setTimeout(() => updateShapesVisibility(), 0);
    }
  }, [areShapesVisible, isCanvasReady, updateShapesVisibility]);

  useEffect(() => {
    isMounted.current = true;

    console.log(`[Initialization useEffect] Called for ${DiptychIdCode} with photoId: ${photoId}`);
    if (!fabricCanvas.current && canvasRef.current && DiptychIdCode && photoId && imagePath) {
      console.log(`[Initialization useEffect] Before initializing canvas for ${DiptychIdCode}`);
      fabricCanvas.current = initializeCanvas(
        canvasRef,
        diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations]
      );
      console.log(`[Initialization useEffect] After initializing canvas for ${DiptychIdCode}`);
      console.log(
        '[Initialization useEffect] Canvas dimensions after initialization:',
        canvasRef.current?.width,
        canvasRef.current?.height
      );
      console.log('[Initialization useEffect] Canvas initialized:', !!fabricCanvas.current);
    }

    return () => {
      console.log(`[Initialization useEffect] Cleanup for ${DiptychIdCode}`);
      if (isMounted.current && fabricCanvas.current) {
        isMounted.current = false;
        fabricCanvas.current.dispose();
        console.log(`[Initialization useEffect] Canvas disposed for ${DiptychIdCode}`);
        fabricCanvas.current = null;
      }
    };
  }, []);

  // Wrap any canvas manipulation in this function to ensure safety
  const safeCanvasOperation = (operation: () => void) => {
    if (isMounted.current && fabricCanvas.current && fabricCanvas.current.getElement()) {
      console.log('[DynamicDiptychComponent] Canvas is ready for operations.');
      operation();
    } else {
      console.warn('Attempted canvas operation on unmounted component or before canvas initialization.');
    }
  };

  // Function to update the canvas with new layout specs
  const updateCanvas = async () => {
    console.log('updateCanvas called');

    if (!fabricCanvas.current || !fabricCanvas.current.getElement()) {
      console.error('fabricCanvas ref is not current or valid.');
      return;
    }

    const layoutSpecs: LayoutSpecs = {
      ...diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations],
      DiptychIdCode,
      photoId,
      photoUrl: getPhotoUrl(imagePath),
      mirroredPhotoUrl: getPhotoUrl(imagePath),
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

    safeCanvasOperation(async () => {
      console.log('[DynamicDiptychComponent] Before clearing canvas', { canvas: fabricCanvas.current });
      fabricCanvas.current!.clear();
      console.log('[DynamicDiptychComponent] Canvas cleared');

      console.log('[DynamicDiptychComponent] Before calling layoutDiptych', { layoutSpecs });
      const result = await layoutDiptych(fabricCanvas.current!, layoutSpecs, false, shapesVisibilityRef.current);
      console.log('[DynamicDiptychComponent] After calling layoutDiptych', { result });

      if (result) {
        scaleCanvas(
          fabricCanvas.current!,
          config.originalWidth,
          config.originalHeight,
          containerRef.current,
          (newHeight: number) => {
            console.log('[DynamicDiptychComponent] After scaling canvas', { newHeight });
            if (updateHeight) {
              updateHeight(newHeight, DiptychIdCode);
            }
          }
        );
        updateShapesVisibility();
        setIsCanvasReady(true);
        fabricCanvas.current!.renderAll();

        onCanvasReady?.(fabricCanvas.current!, DiptychIdCode);
        onLayoutSpecsReady?.(layoutSpecs);
        console.log('[updateCanvas] Update complete for', { DiptychIdCode });
      } else {
        console.error('[updateCanvas] layoutDiptych did not return a result');
      }
    });
  };

  useEffect(() => {
    if (fabricCanvas.current && photoId && DiptychIdCode && imagePath) {
      updateCanvas();
    }
  }, [photoId, DiptychIdCode, imagePath, areShapesVisible]);

  useEffect(() => {
    console.log('useEffect for resize handling triggered', { DiptychIdCode });
    const handleResize = () => {
      console.log('Handling resize in DynamicDiptychComponent', {
        width: containerRef.current?.clientWidth,
        height: containerRef.current?.clientHeight,
      });
      if (fabricCanvas.current && containerRef.current) {
        scaleCanvas(
          fabricCanvas.current,
          config.originalWidth,
          config.originalHeight,
          containerRef.current,
          (newHeight: number) => {
            console.log('Canvas dimensions after resize:', {
              width: fabricCanvas.current?.getWidth(),
              height: fabricCanvas.current?.getHeight(),
            });
            if (updateHeight) {
              updateHeight(newHeight, DiptychIdCode);
            }
          }
        );
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