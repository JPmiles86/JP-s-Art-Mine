// ImageCarousel.tsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { DiptychSVG } from '../Diptychs/DiptychFilter';
import * as diptychs from '../Diptychs';

interface ImageCarouselProps {
  images: DiptychSVG[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.imagePath} alt={image.photoID} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
