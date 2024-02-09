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
    try {
    console.log("Starting layoutDiptych function");

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

    // Log layoutSpecs details
    console.log("Layout Specs:", layoutSpecs);

     // Load and add frame image
     console.log("Loading frame image from:", layoutSpecs.frameImagePath);
     const frameImg = await new Promise<fabric.Image>((resolve) =>
       fabric.Image.fromURL(layoutSpecs.frameImagePath, resolve, { crossOrigin: 'anonymous' })
     );
     console.log("Frame image loaded successfully");

    // Create a halo shadow frame
    const haloFrame = fabric.util.object.clone(frameImg);
    haloFrame.set({
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.5)',
        blur: 20, // High blur for a soft halo
        offsetX: 0,
        offsetY: 0
      })
    });

    // Apply the drop shadow to the actual frame
    frameImg.set({
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.6)',
        blur: 20, // Less blur for a sharper drop shadow
        offsetX: 0,
        offsetY: 20 // Offset to simulate top lighting
      })
    });

    // Load and add photo
    console.log("Loading photo image from:", layoutSpecs.photoUrl);
    const photoImg = await new Promise<fabric.Image>((resolve) =>
      fabric.Image.fromURL(layoutSpecs.photoUrl, resolve, { crossOrigin: 'anonymous' })
    );
    photoImg.set(layoutSpecs.photoPlacement);
   
    // Load and add mirrored photo
    console.log("Loading mirrored photo image from:", layoutSpecs.mirroredPhotoUrl);
    const mirroredImg = await new Promise<fabric.Image>((resolve) =>
      fabric.Image.fromURL(layoutSpecs.mirroredPhotoUrl, resolve, { crossOrigin: 'anonymous' })
    );
    mirroredImg.set(layoutSpecs.mirroredPhotoPlacement);

    // Load shapes if areShapesVisible is true
    let shapesImg = null, mirroredShapesImg = null;

    if (areShapesVisible) {
      console.log("Loading shapes image from:", layoutSpecs.shapesImagePath);
      shapesImg = await new Promise<fabric.Image>((resolve) =>
        fabric.Image.fromURL(layoutSpecs.shapesImagePath, resolve, { crossOrigin: 'anonymous' })
      );
      shapesImg.set(layoutSpecs.photoPlacement);

      mirroredShapesImg = await new Promise<fabric.Image>((resolve) =>
        fabric.Image.fromURL(layoutSpecs.shapesImagePath, resolve, { crossOrigin: 'anonymous' })
      );
      mirroredShapesImg.set(layoutSpecs.mirroredPhotoPlacement);
      console.log("Shapes images loaded successfully");
    } else {
      console.log("Shapes are not visible, skipping shapes loading");
    }

    // When using the offscreen canvas, return all elements including shapes (if loaded)
    if (useOffscreenCanvas) {
      return { frameImg, photoImg, mirroredImg, shapesImg, mirroredShapesImg };
    }
  
    // Add images to the canvas
    console.log("Adding images to canvas");
    canvas.add(frameImg);
    canvas.add(photoImg);
    canvas.add(mirroredImg);

    if (areShapesVisible && shapesImg && mirroredShapesImg) {
      canvas.add(shapesImg);
      canvas.add(mirroredShapesImg);
    }
    console.log("Images added to canvas successfully");

    // Group all objects together
    console.log("Grouping all objects");
    const allObjects = canvas.getObjects();
    const group = new fabric.Group(allObjects, {
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    });

    // Clear the canvas and add the group
    console.log("Clearing canvas and adding group");
    canvas.clear().add(group);
    canvas.renderAll();
    console.log("layoutDiptych function completed successfully");

     // Return the shapes for on-screen canvas (this is for manipulating shapes in DynamicDiptychComponent)
     return {
      frameImg,
      photoImg,
      mirroredImg,
      shapesImg,
      mirroredShapesImg
    };

  } catch (error) {
    console.error("Error loading images for layout:", error);
    return {
      frameImg: null,
      photoImg: null,
      mirroredImg: null,
      shapesImg: null,
      mirroredShapesImg: null
    };
  }
};
