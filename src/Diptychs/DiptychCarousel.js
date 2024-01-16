//my-gallery/src/Diptychs/DiptychCarousel.js

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import './DiptychCarousel.css'; 

const DiptychCarousel = ({ photoId, frameId, diptychId, aspectRatio, areShapesVisible, containerRef, handleCanvasReady, onDiptychIdCodeChange }) => {
  const [diptychIdCodes, setDiptychIdCodes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1); 
  const [totalSlides, setTotalSlides] = useState(0);
  const [selectedCarouselDiptychIdCode, setSelectedCarouselDiptychIdCode] = useState(null);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [diptychHeights, setDiptychHeights] = useState({}); 

  
  // Custom arrow components
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
    
  useEffect(() => {
    if (!aspectRatio || !frameId || !diptychId) return;

    const fetchDiptychIdCodes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/diptychsvgs/aspectratio/${aspectRatio}/frameid/${frameId}/diptychid/${diptychId}`);
        const data = await response.json();
        setDiptychIdCodes(data);
        if (data.length > 0) {
            setTotalSlides(data.length); // Set total slides based on the data
            const initialCode = data[0].DiptychIdCode;
            setSelectedCarouselDiptychIdCode(initialCode);
            onDiptychIdCodeChange(initialCode);
          }
      } catch (error) {
        console.error('Error fetching DiptychIdCodes:', error);
      }
    };

    fetchDiptychIdCodes();
  }, [aspectRatio, frameId, diptychId]);

  const updateHeight = (newHeight, diptychIdCode) => {
    setCarouselHeight(currentHeight => Math.max(currentHeight, newHeight));
    setDiptychHeights(prevHeights => ({ ...prevHeights, [diptychIdCode]: newHeight }));
  };
  
  useEffect(() => {
    const handleResize = () => {
      // Reset the carousel height to recalculate
      setCarouselHeight(0);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  
  const debouncedUpdateHeight = debounce((newHeight) => {
    setCarouselHeight(currentHeight => Math.max(currentHeight, newHeight));
  }, 100); // Adjust the 100ms delay as needed

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, 
    prevArrow: <CustomLeftArrow />,
    nextArrow: <CustomRightArrow />,
    afterChange: (current) => {
      const currentCode = diptychIdCodes[current].DiptychIdCode;
      setSelectedCarouselDiptychIdCode(currentCode);
      onDiptychIdCodeChange(currentCode);
      setCurrentSlide(current + 1); 
    },
  };
 
  return (
    <div>
      <Slider {...settings}>
        {diptychIdCodes.map(code => {
          const diptychHeight = diptychHeights[code.DiptychIdCode];
          const topMargin = (diptychHeight && !isNaN(diptychHeight))
            ? (carouselHeight - diptychHeight) / 2
            : 0;

          console.log(`Top Margin for ${code.DiptychIdCode}:`, topMargin);

          return (
            <div key={code.DiptychIdCode} className="diptych-slide" style={{ height: `${carouselHeight}px` }}>
              <div className="dynamic-component-wrapper" style={{ marginTop: `${topMargin}px` }}>
                <DynamicDiptychComponent
                  photoId={photoId}
                  containerRef={containerRef}
                  onCanvasReady={handleCanvasReady}
                  DiptychIdCode={code.DiptychIdCode}
                  areShapesVisible={areShapesVisible}
                  updateHeight={(height) => updateHeight(height, code.DiptychIdCode)}
                />
              </div>
            </div>
          );
        })}
      </Slider>
        <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            {currentSlide} / {totalSlides}
        </div>
     </div>
  );
};

export default DiptychCarousel;