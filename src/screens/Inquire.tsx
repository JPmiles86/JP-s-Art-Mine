// my-gallery/src/screens/Inquire.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import useStore from './store';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import DownloadButton from '../Diptychs/DownloadButton'; 
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import './Inquire.module.css'; 
import useGalleryNavigation from '../utils/useGalleryNavigation'; // Import the hook
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import styles from './Inquire.module.css';
import buttonStyles from './ButtonStyles.module.css';


 // Update the SetPhotoIdProps to match with DiptychComponent prop types
interface SetPhotoIdProps {
  photoId: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onCanvasReady: (canvasRef: fabric.Canvas, diptychIdCode: string) => void; // Add this prop
}

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
  const {photos, fetchPhotos, setSelectedPhoto, selectedPhoto, sortedPhotos, selectedDiptychIdCode,} = useStore(state => ({
    ...state,
    selectedDiptychIdCode: state.selectedDiptychIdCode
  }));
  const currentFilter = location.pathname.split('/')[1];
  const layoutSpecsMap = useStore((state) => state.layoutSpecsMap);
  const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(sortedPhotos, setSelectedPhoto, currentFilter, '/inquire');
  const [areShapesVisible, setAreShapesVisible] = useState(false);

  useEffect(() => {
    if (photos.length === 0) {
      fetchPhotos();
    }
  }, [photos, fetchPhotos]);

  useEffect(() => {
    if (photoID) {
      setSelectedPhoto(photoID);
    }
  }, [photoID, setSelectedPhoto, photos]);

  // Determine the Diptych ID Code to use
  useEffect(() => {
    if (!selectedDiptychIdCode && selectedPhoto) {
      // Set a default Diptych ID Code based on the selected photo's aspect ratio
      const defaultDiptychIdCode = `E_${selectedPhoto.aspectRatio.replace(':', 'x')}_CD_P_W`;
      useStore.getState().setSelectedDiptychIdCode(defaultDiptychIdCode);
    }
  }, [selectedPhoto, selectedDiptychIdCode]);  

  const handleReturnToGallery = () => {
    // Update the selectedDiptychIdCode in the global store before navigating
    useStore.getState().setSelectedDiptychIdCode(selectedDiptychIdCode);
    navigate(`/${currentFilter}/${photoID}`);
  };  

    // Function to handle canvas ready from Diptych component
  const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
    console.log(`Canvas ready for ${diptychIdCode}:`, canvasRef);
    useStore.getState().setFabricCanvasRef(diptychIdCode, canvasRef);
  }, []); // Add dependencies if needed

    // Modified renderDiptych function to use DynamicDiptychComponent
    const renderDiptych = useCallback((diptychIdCode: string, photoId?: string) => {
    const effectivePhotoId = photoId || selectedPhoto?.photoID || '';
    return (
      <div className={styles.diptychContainer}>
        <DynamicDiptychComponent
          photoId={effectivePhotoId}
          containerRef={containerRef}
          onCanvasReady={handleCanvasReady}
          DiptychIdCode={diptychIdCode}
          areShapesVisible={areShapesVisible}
        />
      </div>
    );
  }, [selectedPhoto, areShapesVisible, containerRef, handleCanvasReady]);  
    
  
  const renderDownloadButton = (
    photoId: string,
    diptychIdCode: string
  ) => {
    const fabricCanvasRef = useStore.getState().fabricCanvasRefs.get(diptychIdCode);
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
      
    
  console.log(`Container actual width: ${containerRef.current?.offsetWidth}`);
  useEffect(() => {
    console.log(`Container actual width after render: ${containerRef.current?.offsetWidth}`);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Thanks for inquiring about purchasing my art, which Diptych are you interested in purchasing?
      </Typography>
      <div>
        <button className={buttonStyles.button} onClick={handleReturnToGallery}>Return to Gallery</button>
        <button className={buttonStyles.button} onClick={() => handlePrevPhoto(selectedPhoto ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhoto.photoID) : 0)}>Previous Photo</button>
        <button className={buttonStyles.button} onClick={() => handleNextPhoto(selectedPhoto ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhoto.photoID) : 0)}>Next Photo</button>
      </div>
      {selectedPhoto ? (
        <Box>
          {renderDiptych(selectedDiptychIdCode || '', selectedPhoto.photoID)}
          <Typography style={{ textAlign: 'center' }}>Description for {selectedDiptychIdCode}</Typography>
          {renderDownloadButton(selectedPhoto.photoID, selectedDiptychIdCode || '')}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('E_2x3_DC_L_W', "230330-3890")}
          <Typography style={{ textAlign: 'center' }}>Description for E_2x3_DC_L_W</Typography>
          {renderDownloadButton("230330-3890", 'E_2x3_DC_L_W')}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('F_2x3_CD_P_B', "230330-3890")} 
          <Typography style={{ textAlign: 'center' }}>Description for F_2x3_CD_P_B</Typography>
          {renderDownloadButton("230330-3890", 'F_2x3_CD_P_B')}
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('E_2x3_CD_P_U', "230330-3890")} 
          <Typography style={{ textAlign: 'center' }}>Description for E_2x3_CD_P_U</Typography>
          {renderDownloadButton("230330-3890", 'E_2x3_CD_P_U')} 
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('F_2x3_CD_P_U', "230330-3890")} 
          <Typography style={{ textAlign: 'center' }}>Description for F_2x3_CD_P_U</Typography>
          {renderDownloadButton("230330-3890", 'F_2x3_CD_P_U')} 
          <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>
        </Box>

      ) : (
        <Typography>Loading...</Typography>
      )}
     

    </Box>
  );
};

export default Inquiry;