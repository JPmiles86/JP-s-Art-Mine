// ExhibitionSpace.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from './store';
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
  const { photos, fetchPhotos, selectedPhoto } = useStore((state) => state);
  const { photoID } = useParams<{ photoID: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMerged, setIsMerged] = useState(false);
  const [originalRotation, setOriginalRotation] = useState(0);
  const [mirroredRotation, setMirroredRotation] = useState(0);
  const [leftArtwork, setLeftArtwork] = useState('original');
  const [rightArtwork, setRightArtwork] = useState('mirrored');
  const [frameColor, setFrameColor] = useState('white');
  const [galleryBackground, setGalleryBackground] = useState('/assets/images/gallerybg/Gallery-2.png');
  const [error] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [frameVisible, setFrameVisible] = useState(true);
  const location = useLocation();
  const currentFilter = location.pathname.split('/')[1];
  const currentPhotoID = location.pathname.split('/')[2];
  const { setSelectedPhoto, sortedPhotos, setPreviousFilter } = useStore();
  const [isOriginalFlipped, setIsOriginalFlipped] = useState(false);
  const [isMirroredFlipped, setIsMirroredFlipped] = useState(true);

  const DiptychComponent = selectedPhoto?.aspectRatio === '2:3' ? diptychs.E_2x3_CD_P_W : diptychs.E_3x4_CD_P_W;

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
    setFrameColor(prevColor => prevColor === 'white' ? 'black' : 'white');
  };  

  const rotateArtwork = () => {
   
  };

  const swapArtworks = () => {
    
    
  };
  
  
 const mergeArtworks = () => {
      
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
            swapArtworks();
            break;
          case "ArrowDown":
          case "r":
          case "R":
            rotateArtwork();
            break;
          case "0":
          case "m":
          case "M":
          case " ":
            mergeArtworks();
            break;
          default:
            break;
        }
      }
      
      window.addEventListener('keydown', handleKeyDown);
    
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
    }, [handleNextPhoto, handlePrevPhoto, rotateArtwork, swapArtworks, mergeArtworks]);  

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setGalleryBackground(`/assets/images/gallerybg/${event.target.value}`);
    };
    if (!selectedPhoto) {
      return <div>No photo selected.</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading Exhibition... (if this persists, there may be an issue with the photo data)</div>;
    } else { 
      console.log('Selected photo in ExhibitionSpace: ', selectedPhoto);  // <-- Add this line here
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
  {selectedPhoto ? (
   <div style={{ width: '50%', height: '50%', maxWidth: '800px', margin: '0 auto' }}>
   <DiptychComponent />
  </div>
  ) : (
    <div>No photo selected.</div>
  )}
</div>
        <div className={styles.buttonContainer}>
          <button className={styles.frameColorButton} onClick={changeFrameColor}>
            Frame in {frameColor === 'white' ? 'Black' : 'White'}
          </button>          
          <button className={styles.mergeButton} onClick={mergeArtworks}> {isMerged ? 'Unmerge' : 'Merge'}</button>
          <button className={styles.swapButton} onClick={swapArtworks}>Swap</button>
          <button className={styles.rotateButton} onClick={rotateArtwork}>Rotate</button>
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
