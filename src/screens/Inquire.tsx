// my-gallery/src/screens/Inquire.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Divider } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import useStore from '../utils/store';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import DownloadButton from '../components/layout/DownloadButton';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import useGalleryNavigation from '../utils/useGalleryNavigation';
import { useNavigate } from 'react-router-dom';
import styles from './Inquire.module.css';
import buttonStyles from './ButtonStyles.module.css';
import DiptychCarousel from '../Diptychs/DiptychCarousel';
import DiptychCarouselDynamic from '../Diptychs/DiptychCarouselDynamic';
import { fetchPhotosService } from '../utils/fetchPhotosService';
import DiptychAvailabilityModule from '../Diptychs/DiptychAvailabilityModule';
import LikeButton from '../components/layout/LikeButton';
import AuthModal from '../components/modals/AuthModal';


interface DiptychDetail {
  photoId: string;
  seriesName: string;
  date: string;
  number: string;
  shutterSpeed: string;
  aspectRatio: string;
  model: string;
  lens: string;
  focalLength: string;
  aperture: string;
  iso: string;
  diptychName: string;
  diptychId: number;
}

const Inquiry: React.FC = () => {
  const navigate = useNavigate();
  const { photoID } = useParams<{ photoID: string }>();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { photos, initialPhotoFetch, sortValue, setPhotos, setSortedPhotos, setInitialPhotoFetch, sortedPhotos, selectedDiptychIdCode } = useStore(state => ({
    ...state,
    selectedDiptychIdCode: state.selectedDiptychIdCode
  }));
  const currentFilter = location.pathname.split('/')[1];
  const selectedPhotograph = useMemo(() => sortedPhotos.find(photo => photo.photoID === photoID), [sortedPhotos, photoID]);
  const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(sortedPhotos, currentFilter, '/inquire');
  const [diptychDetails, setDiptychDetails] = useState<DiptychDetail | null>(null);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
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
  const userId = useStore((state) => state.userId);

  const handleCarousel1DiptychIdCodeChange = (code: string) => { setCarousel1SelectedDiptychIdCode(code); };
  const handleCarousel2DiptychIdCodeChange = (code: string) => { setCarousel2SelectedDiptychIdCode(code); };
  const handleCarousel3DiptychIdCodeChange = (code: string) => { setCarousel3SelectedDiptychIdCode(code); };
  const handleCarousel4DiptychIdCodeChange = (code: string) => { setCarousel4SelectedDiptychIdCode(code); };
  const handleCarousel5DiptychIdCodeChange = (code: string) => { setCarousel5SelectedDiptychIdCode(code); };

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

  useEffect(() => {
    console.log("Inquiry Component Mounted");

    return () => {
      console.log("Inquiry Component Unmounted");
    };
  }, []);

  useEffect(() => {
    if (!selectedPhotograph && photoID && sortedPhotos.length === 0) {
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
    if (selectedPhotograph && !selectedDiptychIdCode) {
      const defaultFrameType = useStore.getState().frames[useStore.getState().FrameId - 1]?.frameType;
      const defaultDiptychIdCode = `E_${selectedPhotograph.aspectRatio.replace(':', 'x')}_CD_P_${defaultFrameType.charAt(0).toUpperCase()}`;
      useStore.getState().setSelectedDiptychIdCode(defaultDiptychIdCode);

      setCarousel1SelectedDiptychIdCode(defaultDiptychIdCode);
      setCarousel2SelectedDiptychIdCode(defaultDiptychIdCode);
      setCarousel3SelectedDiptychIdCode(defaultDiptychIdCode);
      setCarousel4SelectedDiptychIdCode(defaultDiptychIdCode);
      setCarousel5SelectedDiptychIdCode(defaultDiptychIdCode);
    }
  }, [selectedPhotograph, selectedDiptychIdCode]);

  useEffect(() => {
    const fetchDiptychDetails = async () => {
      try {
        const response = await axios.get(`/api/diptychs/details/${photoID}/${selectedDiptychIdCode}`);
        setDiptychDetails(response.data);
      } catch (error) {
        console.error('Error fetching diptych details:', error);
      }
    };
  
    if (selectedPhotograph && selectedDiptychIdCode) {
      fetchDiptychDetails();
    }
  }, [photoID, selectedDiptychIdCode]);

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
        newFrameId = 1;
    }
    useStore.getState().setFrameId(newFrameId);

    if (selectedPhotograph) {
      const newDiptychIdCode = `E_${selectedPhotograph.aspectRatio.replace(':', 'x')}_CD_P_${frameType.charAt(0).toUpperCase()}`;
      useStore.getState().setSelectedDiptychIdCode(newDiptychIdCode);
    }
  }, [selectedPhotograph]);

  const handleReturnToGallery = () => {
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
      <Box position="sticky" top={55} bgcolor="white" zIndex={1000} display="flex" justifyContent="space-between" alignItems="center" padding="10px">
        <Box width="100%" display="flex" justifyContent="center">
          <button className={buttonStyles.button} style={{ marginTop: '0px', marginBottom: '10px', marginRight: '10px' }} onClick={() => handlePrevPhoto(selectedPhotograph ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhotograph.photoID) : 0)}>Previous Photo</button>
          <button className={buttonStyles.button} style={{ marginTop: '0px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }} onClick={() => setAreShapesVisible(prev => !prev)}>
            {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
          </button>
          <button className={buttonStyles.button} style={{ marginTop: '0px', marginBottom: '10px', marginLeft: '10px' }} onClick={() => handleNextPhoto(selectedPhotograph ? sortedPhotos.findIndex(photo => photo.photoID === selectedPhotograph.photoID) : 0)}>Next Photo</button>
        </Box>
      </Box>
      {selectedPhotograph && selectedDiptychIdCode ? (
        <Box>
          <Typography variant="h5" gutterBottom style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '70px' }}>
            Thank you for inquiring about purchasing my art, I truely appreciate it.<br />
            Which diptych variation are you interested in purchasing?
          </Typography>
          <Divider style={{ margin: '40px 0' }} />
          <Box style={{ display: 'flex', marginTop: '20px', alignItems: 'center' }}>
            <Box style={{ width: '50%', paddingRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" style={{ marginBottom: '20px', textAlign: 'center' }}>
              While in the Exhibition Gallery,<br />
              the last artwork you were viewing was...
            </Typography>
            <Typography variant="h6">
              <strong>Photograph ID:</strong> {diptychDetails?.photoId}
            </Typography>
            <Typography variant="h6">
              <strong>Diptych Variation:</strong> {diptychDetails?.diptychName}
            </Typography>
              <div style={{ marginTop: '10px' }}>
  {/* {renderDownloadButton(selectedPhotograph.photoID, selectedDiptychIdCode || '')} */}
  {/*  {renderLikeButton(selectedPhotograph.photoID, selectedDiptychIdCode || '')} */}
  {/* <button className={buttonStyles.button} onClick={() => setAreShapesVisible(prev => !prev)}>
    {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
   </button> */}
              </div>
              <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
                See below to find the {diptychDetails?.diptychName}'s availability. <br/>
                It is located at <strong>Diptych Variation #{diptychDetails?.diptychId}</strong> <br/>
                <br/>
                If it says Buy Now, it's available for purchase. <br/>
                If it says Pending Sale, someone else it trying to purchase it. <br/>
                If it says Sold, then someone has already bought it, sorry.
              </Typography>
            </Box>
            <Box style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {renderDiptych(selectedDiptychIdCode || '', selectedPhotograph.photoID)}
            </Box>
          </Box>

          <Divider style={{ margin: '40px 0' }} />

          {[1, 2, 3, 4, 5].map((diptychId) => (
            <Box key={diptychId} className={styles.diptychVariationContainer}>
              <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>
                Diptych Variation #{diptychId}
              </Typography>
              <Box className={styles.availabilityAndCarouselContainer}>
                <Box className={styles.availabilityModule}>
                  <DiptychAvailabilityModule
                    photoId={selectedPhotograph.photoID}
                    diptychId={diptychId}
                    userId={userId} // Add this line
                  />
                </Box>
                <Box className={styles.carousel}>
                  {diptychId === 1 ? (
                    <DiptychCarouselDynamic
                      photoId={selectedPhotograph.photoID}
                      imagePath={selectedPhotograph.imagePath}
                      frameId={useStore.getState().FrameId}
                      diptychId={diptychId}
                      aspectRatio={selectedPhotograph.aspectRatio}
                      areShapesVisible={areShapesVisible}
                      containerRef={containerRef}
                      handleCanvasReady={handleCanvasReady}
                      onDiptychIdCodeChange={handleCarousel1DiptychIdCodeChange}
                      handleLayoutSpecsReady={handleLayoutSpecsReady}
                    />
                  ) : (
                    <DiptychCarousel
                      photoId={selectedPhotograph.photoID}
                      imagePath={selectedPhotograph.imagePath}
                      frameId={useStore.getState().FrameId}
                      diptychId={diptychId}
                      aspectRatio={selectedPhotograph.aspectRatio}
                      areShapesVisible={areShapesVisible}
                      containerRef={containerRef}
                      handleCanvasReady={handleCanvasReady}
                      onDiptychIdCodeChange={
                        diptychId === 2
                          ? handleCarousel2DiptychIdCodeChange
                          : diptychId === 3
                          ? handleCarousel3DiptychIdCodeChange
                          : diptychId === 4
                          ? handleCarousel4DiptychIdCodeChange
                          : handleCarousel5DiptychIdCodeChange
                      }
                      handleLayoutSpecsReady={handleLayoutSpecsReady}
                    />
                  )}
                </Box>
              </Box>
              <Divider style={{ margin: '40px 0' }} />
            </Box>
          ))}

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