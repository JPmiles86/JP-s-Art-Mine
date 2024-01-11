// my-gallery/src/utils/DiptychDynamicUtils.ts

import { fabric } from 'fabric';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import React from 'react'; 
import useStore from '../screens/store';

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

export const parseDiptychIdCode = (diptychIdCode: string) => {
  const parts = diptychIdCode.split('_');
  let colorCode = parts[4];

  // If the color code is 'U' (unframed), default it to 'W' (white frame)
  if (colorCode === 'U') {
    colorCode = 'W';
  }

  return {
    mergedStatus: parts[0] === 'E' ? 'entangled' : 'fused',
    color: colorCode === 'W' ? 1 : 2, // 'W' for white frame (1), 'B' for black frame (2)
    shape: parts[2]
  };
};


export const loadComponent = (
  diptychIdCode: string, 
  setDiptychComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>
) => {
  console.log(`Loading DynamicDiptychComponent for diptychIdCode: ${diptychIdCode}`);
  setDiptychComponent(() => DynamicDiptychComponent);
};
