// my-gallery/src/screens/ExhibitionSpace.tsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from './store';
import ExhibitionHeader from './ExhibitionHeader';
import GalleryBackgroundSelector from './GalleryBackgroundSelector';
import useKeyboardNavigation from './useKeyboardNavigation';
import { generateDiptychIdCode, loadComponent, parseDiptychIdCode } from '../Diptychs/DiptychDynamicUtils';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import DiptychControls from '../Diptychs/DiptychControls';
import { swapMapping, rotateMapping } from '../Diptychs/DiptychIdCodeMapping';
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
  const { photos, fetchPhotos, selectedPhoto, setSelectedPhoto, loading } = useStore((state) => state);
  const { photoID } = useParams<{ photoID: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryBackground, setGalleryBackground] = useState('/assets/images/gallerybg/Gallery-2.png');
  const [error] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const currentFilter = location.pathname.split('/')[1];
  const currentPhotoID = location.pathname.split('/')[2];
  const { sortedPhotos, setPreviousFilter } = useStore();
  const [DiptychComponent, setDiptychComponent] = useState<React.ComponentType<any> | null>(null);
  const [frameColor, setFrameColor] = useState<number>();
  const [isMerged, setIsMerged] = useState<string>();
  const [shapeCode, setShapeCode] = useState<string>();
  const [isContainerReady, setIsContainerReady] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const diptychIdCode = useMemo(() => {
    if (selectedPhoto && isMerged !== undefined && frameColor !== undefined && shapeCode !== undefined) {
      // Call the function only when all parameters are defined
      return generateDiptychIdCode(selectedPhoto, isMerged, frameColor, shapeCode);
    }
    return null; // Return null if any of the parameters are not defined
  }, [selectedPhoto, isMerged, frameColor, shapeCode]);const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(sortedPhotos, setSelectedPhoto, currentFilter);
  const { diptychInfo, isLoading: diptychInfoLoading } = useDiptychInfo(diptychIdCode);
  const layoutSpecsMap = useStore(state => state.layoutSpecsMap);
  const fabricCanvasMap = useStore(state => state.fabricCanvasRefs);
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const { selectedDiptychIdCode, setSelectedDiptychIdCode } = useStore(state => ({
    selectedDiptychIdCode: state.selectedDiptychIdCode,
    setSelectedDiptychIdCode: state.setSelectedDiptychIdCode
  }));
  

  const onCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
    console.log(`Canvas ready for ${diptychIdCode}`, canvasRef);
  
    // Set the diptychIdCode as the selectedDiptychIdCode in the global state
    setSelectedDiptychIdCode(diptychIdCode); // This updates the state in your Zustand store
  
    // Set the fabric canvas reference in the global state
    useStore.getState().setFabricCanvasRef(diptychIdCode, canvasRef);
  
    // Retrieve the layout specs from the store
    const currentLayoutSpecs = layoutSpecsMap.get(diptychIdCode);
    if (!currentLayoutSpecs) {
      console.log(`Layout specs not found for ${diptychIdCode}`);
    }
  }, [layoutSpecsMap, setSelectedDiptychIdCode]); // Make sure to include setSelectedDiptychIdCode in the dependency array
  

  useEffect(() => {
    // Check if a selectedDiptychIdCode exists in the store
    if (selectedDiptychIdCode) {
      // Use the parseDiptychIdCode function to get the actual values
      const { mergedStatus, color, shape } = parseDiptychIdCode(selectedDiptychIdCode);
      
      // Set the state with the parsed values
      setFrameColor(color); // Assuming the color is returned as the expected number
      setIsMerged(mergedStatus); // Assuming the merged status is returned as the expected string
      setShapeCode(shape); // Assuming the shape is returned as the expected string
    } else {
      // Set the state with default values
      setFrameColor(1); // Assuming 1 corresponds to 'white' frame color in your system
      setIsMerged('entangled');
      setShapeCode('CD');
    }
  }, [selectedDiptychIdCode, setFrameColor, setIsMerged, setShapeCode]);
  
// Fetch photos from the backend when the component mounts or the 'photos' array changes
  useEffect(() => {
    if (photos.length === 0) {
      fetchPhotos();
    }
  }, [photos, fetchPhotos]);

  useEffect(() => {
    if (photoID) {
      setSelectedPhoto(photoID);
    }
  }, [photoID, setSelectedPhoto]);

  // Set the current index to the index of the selected photo in the sortedPhotos array
  useEffect(() => {
    if (sortedPhotos && sortedPhotos.length > 0) {
      const newIndex = sortedPhotos.findIndex((img: Photograph) => img.photoID === photoID);
      setCurrentIndex(newIndex);
      setIsLoading(false);
    } else {
      console.log("Photos are not available yet!");
    }
  }, [photoID, sortedPhotos]);

  useEffect(() => {
    if (selectedPhoto && typeof isMerged === 'string' && typeof frameColor === 'number' && typeof shapeCode === 'string') {
      const diptychIdCode = generateDiptychIdCode(selectedPhoto, isMerged, frameColor, shapeCode);
      loadComponent(diptychIdCode, setDiptychComponent);
      // Retrieve the layoutSpecs and fabricCanvasRef
      const currentLayoutSpecs = useStore.getState().layoutSpecsMap.get(diptychIdCode);
      const fabricCanvasRef = useStore.getState().fabricCanvasRefs.get(diptychIdCode);
      
      // Here you need to ensure that these are set in the state or used to pass as props
    }
//  }, [selectedPhoto, isMerged, frameColor, shapeCode]);
 }, [selectedPhoto, isMerged, frameColor, shapeCode, loadComponent, setDiptychComponent]);

  

  useEffect(() => {
    if (!loading.diptychInfo) {
      setIsLoading(false);
    }
  }, [loading.diptychInfo]);

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
  }, [selectedPhoto, DiptychComponent, isLoading]); // Additional temporary dependencies

  const handleBackToImageGrid = () => {
    setPreviousFilter(currentFilter);
    navigate(`/${currentFilter}`);
  };

  const navigateToInquiry = () => {
    navigate(`/${currentFilter}/${currentPhotoID}/inquire`);
};

  // Event handler to change the frame color; alternates between two color options
  const changeFrameColor = useCallback(() => {
    if (!isLoading && !diptychInfoLoading) {
      setFrameColor(prevColor => prevColor === 1 ? 2 : 1);
    }
  }, [isLoading, diptychInfoLoading, setFrameColor]);  

  const toggleMergeStatus = useCallback(() => {
    if (!isLoading && !diptychInfoLoading) {
      setIsMerged(prevState => prevState === 'entangled' ? 'fused' : 'entangled');
    }
  }, [isLoading, diptychInfoLoading, setIsMerged]);
  
  const swapShape = useCallback(() => {
    if (!isLoading && !diptychInfoLoading) {
        setShapeCode(prevCode => {
            const key = prevCode as keyof typeof swapMapping;
            return swapMapping[key] || prevCode;
        });
    }
  }, [isLoading, diptychInfoLoading, setShapeCode]);

  const rotateShape = useCallback(() => {
      if (!isLoading && !diptychInfoLoading) {
          setShapeCode(prevCode => {
              const key = prevCode as keyof typeof rotateMapping;
              return rotateMapping[key] || prevCode;
          });
      }
  }, [isLoading, diptychInfoLoading, setShapeCode]);
  
  const wrappedHandlePrevPhoto = useCallback(() => {
    handlePrevPhoto(currentIndex);
  }, [handlePrevPhoto, currentIndex]);
  
  const wrappedHandleNextPhoto = useCallback(() => {
    handleNextPhoto(currentIndex);
  }, [handleNextPhoto, currentIndex]);
  
  useKeyboardNavigation(wrappedHandleNextPhoto, wrappedHandlePrevPhoto, swapShape, rotateShape, toggleMergeStatus);
  
  // Add a toggle function for the shape visibility
  const toggleShapesVisibility = useCallback(() => {
    setAreShapesVisible(prev => !prev);
  }, []);

  const handleChangeGalleryBackground = useCallback((backgroundImage: string) => {
    setGalleryBackground(backgroundImage);
  }, [setGalleryBackground]);  

  // useMemo to memoize the background image style
  const galleryBackgroundStyle = useMemo(() => ({
    backgroundImage: `url(${galleryBackground})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }), [galleryBackground]);

      // Function to handle canvas ready from Diptych component
      const handleCanvasReady = useCallback((canvasRef: fabric.Canvas, diptychIdCode: string) => {
        console.log(`Canvas ready for ${diptychIdCode}:`, canvasRef);
        useStore.getState().setFabricCanvasRef(diptychIdCode, canvasRef);
      }, []); // Add dependencies if needed

  if (!selectedPhoto || !DiptychComponent) {
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
  console.log("Gallery background image URL:", galleryBackground);
  console.log(`Accessing layoutSpecs for ${diptychIdCode}`);

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
            { isContainerReady && selectedPhoto && DiptychComponent && diptychIdCode ? (
              <DynamicDiptychComponent 
              photoId={selectedPhoto.photoID}
              containerRef={containerRef}
              onCanvasReady={onCanvasReady}
              DiptychIdCode={diptychIdCode}
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
            frameColor={frameColor}
            setFrameColor={setFrameColor}
            isMerged={isMerged}
            toggleMergeStatus={toggleMergeStatus}
            swapShape={swapShape}
            rotateShape={rotateShape}
            navigateToInquiry={navigateToInquiry}
            photoId={selectedPhoto?.photoID}
            DiptychIdCode={diptychIdCode}
            layoutSpecs={diptychIdCode ? layoutSpecsMap.get(diptychIdCode) : undefined} 
            fabricCanvasRef={diptychIdCode ? fabricCanvasMap.get(diptychIdCode) : undefined}
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