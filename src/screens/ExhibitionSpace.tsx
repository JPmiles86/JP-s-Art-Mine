// ExhibitionSpace.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from './store';
import useDiptychStore from './diptychStore';
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
  const { diptychs, selectedDiptych, selectDiptych } = useDiptychStore((state) => state);
  const { photoID } = useParams<{ photoID: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [originalRotation, setOriginalRotation] = useState(0);
  const [mirroredRotation, setMirroredRotation] = useState(0);
  const [leftArtwork, setLeftArtwork] = useState('original');
  const [rightArtwork, setRightArtwork] = useState('mirrored');
  const [galleryBackground, setGalleryBackground] = useState('/assets/images/gallerybg/Gallery-2.png');
  const [error] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [frameVisible, setFrameVisible] = useState(true);
  const location = useLocation();
  const currentFilter = location.pathname.split('/')[1];
  const currentPhotoID = location.pathname.split('/')[2];
  const { sortedPhotos, setPreviousFilter } = useStore();
  const [isOriginalFlipped, setIsOriginalFlipped] = useState(false);
  const [isMirroredFlipped, setIsMirroredFlipped] = useState(true);
  const [DiptychComponent, setDiptychComponent] = useState<React.ComponentType<any> | null>(null);
  const [frameColor, setFrameColor] = useState<number>(1);
  const [isMerged, setIsMerged] = useState<string>('entangled');
  const [aspectRatio, setAspectRatio] = useState<string>('');
  const [shapeCode, setShapeCode] = useState<string>('CD');

  const swapMapping: {[key: string]: string} = {
    'CD': 'SD',
    'SD': 'CD',
    'DS': 'TS',
    'TS': 'DS',
    'ST': 'CT',
    'CT': 'ST',
    'TC': 'DC',
    'DC': 'TC'
  };
  
  const rotateMapping: {[key: string]: string} = {
    'CD': 'DS',
    'DS': 'ST',
    'ST': 'TC',
    'TC': 'CD',
    'SD': 'DC',
    'DC': 'CT',
    'CT': 'TS',
    'TS': 'SD'
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
  }, [photoID, setSelectedPhoto, photos]); // added photos as dependency

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
    if (!selectedPhoto) return;
    
    setAspectRatio(selectedPhoto.aspectRatio);
  
    // Here we replace ":" with "x"
    let normalizedAspectRatio = selectedPhoto.aspectRatio.replace(':', 'x');
    let orientation = ['C', 'S'].includes(shapeCode.charAt(0)) ? 'P' : 'L';
    let diptychCode;
    if (isMerged === 'entangled') {
      diptychCode = `E_${normalizedAspectRatio}_${shapeCode}_${orientation}_${frameColor === 1 ? 'W' : 'B'}`;
    } else { // This handles the case when isMerged is 'fused', you can adjust the code according to your need
      diptychCode = `F_${normalizedAspectRatio}_${shapeCode}_${orientation}_${frameColor === 1 ? 'W' : 'B'}`;
    }
  
    import(`../Diptychs/${diptychCode}`).then(module => {
      console.log('Setting DiptychComponent', module.default);
      setDiptychComponent(() => module.default);
    }).catch(err => {
      console.log(err);
    });
  }, [selectedPhoto, isMerged, frameColor, shapeCode]);  
  
   

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
    setFrameColor(prevColor => prevColor === 1 ? 2 : 1);
  };  
  
  const toggleMergeStatus = () => {
    setIsMerged(prevState => prevState === 'entangled' ? 'fused' : 'entangled');
  };
  
  const swapShape = () => {
    setShapeCode(prevCode => swapMapping[prevCode]);
  };
  
  const rotateShape = () => {
    setShapeCode(prevCode => rotateMapping[prevCode]);
  };
  
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        switch(e.key) {
          case "ArrowRight":
            handleNextPhoto();
            break;
          case "ArrowLeft":
            handlePrevPhoto();
            break;
          case "ArrowUp":
          case "s":
          case "S":
            swapShape();
            break;
          case "ArrowDown":
          case "r":
          case "R":
            rotateShape();
            break;
          case "0":
          case "m":
          case "M":
          case " ":
            toggleMergeStatus();
            break;
          default:
            break;
        }
      }
      
      window.addEventListener('keydown', handleKeyDown);
    
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
    }, [handleNextPhoto, handlePrevPhoto, rotateShape, swapShape, toggleMergeStatus]);  

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setGalleryBackground(`/assets/images/gallerybg/${event.target.value}`);
    };

    if (!selectedPhoto || !DiptychComponent) {
      return <div>No photo selected.</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading Exhibition... (if this persists, there may be an issue with the photo data)</div>;
    } else { 
      console.log('Selected photo in ExhibitionSpace: ', selectedPhoto);
      return (
        <div className={styles.exhibitionSpace}>
        <header className={styles.header}>
          <div className={styles.leftColumn}>
          <button className={styles.navButton} onClick={handleBackToImageGrid}>
             &larr; Back to Image Grid
          </button> </div> 
              <div className={styles.centerColumn}>
              <p>
    <strong>Artwork ID:&nbsp;</strong> <button
      className={styles.idButton}
      onClick={() => navigate(`/${selectedPhoto.date}`)}>
      {selectedPhoto.date}
    </button>
    <strong> - </strong>
    <button
      className={styles.idButton}
      onClick={() => navigate(`/${selectedPhoto.number}`)}>
      {selectedPhoto.number}
    </button>
    <br></br>
    <strong>From the Series:&nbsp;</strong> <button
      className={styles.idButton}
      onClick={() => navigate(`/${selectedPhoto.seriesCode}`)}>
      {selectedPhoto.seriesName}
    </button>
  </p>
  </div>
          <div className={styles.rightColumn}>
	<button className={styles.idButton} onClick={() => handlePrevPhoto()}>
            &larr; Previous  
            </button>
            <strong> &nbsp;&nbsp;-&nbsp;&nbsp;Photo&nbsp;&nbsp;-&nbsp;&nbsp; </strong>
            <button className={styles.idButton} onClick={() => handleNextPhoto()}>
            Next &rarr;
            </button>
          </div>
        </header>

        <div
          className={`${styles.gallery} ${isMerged ? styles.merged : ''}`}
          style={{
            backgroundImage: `url(${galleryBackground})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
            >
              <div style={{
                width: ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%', 
                height: ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%', 
                maxWidth: '800px', margin: '0 auto' }}
              >
                {selectedPhoto ? (<DiptychComponent photo={selectedPhoto} />) : (<div>No photo selected.</div> )}
            </div>
          </div>

        <div className={styles.buttonContainer}>
          <button className={styles.frameColorButton} onClick={changeFrameColor}> Frame in {frameColor === 1 ? 'Black' : 'White'}</button>          
          <button className={styles.mergeButton} onClick={toggleMergeStatus}> {isMerged === 'entangled' ? 'Merge' : 'Unmerge'}</button>
          <button className={styles.swapButton} onClick={swapShape}>Swap</button>
          <button className={styles.rotateButton} onClick={rotateShape}>Rotate</button>
          <button className={styles.swapButton} onClick={() => navigate(`/${currentFilter}/${currentPhotoID}/inquire`)}>Inquire</button>
          <select className={styles.gallerySelector} onChange={handleChange}>
            <option value="Gallery-2.png">Gallery 1</option>
            <option value="Gallery-1.png">Gallery 2</option>
            <option value="Room-1.png">Living Room 1</option>
            <option value="Room-2.png">Living Room 2</option>
            <option value="Room-3.png">Living Room 3</option>
          </select>
        </div>
      </div>
     );
   }
};

export default ExhibitionSpace;