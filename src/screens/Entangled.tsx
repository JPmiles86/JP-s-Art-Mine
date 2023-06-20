// Entangled.tsx
import React from 'react';
import ImageCarousel from './ImageCarousel';
import { DiptychSVG } from '../Diptychs/DiptychFilter';
import * as diptychs from '../Diptychs';

const Entangled = ({ aspectRatio, frameOption, FrameId, images }: { aspectRatio: string, frameOption: string, FrameId: string, images: DiptychSVG[] }) => {
    console.log('Images:', images);
    console.log('Filter criteria:', '1', aspectRatio, FrameId);
    const filteredImages = diptychs.getImagesForDiptychType('1', aspectRatio, FrameId, images);
    console.log('Filtered images:', filteredImages);
    


  return <ImageCarousel images={filteredImages} />;
};

export default Entangled;
