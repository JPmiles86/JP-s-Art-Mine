// my-gallery/src/utils/DiptychDynamicUtils.ts

import { fabric } from 'fabric';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import React from 'react'; // Import React

interface Photograph {
  photoID: string;
  number: string;
  url: string;
  imagePath?: string;
  aspectRatio: string;
  title: string;
  date: string;
  dateOriginal: string;
  index?: number;
  seriesName: string;
  seriesCode: string;
}

export const generateDiptychIdCode = ( photo: Photograph, mergedStatus: string, color: number, shape: string): string => {
  if (!photo) return "";
  const normalizedAspectRatio = photo.aspectRatio.replace(':', 'x');
  const orientation = ['C', 'S'].includes(shape.charAt(0)) ? 'P' : 'L';
  const mergePrefix = mergedStatus === 'entangled' ? 'E' : 'F';
  const frameColorSuffix = color === 1 ? 'W' : 'B';
  
  return `${mergePrefix}_${normalizedAspectRatio}_${shape}_${orientation}_${frameColorSuffix}`;
};

export const loadComponent = (
  diptychIdCode: string, 
  setDiptychComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>
) => {
  console.log(`Loading DynamicDiptychComponent for diptychIdCode: ${diptychIdCode}`);
  setDiptychComponent(() => DynamicDiptychComponent);
};
