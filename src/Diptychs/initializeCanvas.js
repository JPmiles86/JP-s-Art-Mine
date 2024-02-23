// my-gallery/src/Diptychs/initializeCanvas.js
import { fabric } from 'fabric';

const initializeCanvas = (canvasRef, config) => {
  console.log('initializeCanvas called', { canvasRef, config });

  if (!canvasRef.current) {
    console.log('Canvas ref is not currently set.');
    return null;
  }

  const canvas = new fabric.Canvas(canvasRef.current, {
    selection: false,
    interactive: false,
    renderOnAddRemove: false, // Add this line
    width: config.originalWidth,
    height: config.originalHeight,
  });  

  console.log('Fabric canvas created', { canvas });

  return canvas;
};


export default initializeCanvas;