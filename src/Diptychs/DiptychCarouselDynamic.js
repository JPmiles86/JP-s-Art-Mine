// my-gallery/src/Diptychs/DiptychCarouselDynamic.js

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import DynamicDiptychComponent from './DynamicDiptychComponent';
import './DiptychCarousel.css';
import { useDiptychData } from './useDiptychData';

const DiptychCarouselDynamic = ({ photoId, imagePath, frameId, diptychId, aspectRatio, areShapesVisible, containerRef, handleCanvasReady, onDiptychIdCodeChange, handleLayoutSpecsReady }) => {
  const { diptychIdCodes, totalSlides } = useDiptychData(aspectRatio, frameId, diptychId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [diptychHeights, setDiptychHeights] = useState({});
  const [diptychTopMargins, setDiptychTopMargins] = useState({});
  const [selectedDiptychIdCode, setSelectedDiptychIdCode] = useState('');

  const handleHeightChange = useCallback((height, diptychIdCode) => {
    setDiptychHeights(prevHeights => ({
      ...prevHeights,
      [diptychIdCode]: height
    }));
  }, []);

  useEffect(() => {
    const maxHeight = Math.max(...Object.values(diptychHeights), 0);
    setCarouselHeight(maxHeight);
  }, [diptychHeights]);

  useEffect(() => {
    const newTopMargins = {};
    Object.keys(diptychHeights).forEach(diptychIdCode => {
      const height = diptychHeights[diptychIdCode];
      newTopMargins[diptychIdCode] = (carouselHeight - height) / 2;
    });
    setDiptychTopMargins(newTopMargins);
  }, [carouselHeight, diptychHeights]);

  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomLeftArrow />,
    nextArrow: <CustomRightArrow />,
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
        {diptychIdCodes.map((code, index) => (
          <div key={code.DiptychIdCode} className="diptych-slide" style={{ height: `${carouselHeight}px` }}>
            <div style={{ marginTop: `${diptychTopMargins[code.DiptychIdCode] || 0}px` }}>
              <DynamicDiptychComponent
                photoId={photoId}
                imagePath={imagePath}
                containerRef={containerRef}
                onCanvasReady={handleCanvasReady}
                DiptychIdCode={code.DiptychIdCode}
                areShapesVisible={areShapesVisible}
                onLayoutSpecsReady={handleLayoutSpecsReady}
                onHeightChange={handleHeightChange}
              />
            </div>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: 'center', paddingTop: '30px' }} className="carousel-fraction">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default DiptychCarouselDynamic;

const CustomLeftArrow = React.memo(({ onClick }) => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/images/frames/Left-Arrow.png`}
    className="custom-slick-arrow custom-slick-prev"
    onClick={onClick}
    alt="Previous"
  />
));

const CustomRightArrow = React.memo(({ onClick }) => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/images/frames/Right-Arrow.png`}
    className="custom-slick-arrow custom-slick-next"
    onClick={onClick}
    alt="Next"
  />
));