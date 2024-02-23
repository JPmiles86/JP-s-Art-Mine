//my-gallery/src/Diptychs/DiptychCarousel.js

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import './DiptychCarousel.css'; 

const DiptychCarousel = ({ photoId, imagePath, frameId, diptychId, aspectRatio, areShapesVisible, containerRef, handleCanvasReady, onDiptychIdCodeChange, handleLayoutSpecsReady }) => {
  const [diptychIdCodes, setDiptychIdCodes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1); 
  const [totalSlides, setTotalSlides] = useState(0);
  const [selectedCarouselDiptychIdCode, setSelectedCarouselDiptychIdCode] = useState(null);
  const [carouselHeight, setCarouselHeight] = useState(0);
  
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


  //console.log("Current currentSlide:", currentSlide);
  //console.log("Current totalSlides:", totalSlides);

  return (
    <div>
      <Slider {...settings}>
        {diptychIdCodes.map(code => (
          <div key={code.DiptychIdCode} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: `${carouselHeight}px` }}>
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
        <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            {currentSlide} / {totalSlides}
        </div>
    </div>
  );
};

export default DiptychCarousel;