// my-gallery/src/Diptychs/LayoutSpecs.ts

export interface Placement {
  angle: number;
  left: number;
  top?: number;
  originX: 'center' | 'left' | 'right';
  originY: 'center' | 'top' | 'bottom';
  flipX?: boolean;
}

export interface LayoutSpecs {
  photoId: string;
  DiptychIdCode: string;
  frameImagePath: string;
  shapesImagePath: string;
  photoUrl: string;
  mirroredPhotoUrl: string;
  originalWidth: number;
  originalHeight: number;
  photoPlacement: Placement;
  mirroredPhotoPlacement: Placement;
}
