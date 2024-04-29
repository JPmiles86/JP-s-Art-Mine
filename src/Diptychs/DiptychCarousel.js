// my-gallery/src/Diptychs/DiptychCarousel.js

import React, { useState, useMemo, useEffect } from 'react';
import Slider from 'react-slick';
import DynamicDiptychComponent from './DynamicDiptychComponent';
import './DiptychCarousel.css'; 
import { useDiptychData } from './useDiptychData';

const CustomLeftArrow = ({ onClick }) => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/images/frames/Left-Arrow.png`}
    className="custom-slick-arrow custom-slick-prev"
    onClick={onClick}
    alt="Previous"
  />
);

const CustomRightArrow = ({ onClick }) => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/images/frames/Right-Arrow.png`}
    className="custom-slick-arrow custom-slick-next"
    onClick={onClick}
    alt="Next"
  />
);

const DiptychCarousel = ({ photoId, imagePath, frameId, diptychId, aspectRatio, areShapesVisible, containerRef, handleCanvasReady, onDiptychIdCodeChange, handleLayoutSpecsReady }) => {
  const { diptychIdCodes, totalSlides } = useDiptychData(aspectRatio, frameId, diptychId);
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [selectedDiptychIdCode, setSelectedDiptychIdCode] = useState('');

  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomLeftArrow />,
    nextArrow: <CustomRightArrow />,
    //lazyload: true,
    lazyLoad: 'progressive',
    afterChange: current => {
      setCurrentSlide(current);
      setSelectedDiptychIdCode(diptychIdCodes[current].DiptychIdCode);
      onDiptychIdCodeChange(diptychIdCodes[current].DiptychIdCode);
    }
  }), [diptychIdCodes, onDiptychIdCodeChange]);

  useEffect(() => {
    if (diptychIdCodes.length > 0 && !selectedDiptychIdCode) {
      setSelectedDiptychIdCode(diptychIdCodes[0].DiptychIdCode);
      onDiptychIdCodeChange(diptychIdCodes[0].DiptychIdCode);
    }
  }, [diptychIdCodes, onDiptychIdCodeChange, selectedDiptychIdCode]);

  return (
    <div>
      <Slider {...settings}>
        {diptychIdCodes.map(code => (
          <div key={code.DiptychIdCode} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DynamicDiptychComponent
                photoId={photoId}
                imagePath={imagePath}
                containerRef={containerRef}
                onCanvasReady={handleCanvasReady}
                DiptychIdCode={code.DiptychIdCode}
                areShapesVisible={areShapesVisible}
                onLayoutSpecsReady={handleLayoutSpecsReady}
            />
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: 'center', paddingTop: '30px' }} className="carousel-fraction">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default DiptychCarousel;
