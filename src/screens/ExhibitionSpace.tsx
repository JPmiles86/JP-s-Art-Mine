// my-gallery/src/screens/ExhibitionSpace.tsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from '../utils/store';
import { fetchPhotosService } from '../utils/fetchPhotosService';
import { parseDiptychIdCode } from '../Diptychs/DiptychDynamicUtils';
import { parseUrlService } from '../utils/parseUrlService';
import ExhibitionHeader from './ExhibitionHeader';
import GalleryBackgroundSelector from '../components/layout/GalleryBackgroundSelector';
import useKeyboardNavigation from '../utils/useKeyboardNavigation';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import { diptychConfigurations } from '../Diptychs/diptychFabricConfigurations';
import DiptychControls from '../Diptychs/DiptychControls';
import useDiptychInfo from '../Diptychs/useDiptychInfo';
import useGalleryNavigation from '../utils/useGalleryNavigation';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import AuthModal from '../components/modals/AuthModal';
import HidePhotoButton from '../components/layout/HidePhotoButton';
import { fabric } from 'fabric';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonStyles from './ButtonStyles.module.css';
//import FullScreenViewWControls from '../components/layout/FullScreenViewWControls';
//import FullScreenControls from '../components/layout/FullScreenControls';

export interface Photograph {
  photoID: string;
  number: string;
  url: string;
  imagePath?: string;
  aspectRatio: string;
  title: string;
  date: string;
  dateOriginal: string;
  index?: number;
  seriesName: string;
  seriesCode: string;
}

const ExhibitionSpace = () => {
  console.log('ExhibitionSpace Rendered or Re-rendered');
  const navigate = useNavigate();
  const { photos } = useStore((state) => state);
  const { filter, photoID } = useParams<{ filter: string, photoID: string }>();
  const {
    currentFilter, setCurrentFilter, sortedPhotos, loading, setLoading, shapeCode, 
    initialPhotoFetch, setInitialPhotoFetch, sortValue, setPhotos
  } = useStore((state) => state);
    // Find the Photograph object that matches the photoID
  const selectedPhotograph = useMemo(() => 
    sortedPhotos.find(photo => photo.photoID === photoID), 
    [sortedPhotos, photoID]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryBackground, setGalleryBackground] = useState('/assets/images/gallerybg/Gallery-2.png');
  const [error] = useState<Error | null>(null);
  const { selectedDiptychIdCode, setSelectedDiptychIdCode } = useStore(state => ({
    selectedDiptychIdCode: state.selectedDiptychIdCode,
    setSelectedDiptychIdCode: state.setSelectedDiptychIdCode
  }));
  const [isContainerReady, setIsContainerReady] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const { diptychInfo, isLoading: diptychInfoLoading } = useDiptychInfo(selectedDiptychIdCode);
  const [isLoading, setIsLoading] = useState(true);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const userRole = useStore((state) => state.userRole);
  const isAnonymous = useStore((state) => state.isAnonymous);
  // const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const [diptychHeightInfo, setDiptychHeightInfo] = useState<{ height: number; marginTop: number }>({ height: 0, marginTop: 0 });
  const [maxContainerSize, setMaxContainerSize] = useState({ width: 0, height: 0 });

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  //const handleOpenFullScreen = () => {
  //  setIsFullScreen(true);
  //};

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);
  
  const updateDiptychHeightInfo = useCallback((height: number) => {
    // Calculate the top margin needed to center the diptych
    const marginTop = fullScreenContainerRef.current
      ? (fullScreenContainerRef.current.clientHeight - height) / 2
      : 0;
  
    setDiptychHeightInfo({ height, marginTop });
  }, []);

  // Ensure that selectedPhotograph is not undefined when using useGalleryNavigation
  const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(
    sortedPhotos,
    currentFilter
  );
  
  const handleLayoutSpecsReadyMemoized = useCallback((layoutSpecs: LayoutSpecs) => {
    console.log('handleLayoutSpecsReady called with:', layoutSpecs);
    setLayoutSpecsMap(prevMap => new Map(prevMap).set(layoutSpecs.DiptychIdCode, layoutSpecs));
  }, []);

    // Function to navigate to the inquiry page
    const navigateToInquiryMemoized = useCallback(() => {
      if (photoID) {
        navigate(`/${currentFilter}/${photoID}/inquire`);
        console.log("Navigating to the inquire page.");
      }
    }, [navigate, photoID, currentFilter]);
  
    const handleChangeGalleryBackground = useCallback((backgroundImage: string) => {
      setGalleryBackground(backgroundImage);
    }, []);
  
    const galleryBackgroundStyle = useMemo(() => ({
      backgroundImage: `url(${galleryBackground})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }), [galleryBackground]);
    
    const wrappedHandlePrevPhoto = useCallback(() => {
      handlePrevPhoto?.(currentIndex);
    }, [handlePrevPhoto, currentIndex]);
    
    const wrappedHandleNextPhoto = useCallback(() => {
      handleNextPhoto?.(currentIndex);
    }, [handleNextPhoto, currentIndex]);

      // Add a toggle function for the shape visibility
    const toggleShapesVisibility = useCallback(() => {
      setAreShapesVisible(prev => !prev);
      console.log("Toggling shapes visibility");
    }, []);

    const onCanvasReady = useCallback((canvasRef: fabric.Canvas, selectedDiptychIdCode: string) => {
      console.log(`Canvas ready for ${selectedDiptychIdCode}`, canvasRef);
      setFabricCanvas(canvasRef); // Set the local state for fabric canvas
    }, []);  

    useKeyboardNavigation(
      wrappedHandleNextPhoto, // Function to handle next photo
      wrappedHandlePrevPhoto, // Function to handle previous photo
      () => {}, // Empty function for swapShape
      () => {}, // Empty function for rotateShape
      () => {}, // Empty function for toggleMergeStatus
      isAuthModalOpen // Pass the isAuthModalOpen state
    );
  
  useEffect(() => {
    console.log(`[ExhibitionSpace] Current filter: ${currentFilter}, New filter: ${filter}`);
    if (filter && filter !== currentFilter) {
      setCurrentFilter(filter);
      console.log("[ExhibitionSpace] Filter updated to:", filter);
    }
  }, [filter, setCurrentFilter, currentFilter]);

   // Fetching photos
  useEffect(() => {
    let isMounted = true;
  
    async function initializeGallery() {
      if (!sortedPhotos.length && currentFilter && isMounted) { // Check isMounted here might not be necessary, but added for illustration
        console.log('[ExhibitionSpace] Fetching photos...');
        await fetchPhotosService(
          setPhotosError, 
          setLoading, 
          setPhotos,
          setInitialPhotoFetch,
          currentFilter,
          initialPhotoFetch, 
          userRole
        );
      }
  
      // If your logic after fetching photos needs to update state, check isMounted before doing so
      if (isMounted) {
        const photo = sortedPhotos.find(photo => photo.photoID === photoID);
        if (photo) {
          console.log('[ExhibitionSpace] Selected photo found:', photo);
          // Perform actions dependent on the selected photo here
        }
      }
    }
  
    initializeGallery();
  
    return () => { isMounted = false; };
  }, [currentFilter, photoID, sortedPhotos, initialPhotoFetch]);
  
  const handleLikeButtonClick = () => {
    if (!useStore.getState().userId) {
      setIsAuthModalOpen(true);
    }
  };

 // Updating currentIndex based on photoID
  useEffect(() => {
   // console.log("trying to update currentIndex if photoID & sortedPhotos are ready");
    if (photoID && sortedPhotos.length > 0) {
      console.log("Updating currentIndex - photoID:", photoID, "sortedPhotos:", sortedPhotos);
      const newIndex = sortedPhotos.findIndex(photo => photo.photoID === photoID);
      if (newIndex >= 0) {
        setCurrentIndex(newIndex);
      }
    }
  }, [photoID, sortedPhotos]);

  // UseEffect to check container size
  useEffect(() => {
    console.log('useEffect for container size check triggered');
    const checkContainerSize = () => {
      const containerToCheck = isFullScreen ? fullScreenContainerRef.current : galleryRef.current;
      if (containerToCheck) {
        const { clientWidth, clientHeight } = containerToCheck;
        const containerReady = clientWidth > 0 && clientHeight > 0;
        console.log("Container dimensions check, isContainerReady:", containerReady, "Width:", clientWidth, "Height:", clientHeight);
        setIsContainerReady(containerReady);
      }
    };

    checkContainerSize();
    window.addEventListener('resize', checkContainerSize);

    return () => {
      window.removeEventListener('resize', checkContainerSize);
    };
  }, [isFullScreen, photoID, isLoading]);

    useEffect(() => {
      if (selectedDiptychIdCode) {
        const { mergedStatus, color, shape } = parseDiptychIdCode(selectedDiptychIdCode);
        useStore.getState().setIsMerged(mergedStatus === 'entangled' ? 'Entangled' : 'Fused');
        useStore.getState().setFrameId(color);
        useStore.getState().setShapeCode(shape);
      }
    }, [selectedDiptychIdCode]);
    
    const diptychControlsRef = useRef<HTMLDivElement>(null);  // Ref for measuring the DiptychControls height

    const calculateMaxContainerSize = useCallback(() => {
      const config = selectedDiptychIdCode ? diptychConfigurations[selectedDiptychIdCode as keyof typeof diptychConfigurations] : null;
      const aspectRatio = config ? config.originalWidth / config.originalHeight : 16 / 9;
  
      const windowHeight = window.innerHeight;
      const diptychControlsHeight = diptychControlsRef.current ? diptychControlsRef.current.clientHeight : 0; // Get the current height of the controls
      const availableHeight = windowHeight - diptychControlsHeight;  // Subtract the controls height from the window height
  
      const maxWidthBasedOnHeight = availableHeight * aspectRatio;
      const maxHeightBasedOnWidth = window.innerWidth / aspectRatio;
  
      const maxWidth = maxWidthBasedOnHeight > window.innerWidth ? window.innerWidth : maxWidthBasedOnHeight;
      const maxHeight = maxHeightBasedOnWidth > availableHeight ? availableHeight : maxHeightBasedOnWidth;
  
      setMaxContainerSize({ width: maxWidth, height: maxHeight });
    }, [selectedDiptychIdCode, window.innerWidth, window.innerHeight]);  

    // Call this function on mount and on window resize
  useEffect(() => {
    calculateMaxContainerSize();
    window.addEventListener('resize', calculateMaxContainerSize);
    return () => window.removeEventListener('resize', calculateMaxContainerSize);
  }, [calculateMaxContainerSize]);
  
    
if (!photoID) {
  return <div>No photo selected.</div>;
  }

if (error) {
  return <div>Error: {error.message}</div>;
}

if (loading.photos || loading.diptychSVG || loading.diptychInfo || loading.galleryBackground) {
  return <div>Loading Exhibition...</div>;
}

console.log('[ExhibitionSpace] Render start:', { photoID, currentFilter, selectedDiptychIdCode });

return (
  <div className={styles.exhibitionSpace}>
    {isFullScreen ? (
      <div
        ref={fullScreenContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', alignItems: 'center' }}>
          <button className={ButtonStyles.idButtonWhite} onClick={wrappedHandlePrevPhoto}>
            &larr; Previous
          </button>
          <strong className={ButtonStyles.photoText}>
            &nbsp;&nbsp;-&nbsp;&nbsp;Photo&nbsp;&nbsp;-&nbsp;&nbsp;
          </strong>
          <button className={ButtonStyles.idButtonWhite} onClick={wrappedHandleNextPhoto}>
            Next &rarr;
          </button>
        </div>
        <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 9999 }}>
          <IconButton onClick={handleCloseFullScreen} style={{ color: 'white', cursor: 'pointer' }}>
            <CloseIcon />
          </IconButton>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', margin: '40px' }}>
            <div 
              ref={containerRef} 
              className={styles.diptychWrapper} 
              style={{ 
                width: '100%', 
                height: '100%', 
                maxWidth: `${maxContainerSize.width}px`,
                maxHeight: `${maxContainerSize.height}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
            {isContainerReady && photoID && selectedDiptychIdCode && selectedPhotograph?.imagePath ? (
              <DynamicDiptychComponent
                photoId={photoID}
                imagePath={selectedPhotograph.imagePath}
                containerRef={containerRef}
                onCanvasReady={onCanvasReady}
                DiptychIdCode={selectedDiptychIdCode}
                areShapesVisible={areShapesVisible}
                onLayoutSpecsReady={handleLayoutSpecsReadyMemoized}
                updateHeight={updateDiptychHeightInfo}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
        <div ref={diptychControlsRef} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10000 }}>
          <DiptychControls
            navigateToInquiry={navigateToInquiryMemoized}
            selectedPhoto={selectedPhotograph}
            layoutSpecs={selectedDiptychIdCode ? layoutSpecsMap.get(selectedDiptychIdCode) : undefined}
            fabricCanvasRef={fabricCanvas}
            areShapesVisible={areShapesVisible}
            toggleShapesVisibility={toggleShapesVisibility}
            setIsAuthModalOpen={setIsAuthModalOpen}
            isAuthModalOpen={isAuthModalOpen}
            handleOpenFullScreen={toggleFullScreen}
          >
          {!isFullScreen && (
            <GalleryBackgroundSelector onChange={handleChangeGalleryBackground} />
          )}             
          </DiptychControls>
        </div>
      </div>
    ) : (
      <>
        {/* Regular exhibition space JSX */}
        <ExhibitionHeader
          currentFilter={currentFilter}
          selectedPhoto={selectedPhotograph || null}
          diptychInfo={diptychInfo}
          handlePrevPhoto={wrappedHandlePrevPhoto}
          handleNextPhoto={wrappedHandleNextPhoto}
        />
        <div ref={galleryRef} className={styles.gallery} style={galleryBackgroundStyle}>
          <div
            style={{
              width: shapeCode && ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
              height: shapeCode && ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <div className={styles.diptychWrapper}>
              {isContainerReady && photoID && selectedDiptychIdCode && selectedPhotograph?.imagePath ? (
                <DynamicDiptychComponent
                  photoId={photoID}
                  imagePath={selectedPhotograph.imagePath}
                  containerRef={containerRef}
                  onCanvasReady={onCanvasReady}
                  DiptychIdCode={selectedDiptychIdCode}
                  areShapesVisible={areShapesVisible}
                  onLayoutSpecsReady={handleLayoutSpecsReadyMemoized}
                />
              ) : (
                <div> </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                {selectedPhotograph && userRole === 'Admin' && (
                  <HidePhotoButton photoId={selectedPhotograph.photoID} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <DiptychControls
            navigateToInquiry={navigateToInquiryMemoized}
            selectedPhoto={selectedPhotograph}
            layoutSpecs={selectedDiptychIdCode ? layoutSpecsMap.get(selectedDiptychIdCode) : undefined}
            fabricCanvasRef={fabricCanvas}
            areShapesVisible={areShapesVisible}
            toggleShapesVisibility={toggleShapesVisibility}
            setIsAuthModalOpen={setIsAuthModalOpen}
            isAuthModalOpen={isAuthModalOpen}
            handleOpenFullScreen={toggleFullScreen}
          >
          {!isFullScreen && (
            <GalleryBackgroundSelector onChange={handleChangeGalleryBackground} />
          )}          
          </DiptychControls>
        </div>
      </>
    )}
    <AuthModal
      open={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      showAnonymousOption={true}
      isLikeTriggered={true}
      photoId={photoID}
      diptychIdCode={selectedDiptychIdCode || undefined}
      onSuccessfulAuth={handleLikeButtonClick}
      isAnonymousUser={isAnonymous}
    />
  </div>
);
};

export default ExhibitionSpace;