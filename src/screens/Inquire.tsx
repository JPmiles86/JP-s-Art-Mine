// my-gallery/src/screens/Inquire.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import useStore from '../utils/store';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import getPhotoUrl  from '../Diptychs/DynamicDiptychComponent'; // Import getPhotoUrl function
import { diptychConfigurations } from '../Diptychs/diptychFabricConfigurations';
import DownloadButton from '../Diptychs/DownloadButton'; 
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import './Inquire.module.css'; 
import useGalleryNavigation from '../utils/useGalleryNavigation'; // Import the hook
import { useNavigate } from 'react-router-dom';
import styles from './Inquire.module.css';
import buttonStyles from './ButtonStyles.module.css';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import { fetchPhotosService } from '../utils/fetchPhotosService';


interface DownloadButtonProps {
  photoId: string;
  DiptychIdCode: string;
  fabricCanvasRef: React.RefObject<fabric.Canvas>;
  layoutSpecs: LayoutSpecs; // Add layoutSpecs to props
}

const Inquiry: React.FC = () => {
  const navigate = useNavigate();
  const { photoID } = useParams<{ photoID: string }>();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null); 
  const {photos, initialPhotoFetch, sortValue, 
    setPhotos, setSortedPhotos, setInitialPhotoFetch, 
    sortedPhotos, selectedDiptychIdCode } = useStore(state => ({
    ...state,
    selectedDiptychIdCode: state.selectedDiptychIdCode
  }));
  const currentFilter = location.pathname.split('/')[1];
  // Find the Photograph object that matches the photoID
  const selectedPhotograph = useMemo(() => 
    sortedPhotos.find(photo => photo.photoID === photoID), 
    [sortedPhotos, photoID]
  );
  const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(sortedPhotos, currentFilter, '/inquire');
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [selectedCarouselDiptychIdCode, setSelectedCarouselDiptychIdCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());

  // Function to handle canvas ready from Diptych component
  const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
    console.log("handleCanvasReady called", { canvasRef, diptychIdCode });
    updateFabricCanvas(diptychIdCode, canvasRef);
  }, []);    


  const updateFabricCanvas = (diptychIdCode: string, canvas: fabric.Canvas) => {
    setFabricCanvas(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(diptychIdCode, canvas);
      return newMap;
    });
  };    
  
  const handleLayoutSpecsReady = useCallback((layoutSpecs: LayoutSpecs) => {
    setLayoutSpecsMap(prevMap => new Map(prevMap).set(layoutSpecs.DiptychIdCode, layoutSpecs));
  }, []);

  // Add this useEffect for mounting and unmounting logs
  useEffect(() => {
    console.log("Inquiry Component Mounted");

    return () => {
      console.log("Inquiry Component Unmounted");
    };
  }, []);

  useEffect(() => {
    if (!selectedPhotograph && photoID && sortedPhotos.length === 0) {
      // Fetch photos as they are not loaded yet
      fetchPhotosService(
        setPhotosError,
        setLoading,
        setPhotos,
        setInitialPhotoFetch,
        currentFilter,
        initialPhotoFetch
      );
    }
  }, [photoID, sortedPhotos, setPhotos, setInitialPhotoFetch, currentFilter, initialPhotoFetch]);
  
useEffect(() => {
  // Check if there's a selected photo and no selectedDiptychIdCode
  if (selectedPhotograph && !selectedDiptychIdCode) {
    const defaultFrameType = useStore.getState().frames[useStore.getState().FrameId - 1]?.frameType;
    const defaultDiptychIdCode = `E_${selectedPhotograph.aspectRatio.replace(':', 'x')}_CD_P_${defaultFrameType.charAt(0).toUpperCase()}`;
    useStore.getState().setSelectedDiptychIdCode(defaultDiptychIdCode);
}
}, [selectedPhotograph, selectedDiptychIdCode]);

// Function to update DiptychIdCode based on frame color
const updateDiptychIdCodeForFrame = useCallback((frameType: string) => {
  let newFrameId;
  switch (frameType) {
    case 'White':
      newFrameId = 1;
      break;
    case 'Black':
      newFrameId = 2;
      break;
    case 'Unframed':
      newFrameId = 3;
      break;
    default:
      newFrameId = 1; // Default to white if no match
  }
  useStore.getState().setFrameId(newFrameId);

  // Update selectedDiptychIdCode for the top diptych based on new frame color
  if (selectedPhotograph) {
    const newDiptychIdCode = `E_${selectedPhotograph.aspectRatio.replace(':', 'x')}_CD_P_${frameType.charAt(0).toUpperCase()}`;
    useStore.getState().setSelectedDiptychIdCode(newDiptychIdCode);
  }
}, [selectedPhotograph]);

    const handleReturnToGallery = () => {
    // Update the selectedDiptychIdCode in the global store before navigating
    useStore.getState().setSelectedDiptychIdCode(selectedDiptychIdCode);
    navigate(`/${currentFilter}/${photoID}`);
  };  
    
 const renderDiptych = useCallback((diptychIdCode: string, photoId?: string) => {
  return (
    <div className={styles.diptychContainer}>
      <DynamicDiptychComponent
        photoId={selectedPhotograph?.photoID || ''}
        containerRef={containerRef}
        onCanvasReady={(canvasRef, diptychIdCode) => updateFabricCanvas(diptychIdCode, canvasRef)}
        DiptychIdCode={diptychIdCode}
        areShapesVisible={areShapesVisible}
        onLayoutSpecsReady={handleLayoutSpecsReady} 
      />
    </div>
  );
}, [selectedPhotograph, areShapesVisible, handleCanvasReady, handleLayoutSpecsReady]);

    
  
const renderDownloadButton = (photoId: string, diptychIdCode: string) => {
  const fabricCanvasRef = fabricCanvas.get(diptychIdCode);
  const layoutSpecs = layoutSpecsMap.get(diptychIdCode);
  
  if (fabricCanvasRef && layoutSpecs) {
    return (
      <DownloadButton
        photoId={photoId}
        DiptychIdCode={diptychIdCode}
        fabricCanvasRef={fabricCanvasRef}
        layoutSpecs={layoutSpecs}
        areShapesVisible={areShapesVisible} 
      />
    );
  }
  return null;
};

      
  // Add a callback function to update the selected code
  const handleCarouselDiptychIdCodeChange = (code: string) => {
    setSelectedCarouselDiptychIdCode(code);
  };

{selectedCarouselDiptychIdCode && 
 renderDownloadButton(selectedPhotograph!.photoID, selectedCarouselDiptychIdCode)}

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Thanks for inquiring about purchasing my art, which Diptych are you interested in purchasing?
      </Typography>
      <div>
        <button className={buttonStyles.button} onClick={handleReturnToGallery}>Return to Gallery</button>
        <button className={buttonStyles.button} onClick={() => handlePrevPhoto(selectedPhotograph ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhotograph.photoID) : 0)}>Previous Photo</button>
        <button className={buttonStyles.button} onClick={() => handleNextPhoto(selectedPhotograph ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhotograph.photoID) : 0)}>Next Photo</button>
        <div className={buttonStyles.dropdownSelector}>
          <Typography variant="h6" gutterBottom>Frame Color:</Typography>
          <select
            className={buttonStyles.button} // Apply the button class to the select element
            onChange={(e) => updateDiptychIdCodeForFrame(e.target.value)}
            value={useStore.getState().frames[useStore.getState().FrameId - 1]?.frameType}
          >
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Unframed">Unframed</option>
          </select>
        </div>
      </div>
      {selectedPhotograph && selectedDiptychIdCode? (
        <Box>
          {renderDiptych(selectedDiptychIdCode || '', selectedPhotograph.photoID)}
          <Typography style={{ textAlign: 'center' }}>Description for {selectedDiptychIdCode}</Typography>
          {renderDownloadButton(selectedPhotograph.photoID, selectedDiptychIdCode || '')}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          <DiptychCarouselDynamic
            photoId={selectedPhotograph.photoID}
            frameId={useStore.getState().FrameId}
            diptychId={1}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          {renderDownloadButton(selectedPhotograph.photoID, selectedCarouselDiptychIdCode)}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            frameId={useStore.getState().FrameId}
            diptychId={2}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          {renderDownloadButton(selectedPhotograph.photoID, selectedCarouselDiptychIdCode)}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            frameId={useStore.getState().FrameId}
            diptychId={3}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          {renderDownloadButton(selectedPhotograph.photoID, selectedCarouselDiptychIdCode)}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            frameId={useStore.getState().FrameId}
            diptychId={4}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          {renderDownloadButton(selectedPhotograph.photoID, selectedCarouselDiptychIdCode)}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            frameId={useStore.getState().FrameId}
            diptychId={5}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarouselDiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          {renderDownloadButton(selectedPhotograph.photoID, selectedCarouselDiptychIdCode)}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

        </Box>

      ) : (
        <Typography>Loading... Please be patient. If nothing loads, I guess there's a problem. Please Inform JPM</Typography>
      )}
     

    </Box>
  );
};

export default Inquiry;