// DiptychFilter.tsx
export type DiptychSVG = {
  DiptchId: string;
  aspectRatio: string;
  FrameId: string;
  imagePath: string;
  photoID: string;
  leftSide: string;
  leftRotation: string;
  rightSide: string;
  rightRotation: string;
  shapeInCenterEdge: string;
  shapeAtTopEdge: string;
  DiptychIdName: string;
  diptcyhName: string;
  artworkID: string;
};

export function getImagesForDiptychType(DiptchId: string, aspectRatio: string, FrameId: string, images: DiptychSVG[]) {
  console.log('getImagesForDiptychType parameters:', DiptchId, aspectRatio, FrameId); // log the function parameters

  // Filter the SVG's based on the diptych type, aspect ratio, and frame option.
  return images.filter(image => {
    console.log('Image properties:', image.DiptchId, image.aspectRatio, image.FrameId); // log the properties of each image
    return image.DiptchId === DiptchId &&
      image.aspectRatio === aspectRatio &&
      image.FrameId === FrameId;
  });
}