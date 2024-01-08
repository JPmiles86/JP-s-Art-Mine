// my-gallery/src/screens/Inquire.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import useStore from './store';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import DownloadButton from '../Diptychs/DownloadButton'; 
import { LayoutSpecs } from '../Diptychs/LayoutSpecs'; 
import './Inquire.module.css'; 
import useGalleryNavigation from '../utils/useGalleryNavigation'; // Import the hook
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


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
  const { photoID } = useParams<{ photoID: string }>();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null); 
  const { photos, fetchPhotos, setSelectedPhoto, selectedPhoto, sortedPhotos } = useStore();
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

   // Add a style object for the SVG containers
const svgContainerStyle = {
  marginTop: '20px',
  maxWidth: '1000px',
  width: '100%', // Makes sure it scales based on the parent's width
  height: 'auto', // Maintains aspect ratio
};

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '1px solid #000',
  borderRadius: 0, // Making corners square
  cursor: 'pointer',
  color: 'black',
  fontSize: '16px',
  padding: '5px 10px',
  fontFamily: "'EB Garamond', serif",
  width: '150px',
  height: '40px',
  textAlign: 'center' as 'center', 
  textTransform: 'none' as 'none',
};

    // Function to handle canvas ready from Diptych component
    const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
      console.log(`Canvas ready for ${diptychIdCode}:`, canvasRef);
      useStore.getState().setFabricCanvasRef(diptychIdCode, canvasRef);
    }, []); // Add dependencies if needed
  
     // Modified renderDiptych function to use DynamicDiptychComponent
     const renderDiptych = (diptychIdCode: string, photoId?: string) => {
      // Fallback to an empty string if photoId and selectedPhoto?.photoID are undefined
      const effectivePhotoId = photoId || selectedPhoto?.photoID || '';
    
      return (
        <div style={svgContainerStyle}>
          <DynamicDiptychComponent
            photoId={effectivePhotoId}
            containerRef={containerRef}
            onCanvasReady={handleCanvasReady}
            DiptychIdCode={diptychIdCode}
            areShapesVisible={areShapesVisible} 
          />
        </div>
      );
    };
    
  
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
        <Button sx={{ ...buttonStyle, marginRight: '10px' }} onClick={() => handlePrevPhoto(selectedPhoto ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhoto.photoID) : 0)}>Previous Photo</Button>
        <Button sx={buttonStyle} onClick={() => handleNextPhoto(selectedPhoto ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhoto.photoID) : 0)}>Next Photo</Button>
      </div>
      {selectedPhoto ? (
        <Box>
          {renderDiptych('E_2x3_CD_P_B', selectedPhoto.photoID)}
          <Typography style={{ textAlign: 'center' }}>Description for E_2x3_CD_P_B</Typography>
          {renderDownloadButton(selectedPhoto.photoID, 'E_2x3_CD_P_B')}
          <button style={buttonStyle} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('E_2x3_DC_L_W', "230330-3890")}
          <Typography style={{ textAlign: 'center' }}>Description for E_2x3_DC_L_W</Typography>
          {renderDownloadButton("230330-3890", 'E_2x3_DC_L_W')}
          <button style={buttonStyle} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('F_2x3_CD_P_B', "230330-3890")} 
          <Typography style={{ textAlign: 'center' }}>Description for F_2x3_CD_P_B</Typography>
          {renderDownloadButton("230330-3890", 'F_2x3_CD_P_B')}
          <button style={buttonStyle} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('E_2x3_CD_P_U', "230330-3890")} 
          <Typography style={{ textAlign: 'center' }}>Description for E_2x3_CD_P_U</Typography>
          {renderDownloadButton("230330-3890", 'E_2x3_CD_P_U')} 
          <button style={buttonStyle} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>

          {renderDiptych('F_2x3_CD_P_U', "230330-3890")} 
          <Typography style={{ textAlign: 'center' }}>Description for F_2x3_CD_P_U</Typography>
          {renderDownloadButton("230330-3890", 'F_2x3_CD_P_U')} 
          <button style={buttonStyle} onClick={() => setAreShapesVisible(prev => !prev)}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'} </button>
        </Box>

      ) : (
        <Typography>Loading...</Typography>
      )}
     

    </Box>
  );
};

export default Inquiry;