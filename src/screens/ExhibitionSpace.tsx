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
  const navigate = useNavigate();
  const { photos } = useStore((state) => state);
  const {
    currentFilter, setCurrentFilter, sortedPhotos, setSortedPhotos, 
    selectedPhoto, setSelectedPhoto, loading, setLoading, shapeCode, 
    initialPhotoFetch, setInitialPhotoFetch, sortValue, setPhotos
  } = useStore((state) => state);
  const { photoID } = useParams<{ photoID: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryBackground, setGalleryBackground] = useState('/assets/images/gallerybg/Gallery-2.png');
  const [error] = useState<Error | null>(null);
  const location = useLocation();
  const {  } = useStore();
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
  const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(sortedPhotos, setSelectedPhoto, currentFilter);
  const [photosError, setPhotosError] = useState<string | null>(null);

  // Function to navigate to the inquiry page
const navigateToInquiry = () => {
  if (selectedPhoto) {
    navigate(`/${currentFilter}/${selectedPhoto.photoID}/inquire`);
    console.log("Navigating to the inquire page.");
  } else {
    console.log("No photo selected, unable to navigate to the inquiry page.");
  }
};

  const handleChangeGalleryBackground = useCallback((backgroundImage: string) => {
    setGalleryBackground(backgroundImage);
  }, []);

   // useMemo to memoize the background image style
   const galleryBackgroundStyle = useMemo(() => ({
    backgroundImage: `url(${galleryBackground})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }), [galleryBackground]);

 // Replace the useEffect hook for fetching photos
 useEffect(() => {
  if (sortedPhotos.length === 0 || !selectedPhoto) {
    const parsedUrl = new parseUrlService().parseUrl();

    if (sortedPhotos.length === 0) {
      fetchPhotosService(
        setPhotosError, 
        setLoading, 
        setPhotos,
        setInitialPhotoFetch,
        parsedUrl.filter,
        initialPhotoFetch
      );
    }
    
    // Set selected photo from URL
    if (!selectedPhoto && parsedUrl.photoID) {
      setSelectedPhoto(parsedUrl.photoID);
    }
  }
}, [selectedPhoto, sortedPhotos, setPhotos, setInitialPhotoFetch, setSelectedPhoto]);

useEffect(() => {
  if (photoID) {
    setSelectedPhoto(photoID);
    // Check if the photoID is in the current sortedPhotos
    const photoExists = sortedPhotos.some(photo => photo.photoID === photoID);
    if (!photoExists) {
      // Fetch and sort photos if the current photoID is not in the sortedPhotos
      // Call fetchPhotosService here if needed
    }
  }
}, [photoID, sortedPhotos, setSelectedPhoto]);


  // Set the current index to the index of the selected photo in the sortedPhotos array
  useEffect(() => {
    if (selectedPhoto) {
      const newIndex = sortedPhotos.findIndex(photo => photo.photoID === selectedPhoto.photoID);
      setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    }
  }, [selectedPhoto, sortedPhotos]);
  

const loadComponent = (
  selectedDiptychIdCode: string, 
  setDiptychComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>
) => {
  console.log(`Loading DynamicDiptychComponent for selectedDiptychIdCode: ${selectedDiptychIdCode}`);
  setDiptychComponent(() => DynamicDiptychComponent);
};
  
  useEffect(() => {
    if (!loading.diptychInfo) {
      setIsLoading(false);
    }
  }, [loading.diptychInfo]);
  
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
  

  // Function to handle canvas ready from Diptych component
  const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, selectedDiptychIdCode: string) => {
    console.log(`Canvas ready for ${selectedDiptychIdCode}:`, canvasRef);
    useStore.getState().setFabricCanvasRef(selectedDiptychIdCode, canvasRef);
  }, []); // Add dependencies if needed

  // UseEffect to check container size
  useEffect(() => {
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
    }, [selectedPhoto, isLoading]);

if (!selectedPhoto) {
  return <div>No photo selected.</div>;
  }

if (error) {
  return <div>Error: {error.message}</div>;
}

if (loading.photos || loading.diptychSVG || loading.diptychInfo || loading.galleryBackground) {
  return <div>Loading Exhibition...</div>;
}

  console.log('Selected photo in ExhibitionSpace: ', selectedPhoto);
  console.log("Before rendering in ExhibitionSpace, isContainerReady:", isContainerReady, "selectedPhoto:", selectedPhoto);
  console.log(`selectedDiptychIdCode is ${selectedDiptychIdCode}`);
  console.log(`Accessing layoutSpecs for ${selectedDiptychIdCode}`);
  console.log(`Accessing fabricCanvasMap for ${fabricCanvasMap}`); 
  console.log(`Accessing layoutSpecsMap for ${layoutSpecsMap}`); 
  
  return (
    <div className={styles.exhibitionSpace}>
      <ExhibitionHeader
        currentFilter={currentFilter}
        selectedPhoto={selectedPhoto}
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
            { isContainerReady && selectedPhoto && selectedDiptychIdCode ? (
              <DynamicDiptychComponent 
              photoId={selectedPhoto.photoID}
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
            selectedPhoto={selectedPhoto}
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