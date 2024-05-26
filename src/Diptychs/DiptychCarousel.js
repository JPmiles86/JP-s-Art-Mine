// my-gallery/src/Diptychs/DiptychCarousel.js

// Import necessary dependencies and components
import React, { useState, useMemo, useEffect } from 'react';
import Slider from 'react-slick'; // React Slick slider component
import DynamicDiptychComponent from './DynamicDiptychComponent'; // Component for displaying diptych
import './DiptychCarousel.css'; // CSS for carousel
import { useDiptychData } from './useDiptychData'; // Custom hook to fetch diptych data

// Custom left arrow component for the carousel
const CustomLeftArrow = ({ onClick }) => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/images/frames/Left-Arrow.png`}
    className="custom-slick-arrow custom-slick-prev"
    onClick={onClick}
    alt="Previous"
  />
);

// Custom right arrow component for the carousel
const CustomRightArrow = ({ onClick }) => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/images/frames/Right-Arrow.png`}
    className="custom-slick-arrow custom-slick-next"
    onClick={onClick}
    alt="Next"
  />
);

// Main carousel component function
const DiptychCarousel = ({ 
  photoId, // Photo ID
  imagePath, // Image path
  frameId, // Frame ID
  diptychId, // Diptych ID
  aspectRatio, // Aspect ratio of the image
  areShapesVisible, // Flag to determine if shapes are visible
  containerRef, // Reference to the container element
  handleCanvasReady, // Callback when canvas is ready
  onDiptychIdCodeChange, // Callback when diptych ID code changes
  handleLayoutSpecsReady // Callback when layout specs are ready
}) => {
  // Use custom hook to fetch diptych data
  const { diptychIdCodes, totalSlides } = useDiptychData(aspectRatio, frameId, diptychId);

  // State hooks to manage the component's state
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide index
  const [selectedDiptychIdCode, setSelectedDiptychIdCode] = useState(''); // Selected diptych ID code

  // Settings for the React Slick slider
  const settings = useMemo(() => ({
    dots: true, // Show dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    arrows: true, // Show arrows for navigation
    prevArrow: <CustomLeftArrow />, // Custom previous arrow component
    nextArrow: <CustomRightArrow />, // Custom next arrow component
    lazyLoad: 'progressive', // Lazy load images progressively
    afterChange: current => { // Callback after slide change
      setCurrentSlide(current); // Update current slide index
      setSelectedDiptychIdCode(diptychIdCodes[current].DiptychIdCode); // Update selected diptych ID code
      onDiptychIdCodeChange(diptychIdCodes[current].DiptychIdCode); // Trigger callback with new diptych ID code
    }
  }), [diptychIdCodes, onDiptychIdCodeChange]);

  // Effect to set the initial diptych ID code if not already set
  useEffect(() => {
    if (diptychIdCodes.length > 0 && !selectedDiptychIdCode) {
      setSelectedDiptychIdCode(diptychIdCodes[0].DiptychIdCode); // Set initial diptych ID code
      onDiptychIdCodeChange(diptychIdCodes[0].DiptychIdCode); // Trigger callback with initial diptych ID code
    }
  }, [diptychIdCodes, onDiptychIdCodeChange, selectedDiptychIdCode]);

  // Render the component
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
