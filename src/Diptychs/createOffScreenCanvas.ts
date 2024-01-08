// my-gallery/src/Diptychs/createOffScreenCanvas.ts

import { fabric } from 'fabric';
import { layoutDiptych } from './layoutDiptych';
import { LayoutSpecs } from './LayoutSpecs';

// The interface for the layout specifications can be imported or simply declared here, if needed.

export const createOffScreenCanvas = async (
  layoutSpecs: LayoutSpecs,
  originalWidth: number, 
  originalHeight: number,
  areShapesVisible: boolean = false 
): Promise<fabric.Canvas | null> => {
  
  const offScreenCanvasElement = document.createElement('canvas');
  offScreenCanvasElement.width = originalWidth;
  offScreenCanvasElement.height = originalHeight;

  const offScreenCanvas = new fabric.Canvas(offScreenCanvasElement, {
    selection: false,
    interactive: false,
  });

  console.log("Layout Specs:", layoutSpecs); // Log the layout specs

  // Pass the areShapesVisible parameter to layoutDiptych
  console.log("Creating off-screen canvas with areShapesVisible:", areShapesVisible);
  const result = await layoutDiptych(offScreenCanvas, layoutSpecs, true, areShapesVisible);
    // Check if result is not null before proceeding
  if (!result) {
    console.error("Error in layoutDiptych, result is null");
    return null;
  }

  console.log("Result from layoutDiptych:", result); // Log the result

  const { frameImg, photoImg, mirroredImg, shapesImg, mirroredShapesImg } = result;

  let objectsToAdd = [frameImg, photoImg, mirroredImg];

  // Add shapes to the objects array if they are visible
  if (areShapesVisible && shapesImg && mirroredShapesImg) {
    objectsToAdd.push(shapesImg, mirroredShapesImg);
  }

  // Create a group with the images
  const group = new fabric.Group(objectsToAdd, {
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  });

  // Set the group's position to the center of the off-screen canvas
  group.set({
    left: offScreenCanvasElement.width / 4,
    top: offScreenCanvasElement.height / 4,
  });

  // Add the group to the off-screen canvas and render it
  offScreenCanvas.add(group);
  offScreenCanvas.renderAll();

  return offScreenCanvas;
};

