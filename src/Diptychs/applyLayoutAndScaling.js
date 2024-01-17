// applyLayoutAndScaling.js
import { scaleCanvas } from './scaleCanvas';
import { layoutDiptych } from './layoutDiptych';
import { LayoutSpecs } from './LayoutSpecs';

const applyLayoutAndScaling = async (canvas, layoutSpecs, containerRef, areShapesVisible, updateHeight, DiptychIdCode) => {
  if (!canvas) return;

  await layoutDiptych(canvas, layoutSpecs, false, areShapesVisible);

  scaleCanvas(canvas, layoutSpecs.originalWidth, layoutSpecs.originalHeight, containerRef.current, (calculatedHeight) => {
    if (updateHeight) {
      updateHeight(calculatedHeight, DiptychIdCode);
    }
  });
};

export default applyLayoutAndScaling;
