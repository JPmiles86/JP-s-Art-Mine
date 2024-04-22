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
import DiptychControls from '../Diptychs/DiptychControls';
import useDiptychInfo from '../Diptychs/useDiptychInfo';
import useGalleryNavigation from '../utils/useGalleryNavigation';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import AuthModal from '../components/modals/AuthModal';
import HidePhotoButton from '../components/layout/HidePhotoButton';
import { fabric } from 'fabric';


interface Photograph {
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
  
  // Call the useKeyboardNavigation hook with the appropriate function references
 // useKeyboardNavigation(
 //   wrappedHandleNextPhoto, // Function to handle next photo
 //   wrappedHandlePrevPhoto, // Function to handle previous photo
 //   handleSwapShape, // Function to swap shape
 //   handleRotateShape, // Function to rotate shape
 //   handleToggleMergeStatus // Function to toggle merge status
 // );  
  
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
    if (galleryRef.current) {
      const { clientWidth } = galleryRef.current;
      const containerReady = clientWidth > 0;
      console.log("Gallery container width check, isContainerReady:", containerReady, "Width:", clientWidth);
      setIsContainerReady(containerReady);
      }
      };

      checkContainerSize();
      window.addEventListener('resize', checkContainerSize);

      return () => {
        window.removeEventListener('resize', checkContainerSize);
      };
    }, [photoID, isLoading]);

    useEffect(() => {
      if (selectedDiptychIdCode) {
        const { mergedStatus, color, shape } = parseDiptychIdCode(selectedDiptychIdCode);
        useStore.getState().setIsMerged(mergedStatus === 'entangled' ? 'Entangled' : 'Fused');
        useStore.getState().setFrameId(color);
        useStore.getState().setShapeCode(shape);
      }
    }, [selectedDiptychIdCode]);
  
    
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
      <ExhibitionHeader
        currentFilter={currentFilter}
        selectedPhoto={selectedPhotograph || null}
        diptychInfo={diptychInfo}
        handlePrevPhoto={wrappedHandlePrevPhoto}
        handleNextPhoto={wrappedHandleNextPhoto}
      />
      <div ref={galleryRef} className={styles.gallery} style={galleryBackgroundStyle}>
      <div style={{
         width: shapeCode && ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
         height: shapeCode && ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
         maxWidth: '800px',
         margin: '0 auto',
       }}
          >
            <div className={styles.diptychWrapper}>
            { isContainerReady && photoID && selectedDiptychIdCode && selectedPhotograph?.imagePath ? (
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
             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
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
          >
            <GalleryBackgroundSelector onChange={handleChangeGalleryBackground} />
        </DiptychControls>
      </div>
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
console.log('[ExhibitionSpace] Render end');

export default ExhibitionSpace;