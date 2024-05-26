import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import urlConfig from '../utils/urlConfig';
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
  onHeightChange?: (newHeight: number, diptychIdCode: string) => void;
}

type CanvasStyles = React.CSSProperties & {
  visibility: 'visible' | 'hidden';
};

const DynamicDiptychComponent: React.FC<DynamicDiptychComponentProps> = React.memo(({
  photoId,
  imagePath,
  containerRef,
  onCanvasReady,
  DiptychIdCode,
  areShapesVisible,
  updateHeight,
  onLayoutSpecsReady,
  onHeightChange,
}) => {
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [containerHeight, setContainerHeight] = useState('auto');
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
    transition: 'opacity 0.3s ease-in-out',
  };

  const updateShapesVisibility = useCallback(() => {
    if (fabricCanvas.current && shapeRefs.current.shapesImg && shapeRefs.current.mirroredShapesImg) {
      shapeRefs.current.shapesImg.visible = shapesVisibilityRef.current;
      shapeRefs.current.mirroredShapesImg.visible = shapesVisibilityRef.current;
      fabricCanvas.current.renderAll();
    }
  }, []);

  useEffect(() => {
    shapesVisibilityRef.current = areShapesVisible;
    if (isCanvasReady) {
      setTimeout(() => updateShapesVisibility(), 0);
    }
  }, [areShapesVisible, isCanvasReady, updateShapesVisibility]);

  useEffect(() => {
    isMounted.current = true;

    if (!fabricCanvas.current && canvasRef.current && DiptychIdCode && photoId && imagePath) {
      fabricCanvas.current = initializeCanvas(
        canvasRef,
        diptychConfigurations[DiptychIdCode as keyof typeof diptychConfigurations]
      );
    }

    return () => {
      if (isMounted.current && fabricCanvas.current) {
        isMounted.current = false;
        fabricCanvas.current.dispose();
        fabricCanvas.current = null;
      }
    };
  }, []);

  const safeCanvasOperation = (operation: () => void) => {
    if (isMounted.current && fabricCanvas.current && fabricCanvas.current.getElement()) {
      operation();
    }
  };

  const updateCanvas = async () => {
    setIsUpdating(true);

    if (!fabricCanvas.current || !fabricCanvas.current.getElement()) {
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
      fabricCanvas.current!.clear();

      const result = await layoutDiptych(fabricCanvas.current!, layoutSpecs, false, shapesVisibilityRef.current);

      if (result) {
        const newHeight = scaleCanvas(
          fabricCanvas.current!,
          config.originalWidth,
          config.originalHeight,
          containerRef.current,
          (newHeight: number) => {
            if (updateHeight) {
              updateHeight(newHeight, DiptychIdCode);
            }
            setContainerHeight(`${newHeight}px`);
          }
        );
        updateShapesVisibility();
        setIsCanvasReady(true);
        fabricCanvas.current!.renderAll();

        onCanvasReady?.(fabricCanvas.current!, DiptychIdCode);
        onLayoutSpecsReady?.(layoutSpecs);
      }
      setIsUpdating(false);
    });
  };

  useEffect(() => {
    if (fabricCanvas.current && photoId && DiptychIdCode && imagePath) {
      updateCanvas().then(() => {
        setIsCanvasReady(true);
      });
    }
  }, [photoId, DiptychIdCode, imagePath, areShapesVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (fabricCanvas.current && containerRef.current) {
        const newHeight = scaleCanvas(
          fabricCanvas.current,
          config.originalWidth,
          config.originalHeight,
          containerRef.current,
          (newHeight: number) => {
            if (onHeightChange) {
              onHeightChange(newHeight, DiptychIdCode);
            }
          }
        );
      }
    };

    handleResize(); // Call handleResize initially to set the correct height

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, DiptychIdCode, onHeightChange]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: containerHeight, position: 'relative', border: '2px dotted purple', visibility: isCanvasReady ? 'visible' : 'hidden' }}>
      <canvas ref={canvasRef} style={canvasStyles} />
    </div>
  );
});

export default React.memo(DynamicDiptychComponent);