import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from './store';
import ExhibitionHeader from './ExhibitionHeader';
import GalleryBackgroundSelector from './GalleryBackgroundSelector';
import useKeyboardNavigation from './useKeyboardNavigation';
import * as diptychs from '../Diptychs';

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
  const { photos, fetchPhotos, selectedPhoto, setSelectedPhoto } = useStore((state) => state);
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
  const [frameColor, setFrameColor] = useState<number>(1);
  const [isMerged, setIsMerged] = useState<string>('entangled');
  const [aspectRatio, setAspectRatio] = useState<string>('');
  const [shapeCode, setShapeCode] = useState<string>('CD');
  const [diptychInfo, setDiptychInfo] = useState<any>(null);
  const [diptychLoading, setDiptychLoading] = useState(true);

  const swapMapping: { [key: string]: string } = {
    'CD': 'SD',
    'SD': 'CD',
    'DS': 'TS',
    'TS': 'DS',
    'ST': 'CT',
    'CT': 'ST',
    'TC': 'DC',
    'DC': 'TC',
  };

  const rotateMapping: { [key: string]: string } = {
    'CD': 'DS',
    'DS': 'ST',
    'ST': 'TC',
    'TC': 'CD',
    'SD': 'DC',
    'DC': 'CT',
    'CT': 'TS',
    'TS': 'SD',
  };

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
    if (selectedPhoto) {
      setAspectRatio(selectedPhoto.aspectRatio);
  
      // Here we replace ":" with "x"
      let normalizedAspectRatio = selectedPhoto.aspectRatio.replace(':', 'x');
      let orientation = ['C', 'S'].includes(shapeCode.charAt(0)) ? 'P' : 'L';
  
      let DiptychIdCode: string;
      if (isMerged === 'entangled') {
        DiptychIdCode = `E_${normalizedAspectRatio}_${shapeCode}_${orientation}_${frameColor === 1 ? 'W' : 'B'}`;
      } else {
        DiptychIdCode = `F_${normalizedAspectRatio}_${shapeCode}_${orientation}_${frameColor === 1 ? 'W' : 'B'}`;
      }
  
      setDiptychLoading(true); // Set loading state to true
  
      import(`../Diptychs/${DiptychIdCode}`)
        .then((module) => {
          console.log('Setting DiptychComponent', module.default);
          setDiptychComponent(() => module.default);
  
          // Fetch the diptych info using the DiptychIdCode from the correct API endpoint
          const fetchDiptychInfo = async (diptychIdCode: string) => {
            try {
              const response = await fetch(`/api/diptychsvgs/${diptychIdCode}`); 
              const data = await response.json();
              setDiptychInfo(data);
              setDiptychLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
              console.error('Error fetching diptych info:', error);
              setDiptychLoading(false); // Set loading state to false in case of an error
            }
          };
  
          fetchDiptychInfo(DiptychIdCode);
        })
        .catch((err) => {
          console.log(err);
          setDiptychLoading(false); // Set loading state to false in case of an error
        });
    }
  }, [selectedPhoto, isMerged, frameColor, shapeCode]);
  
  
  useEffect(() => {
    if (selectedPhoto && diptychInfo) {
      setIsLoading(false);
    }
  }, [selectedPhoto, diptychInfo]);  

  const handleBackToImageGrid = () => {
    setPreviousFilter(currentFilter);
    navigate(`/${currentFilter}`);
  };

  const handlePrevPhoto = useCallback(() => {
    if (sortedPhotos && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const previousPhoto = sortedPhotos[newIndex];
      navigate(`/${currentFilter}/${previousPhoto.photoID}`);
      console.log(`Navigating to previous photo with index ${newIndex}`);
    }
  }, [currentIndex, sortedPhotos, navigate]);

  const handleNextPhoto = useCallback(() => {
    if (sortedPhotos && currentIndex < sortedPhotos.length - 1) {
      const newIndex = currentIndex + 1;
      const nextPhoto = sortedPhotos[newIndex];
      navigate(`/${currentFilter}/${nextPhoto.photoID}`);
      console.log(`Navigating to next photo with index ${newIndex}`);
    }
  }, [currentIndex, sortedPhotos, navigate]);

  const changeFrameColor = () => {
    setFrameColor((prevColor) => (prevColor === 1 ? 2 : 1));
  };

  const toggleMergeStatus = () => {
    setIsMerged((prevState) => (prevState === 'entangled' ? 'fused' : 'entangled'));
  };

  const swapShape = () => {
    setShapeCode((prevCode) => swapMapping[prevCode]);
  };

  const rotateShape = () => {
    setShapeCode((prevCode) => rotateMapping[prevCode]);
  };

  useKeyboardNavigation(handleNextPhoto, handlePrevPhoto, swapShape, rotateShape, toggleMergeStatus);

  const handleChangeGalleryBackground = (backgroundImage: string) => {
    setGalleryBackground(backgroundImage);
  };

  if (!selectedPhoto || !DiptychComponent) {
    return <div>No photo selected.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || diptychLoading) {
    return <div>Loading Exhibition... (if this persists, there may be an issue with the photo data)</div>;
  }

  console.log('Selected photo in ExhibitionSpace: ', selectedPhoto);

  return (
    <div className={styles.exhibitionSpace}>
      <ExhibitionHeader
        currentFilter={currentFilter}
        selectedPhoto={selectedPhoto}
        diptychInfo={diptychInfo}
        handlePrevPhoto={handlePrevPhoto}
        handleNextPhoto={handleNextPhoto}
      />
      <div
        className={`${styles.gallery} ${isMerged ? styles.merged : ''}`}
        style={{
          backgroundImage: `url(${galleryBackground})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
            height: ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {selectedPhoto ? <DiptychComponent photo={selectedPhoto} diptychInfo={diptychInfo} /> : <div>No photo selected.</div>}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.frameColorButton} onClick={changeFrameColor}>
          Frame in {frameColor === 1 ? 'Black' : 'White'}
        </button>
        <button className={styles.mergeButton} onClick={toggleMergeStatus}>
          {isMerged === 'entangled' ? 'Merge' : 'Unmerge'}
        </button>
        <button className={styles.swapButton} onClick={swapShape}>
          Swap
        </button>
        <button className={styles.rotateButton} onClick={rotateShape}>
          Rotate
        </button>
        <button className={styles.swapButton} onClick={() => navigate(`/${currentFilter}/${currentPhotoID}/inquire`)}>
          Inquire
        </button>
        <GalleryBackgroundSelector onChange={handleChangeGalleryBackground} />
      </div>
    </div>
  );
};

export default ExhibitionSpace;
