// initializeCanvas.js
import { fabric } from 'fabric';

const initializeCanvas = (canvasRef, config) => {
  if (!canvasRef.current) return null;

  const canvas = new fabric.Canvas(canvasRef.current, {
    selection: false,
    interactive: false,
    width: config.originalWidth,
    height: config.originalHeight,
  });

  return canvas;
};

export default initializeCanvas;
