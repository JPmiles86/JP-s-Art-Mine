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
// import './Inquire.module.css'; 
import useGalleryNavigation from '../utils/useGalleryNavigation'; // Import the hook
import { useNavigate } from 'react-router-dom';
import styles from './Inquire.module.css';
import buttonStyles from './ButtonStyles.module.css';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import { fetchPhotosService } from '../utils/fetchPhotosService';
import DiptychAvailabilityModule from '../Diptychs/DiptychAvailabilityModule';
import LikeButton from '../components/layout/LikeButton';
import AuthModal from '../components/modals/AuthModal';

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
 // const [selectedCarouselDiptychIdCode, setSelectedCarouselDiptychIdCode] = useState('');
  const [carousel1SelectedDiptychIdCode, setCarousel1SelectedDiptychIdCode] = useState('');
  const [carousel2SelectedDiptychIdCode, setCarousel2SelectedDiptychIdCode] = useState('');
  const [carousel3SelectedDiptychIdCode, setCarousel3SelectedDiptychIdCode] = useState('');
  const [carousel4SelectedDiptychIdCode, setCarousel4SelectedDiptychIdCode] = useState('');
  const [carousel5SelectedDiptychIdCode, setCarousel5SelectedDiptychIdCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [likeButtonDiptychIdCode, setLikeButtonDiptychIdCode] = useState('');
  const userRole = useStore((state) => state.userRole);
  const isAnonymous = useStore((state) => state.isAnonymous);

  
  // Add a callback function to update the selected code for each carousel
  const handleCarousel1DiptychIdCodeChange = (code: string) => {setCarousel1SelectedDiptychIdCode(code);};
  const handleCarousel2DiptychIdCodeChange = (code: string) => {setCarousel2SelectedDiptychIdCode(code);};
  const handleCarousel3DiptychIdCodeChange = (code: string) => {setCarousel3SelectedDiptychIdCode(code);};
  const handleCarousel4DiptychIdCodeChange = (code: string) => {setCarousel4SelectedDiptychIdCode(code);};
  const handleCarousel5DiptychIdCodeChange = (code: string) => {setCarousel5SelectedDiptychIdCode(code);};

  const renderLikeButton = (photoId: string, diptychIdCode: string) => {
    const handleLikeButtonClick = () => {
      setLikeButtonDiptychIdCode(diptychIdCode);
      if (!useStore.getState().userId) {
        setIsAuthModalOpen(true);
      }
    };
  
    return (
      <LikeButton
        photoId={photoId}
        diptychIdCode={diptychIdCode}
        setIsAuthModalOpen={handleLikeButtonClick}
        onLikeButtonClick={handleLikeButtonClick}
      />
    );
  };

  const handleLikeButtonClick = () => {
    if (!useStore.getState().userId) {
      setIsAuthModalOpen(true);
    }
  };

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
        initialPhotoFetch, 
        userRole
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
        imagePath={selectedPhotograph?.imagePath || ''}
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

  return (
    <Box>
      <Typography variant="h5" gutterBottom style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        Thanks for inquiring about purchasing my art, which Diptych are you interested in purchasing?
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <button className={buttonStyles.button} onClick={() => handlePrevPhoto(selectedPhotograph ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhotograph.photoID) : 0)}>Previous Photo</button>
        <button className={buttonStyles.button} onClick={handleReturnToGallery}>Return to Gallery</button>
        <button className={buttonStyles.button} onClick={() => handleNextPhoto(selectedPhotograph ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhotograph.photoID) : 0)}>Next Photo</button>
      </div>
        <div className={buttonStyles.dropdownSelector} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ marginTop: '7.5px' }}>Frame Color:</Typography>
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
      
      {selectedPhotograph && selectedDiptychIdCode? (
        <Box>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            {renderDiptych(selectedDiptychIdCode || '', selectedPhotograph.photoID)}
          </div>
          <Typography style={{ textAlign: 'center' }}>
            Diptych Variation: {selectedDiptychIdCode}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {renderDownloadButton(selectedPhotograph.photoID, selectedDiptychIdCode || '')}
            {renderLikeButton(selectedPhotograph.photoID, selectedDiptychIdCode || '')}
            <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> 
              {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} 
            </button>
          </div>

          <DiptychCarouselDynamic
            photoId={selectedPhotograph.photoID}
            imagePath={selectedPhotograph.imagePath}
            frameId={useStore.getState().FrameId}
            diptychId={1}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarousel1DiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {renderDownloadButton(selectedPhotograph.photoID, carousel1SelectedDiptychIdCode)}
            {renderLikeButton(selectedPhotograph.photoID, carousel1SelectedDiptychIdCode || '')}
            <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {selectedPhotograph && (
              <DiptychAvailabilityModule
                photoId={selectedPhotograph.photoID}
                diptychId={1} 
              />
            )}
          </div>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            imagePath={selectedPhotograph.imagePath}
            frameId={useStore.getState().FrameId}
            diptychId={2}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarousel2DiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {renderDownloadButton(selectedPhotograph.photoID, carousel2SelectedDiptychIdCode)}
            {renderLikeButton(selectedPhotograph.photoID, carousel2SelectedDiptychIdCode || '')}
            <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {selectedPhotograph && (
              <DiptychAvailabilityModule
                photoId={selectedPhotograph.photoID}
                diptychId={2} 
              />
            )}
          </div>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            imagePath={selectedPhotograph.imagePath}
            frameId={useStore.getState().FrameId}
            diptychId={3}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarousel3DiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {renderDownloadButton(selectedPhotograph.photoID, carousel3SelectedDiptychIdCode)}
            {renderLikeButton(selectedPhotograph.photoID, carousel3SelectedDiptychIdCode || '')}
            <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {selectedPhotograph && (
              <DiptychAvailabilityModule
                photoId={selectedPhotograph.photoID}
                diptychId={3} 
              />
            )}
          </div>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            imagePath={selectedPhotograph.imagePath}
            frameId={useStore.getState().FrameId}
            diptychId={4}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarousel4DiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {renderDownloadButton(selectedPhotograph.photoID, carousel4SelectedDiptychIdCode)}
            {renderLikeButton(selectedPhotograph.photoID, carousel4SelectedDiptychIdCode || '')}
            <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {selectedPhotograph && (
              <DiptychAvailabilityModule
                photoId={selectedPhotograph.photoID}
                diptychId={4} 
              />
            )}
          </div>

          <DiptychCarousel
            photoId={selectedPhotograph.photoID}
            imagePath={selectedPhotograph.imagePath}
            frameId={useStore.getState().FrameId}
            diptychId={5}
            aspectRatio={selectedPhotograph.aspectRatio}
            areShapesVisible={areShapesVisible}
            containerRef={containerRef}
            handleCanvasReady={handleCanvasReady}
            onDiptychIdCodeChange={handleCarousel5DiptychIdCodeChange}
            handleLayoutSpecsReady={handleLayoutSpecsReady}
          />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {renderDownloadButton(selectedPhotograph.photoID, carousel5SelectedDiptychIdCode)}
            {renderLikeButton(selectedPhotograph.photoID, carousel5SelectedDiptychIdCode || '')}
            <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {selectedPhotograph && (
              <DiptychAvailabilityModule
                photoId={selectedPhotograph.photoID}
                diptychId={5} 
              />
            )}
          </div>
          <AuthModal
            open={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            showAnonymousOption={true}
            isLikeTriggered={true}
            photoId={selectedPhotograph?.photoID || ''}
            diptychIdCode={likeButtonDiptychIdCode}
            onSuccessfulAuth={handleLikeButtonClick}
            isAnonymousUser={isAnonymous}
          />
        </Box>
      ) : (
        <Typography>Loading... Please be patient. If nothing loads, I guess there's a problem. Please Inform JPM</Typography>
      )}
     

    </Box>
  );
};

export default Inquiry;