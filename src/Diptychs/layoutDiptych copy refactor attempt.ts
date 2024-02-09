// my-gallery/src/Diptychs/layoutDiptych.ts

import { fabric } from 'fabric';
import { LayoutSpecs } from './LayoutSpecs';

// Define the return type for layoutDiptych
export interface LayoutDiptychResult {
  frameImg: fabric.Image | null;
  photoImg: fabric.Image | null;
  mirroredImg: fabric.Image | null;
  shapesImg: fabric.Image | null;
  mirroredShapesImg: fabric.Image | null;
}

export const layoutDiptych = async (
  canvas: fabric.Canvas, 
  layoutSpecs: LayoutSpecs, 
  useOffscreenCanvas = false,
  areShapesVisible: boolean = false
): Promise<LayoutDiptychResult> => {
  // Check if canvas is valid
  if (!canvas || !canvas.getElement()) {
    console.error("Canvas is not available in layoutDiptych");
    return {
      frameImg: null,
      photoImg: null,
      mirroredImg: null,
      shapesImg: null,
      mirroredShapesImg: null
    };
  }

  try {
    console.log("Starting layoutDiptych function");
    console.log("Layout Specs:", layoutSpecs);

    // Load and add frame image with shadow effects
    console.log("Loading frame image from:", layoutSpecs.frameImagePath);
    const frameImg = await loadAndApplyShadow(layoutSpecs.frameImagePath, 'frame');

    // Load and add photo
    console.log("Loading photo image from:", layoutSpecs.photoUrl);
    const photoImg = await loadImage(layoutSpecs.photoUrl, layoutSpecs.photoPlacement);

    // Load and add mirrored photo
    console.log("Loading mirrored photo image from:", layoutSpecs.mirroredPhotoUrl);
    const mirroredImg = await loadImage(layoutSpecs.mirroredPhotoUrl, layoutSpecs.mirroredPhotoPlacement);

    // Conditional loading for shapes if areShapesVisible is true
    let shapesImg = null, mirroredShapesImg = null;
    if (areShapesVisible) {
      shapesImg = await loadImage(layoutSpecs.shapesImagePath, layoutSpecs.photoPlacement);
      mirroredShapesImg = await loadImage(layoutSpecs.shapesImagePath, layoutSpecs.mirroredPhotoPlacement);
    }

    // Add images to canvas and handle offscreen canvas logic if required
    [frameImg, photoImg, mirroredImg, shapesImg, mirroredShapesImg].forEach(img => {
      if (img) {
        canvas.add(img);
        // Log each image's position and scale after adding it to the canvas
        console.log(`Image added to canvas: ${img.get('type')}`, 'Position and scale:', {
          left: img.left,
          top: img.top,
          scaleX: img.scaleX,
          scaleY: img.scaleY
        });
      }
    });

    // When using the offscreen canvas, return all elements including shapes (if loaded)
    if (useOffscreenCanvas) {
      return { frameImg, photoImg, mirroredImg, shapesImg, mirroredShapesImg };
    }
  
    // Optional grouping and clearing of canvas to maintain layering and positioning
    groupAndClearCanvas(canvas);

    return { frameImg, photoImg, mirroredImg, shapesImg, mirroredShapesImg };
  } catch (error) {
    console.error("Error in layoutDiptych:", error);
    return {
      frameImg: null,
      photoImg: null,
      mirroredImg: null,
      shapesImg: null,
      mirroredShapesImg: null
    };
  }
};

async function loadImage(imagePath: string, options: fabric.IImageOptions): Promise<fabric.Image> {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(imagePath, (img) => {
      img.set(options);
      // Log the image's placement settings after setting them
      console.log(`Image loaded: ${imagePath}`, 'Placement:', {
        left: img.left,
        top: img.top,
        originX: img.originX,
        originY: img.originY,
        scaleX: img.scaleX,
        scaleY: img.scaleY
      });
      resolve(img);
    }, { crossOrigin: 'anonymous' });
  });
}


async function loadAndApplyShadow(imagePath: string, type: 'frame' | 'photo'): Promise<fabric.Image> {
  return loadImage(imagePath, {}).then(img => {
    if (type === 'frame') {
      // Apply shadow specifically for frame images using the 'set' method
      img.set({
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.5)',
          blur: 20,
          offsetX: 10,
          offsetY: 10
        })
      });
    }
    return img;
  });
}

  function groupAndClearCanvas(canvas: fabric.Canvas): void {
    const allObjects = canvas.getObjects();
    // Log all objects before grouping
    console.log(`Canvas objects before grouping:`, allObjects.map(obj => {
      return {
        type: obj.get('type'),
        left: obj.left,
        top: obj.top,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY
      };
    }));
    const group = new fabric.Group(allObjects, {
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
    // Log the group's position and scale
    console.log('Group created:', {
      left: group.left,
      top: group.top,
      scaleX: group.scaleX,
      scaleY: group.scaleY
    });
    canvas.clear().add(group).renderAll();
    // Log a confirmation that the canvas has been cleared and the group added
    console.log("Canvas cleared and group added.");
  }
