// my-gallery/src/Diptychs/DiptychCarouselDynamic.js

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import DynamicDiptychComponent from './DynamicDiptychComponent';
import './DiptychCarousel.css'; 
import { useDiptychData } from './useDiptychData';
import debounce from 'lodash/debounce';

const DiptychCarouselDynamic = ({ photoId, imagePath, frameId, diptychId, aspectRatio, areShapesVisible, containerRef, handleCanvasReady, onDiptychIdCodeChange, handleLayoutSpecsReady }) => {
  const { diptychIdCodes, totalSlides } = useDiptychData(aspectRatio, frameId, diptychId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [diptychHeights, setDiptychHeights] = useState({});
  const [diptychTopMargins, setDiptychTopMargins] = useState({});

  // Function to update height and re-calculate top margins
  const updateHeight = useCallback((newHeight, diptychIdCode) => {
    setCarouselHeight(currentHeight => Math.max(currentHeight, newHeight));
    setDiptychHeights(prevHeights => ({
      ...prevHeights,
      [diptychIdCode]: Math.max(prevHeights[diptychIdCode] || 0, newHeight)
    }));
  }, []);

  // Debounced version of updateHeight
  const debouncedUpdateHeight = useCallback(debounce(updateHeight, 100), [updateHeight]);

  useEffect(() => {
    const newTopMargins = {};
    Object.keys(diptychHeights).forEach(diptychIdCode => {
      const height = diptychHeights[diptychIdCode];
      newTopMargins[diptychIdCode] = (carouselHeight - height) / 2;
    });
    setDiptychTopMargins(newTopMargins);
  }, [carouselHeight, diptychHeights]);

  const handleResize = useCallback(() => {
    setCarouselHeight(0);
    setDiptychHeights({});
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

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
      onDiptychIdCodeChange(diptychIdCodes[current].DiptychIdCode);
    }
  }), [diptychIdCodes, onDiptychIdCodeChange]);

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
                updateHeight={debouncedUpdateHeight}
              />
            </div>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: 'center', paddingTop: '30px' }}>
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
