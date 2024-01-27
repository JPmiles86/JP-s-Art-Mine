// my-gallery/src/screens/ExhibitionSpace.tsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from '../utils/store';
import { fetchPhotosService } from '../utils/fetchPhotosService';
import { parseUrlService } from '../utils/parseUrlService';
import ExhibitionHeader from './ExhibitionHeader';
import GalleryBackgroundSelector from './GalleryBackgroundSelector';
import useKeyboardNavigation from './useKeyboardNavigation';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import DiptychControls from '../Diptychs/DiptychControls';
import useDiptychInfo from '../Diptychs/useDiptychInfo';
import useGalleryNavigation from '../utils/useGalleryNavigation';
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
  const location = useLocation();
  const { selectedDiptychIdCode, setSelectedDiptychIdCode } = useStore(state => ({
    selectedDiptychIdCode: state.selectedDiptychIdCode,
    setSelectedDiptychIdCode: state.setSelectedDiptychIdCode
  }));
  const [isContainerReady, setIsContainerReady] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutSpecsMap = useStore(state => state.layoutSpecsMap);
  const fabricCanvasMap = useStore(state => state.fabricCanvasRefs);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const { diptychInfo, isLoading: diptychInfoLoading } = useDiptychInfo(selectedDiptychIdCode);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ensure that selectedPhotograph is not undefined when using useGalleryNavigation
  const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(
    sortedPhotos,
    currentFilter
  );
  const [photosError, setPhotosError] = useState<string | null>(null);

  useEffect(() => {
    if (filter) {
      setCurrentFilter(filter);
    }
  }, [filter, setCurrentFilter]);

   // Fetching photos
   useEffect(() => {
    console.log("Checking if photos need to be fetched");
    if (sortedPhotos.length === 0 && currentFilter) {
      console.log('Fetching photos as sortedPhotos is empty and currentFilter is set:', currentFilter);
      fetchPhotosService(
        setPhotosError, 
        setLoading, 
        setPhotos,
        setInitialPhotoFetch,
        currentFilter,
        initialPhotoFetch
      );
    }
  }, [sortedPhotos, currentFilter, setPhotos, setInitialPhotoFetch]);
  
  // Function to navigate to the inquiry page
  const navigateToInquiry = () => {
    if (photoID) {
      navigate(`/${currentFilter}/${photoID}/inquire`);
      console.log("Navigating to the inquire page.");
    } else {
      console.log("No photo selected, unable to navigate to the inquiry page.");
    }
  };

  const handleChangeGalleryBackground = useCallback((backgroundImage: string) => {
    setGalleryBackground(backgroundImage);
  }, []);

   const galleryBackgroundStyle = useMemo(() => ({
    backgroundImage: `url(${galleryBackground})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }), [galleryBackground]);

  const loadComponent = (
    selectedDiptychIdCode: string, 
    setDiptychComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>
  ) => {
    console.log(`Loading DynamicDiptychComponent for selectedDiptychIdCode: ${selectedDiptychIdCode}`);
    setDiptychComponent(() => DynamicDiptychComponent);
  };
  
  const wrappedHandlePrevPhoto = useCallback(() => {
    handlePrevPhoto(currentIndex);
  }, [handlePrevPhoto, currentIndex]);
  
  const wrappedHandleNextPhoto = useCallback(() => {
    handleNextPhoto(currentIndex);
  }, [handleNextPhoto, currentIndex]);
  
  // useKeyboardNavigation(wrappedHandleNextPhoto, wrappedHandlePrevPhoto, swapShape, rotateShape, toggleMergeStatus);
  
  // Add a toggle function for the shape visibility
  const toggleShapesVisibility = useCallback(() => {
    setAreShapesVisible(prev => !prev);
  }, []);

  const onCanvasReady = useCallback((canvasRef: fabric.Canvas, selectedDiptychIdCode: string) => {
    console.log(`Canvas ready for ${selectedDiptychIdCode}`, canvasRef);
  
    // Set the fabric canvas reference in the global state
    useStore.getState().setFabricCanvasRef(selectedDiptychIdCode, canvasRef);
    console.log(`OnCanvasReady Set the fabric canvas reference in the global state ${selectedDiptychIdCode}:`, selectedDiptychIdCode, canvasRef);
  
    // Retrieve the layout specs from the store
    const currentLayoutSpecs = layoutSpecsMap.get(selectedDiptychIdCode);
    console.log(`Retrieved the layout specs from the store ${selectedDiptychIdCode}`);
    if (!currentLayoutSpecs) {
      console.log(`Layout specs not found for ${selectedDiptychIdCode}`);
    }
  }, [layoutSpecsMap]); 
  
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

  // Function to handle canvas ready from Diptych component
  const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, selectedDiptychIdCode: string) => {
    console.log(`handleCanvasReady for Canvas ready for ${selectedDiptychIdCode}:`, canvasRef);
    useStore.getState().setFabricCanvasRef(selectedDiptychIdCode, canvasRef);
  }, []); // Add dependencies if needed

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

if (!photoID) {
  return <div>No photo selected.</div>;
  }

if (error) {
  return <div>Error: {error.message}</div>;
}

if (loading.photos || loading.diptychSVG || loading.diptychInfo || loading.galleryBackground) {
  return <div>Loading Exhibition...</div>;
}

  //console.log('Selected photo in ExhibitionSpace: ', photoID);
  //console.log("Before rendering in ExhibitionSpace, isContainerReady:", isContainerReady, "photoID:", photoID);
  //console.log(`selectedDiptychIdCode is ${selectedDiptychIdCode}`);
  //console.log(`Accessing layoutSpecs for ${selectedDiptychIdCode}`);
  //console.log(`Accessing fabricCanvasMap for ${fabricCanvasMap}`); 
  //console.log(`Accessing layoutSpecsMap for ${layoutSpecsMap}`); 
  
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
            { isContainerReady && photoID && selectedDiptychIdCode ? (
              <DynamicDiptychComponent 
              photoId={photoID}
              containerRef={containerRef}
              onCanvasReady={onCanvasReady}
              DiptychIdCode={selectedDiptychIdCode}
              areShapesVisible={areShapesVisible}
            />
            ) : (
              <div>No photo selected.</div>
            )}
          </div>
          </div>
      </div>
      <div>
      <DiptychControls
            navigateToInquiry={navigateToInquiry}
            selectedPhoto={selectedPhotograph}
            layoutSpecs={selectedDiptychIdCode ? layoutSpecsMap.get(selectedDiptychIdCode) : undefined} 
            fabricCanvasRef={selectedDiptychIdCode ? fabricCanvasMap.get(selectedDiptychIdCode) : undefined}
            areShapesVisible={areShapesVisible}
            toggleShapesVisibility={toggleShapesVisibility}
          >
                    <GalleryBackgroundSelector onChange={handleChangeGalleryBackground} />
                </DiptychControls>
        </div>
    </div>
);
};

export default ExhibitionSpace;