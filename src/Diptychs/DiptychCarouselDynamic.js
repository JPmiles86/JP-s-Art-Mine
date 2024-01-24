//my-gallery/src/Diptychs/DiptychCarouselDynamic.js

import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import DynamicDiptychComponent from './DynamicDiptychComponent';
import './DiptychCarousel.css'; 

const DiptychCarouselDynamic = ({ photoId, frameId, diptychId, aspectRatio, areShapesVisible, containerRef, handleCanvasReady, onDiptychIdCodeChange }) => {
  const [diptychIdCodes, setDiptychIdCodes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1); 
  const [totalSlides, setTotalSlides] = useState(0);
  const [selectedCarouselDiptychIdCode, setSelectedCarouselDiptychIdCode] = useState(null);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [diptychHeights, setDiptychHeights] = useState({}); 
  const [diptychTopMargins, setDiptychTopMargins] = useState({});
  const [heightsUpdated, setHeightsUpdated] = useState(false);
  
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
    if (!aspectRatio || !frameId || !diptychId) {
      console.log("Missing one or more required parameters: aspectRatio, frameId, diptychId");
      return;
    }

    const fetchDiptychIdCodes = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/diptychsvgs/aspectratio/${aspectRatio}/frameid/${frameId}/diptychid/${diptychId}`);
          const data = await response.json();
          setDiptychIdCodes(data);
          setTotalSlides(data.length);
          if (data.length > 0) {
            setSelectedCarouselDiptychIdCode(data[0].DiptychIdCode);
            onDiptychIdCodeChange(data[0].DiptychIdCode);
          }
        } catch (error) {
          console.error('Error fetching DiptychIdCodes:', error);
        }
      };
  
      fetchDiptychIdCodes();
    }, [aspectRatio, frameId, diptychId]);

    const updateHeight = useCallback((newHeight, diptychIdCode) => {
        if (!diptychHeights[diptychIdCode] || diptychHeights[diptychIdCode] < newHeight) {
          setCarouselHeight(currentHeight => Math.max(currentHeight, newHeight));
          setDiptychHeights(prevHeights => ({ ...prevHeights, [diptychIdCode]: newHeight }));
          setHeightsUpdated(true); // Set the flag here
          console.log(`Updating height for ${diptychIdCode}:`, newHeight);
        }
      }, [diptychHeights]);

  const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  
  const debouncedUpdateHeight = useCallback(debounce((newHeight, diptychIdCode) => {
    updateHeight(newHeight, diptychIdCode);
  }, 100), [updateHeight]);

  useEffect(() => {
    if (heightsUpdated) {
      // Perform top margin calculations
      const newTopMargins = {};
      diptychIdCodes.forEach(code => {
        const diptychHeight = diptychHeights[code.DiptychIdCode];
        if (diptychHeight && !isNaN(diptychHeight)) {
          newTopMargins[code.DiptychIdCode] = (carouselHeight - diptychHeight) / 2;
          console.log(`Calculated Top Margin for ${code.DiptychIdCode}:`, newTopMargins[code.DiptychIdCode]);
        }
      });
      setDiptychTopMargins(newTopMargins);
  
      // Reset the flag
      setHeightsUpdated(false);
    }
  }, [carouselHeight, diptychHeights, diptychIdCodes, heightsUpdated]);  

  useEffect(() => {
    const handleResize = () => {
      setCarouselHeight(0);
      setHeightsUpdated(false); // Reset the flag here
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, 
    prevArrow: <CustomLeftArrow />,
    nextArrow: <CustomRightArrow />,
    lazyload: true,
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
          const topMargin = diptychTopMargins[code.DiptychIdCode] || 0;

          console.log(`carouselHeight:`, carouselHeight);
          console.log(`Top Margin for ${code.DiptychIdCode}:`, topMargin);

          return (
            <div key={code.DiptychIdCode} className="diptych-slide" style={{ height: `${carouselHeight}px` }}>
              <div style={{ marginTop: `${topMargin}px` }}>
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

export default DiptychCarouselDynamic;