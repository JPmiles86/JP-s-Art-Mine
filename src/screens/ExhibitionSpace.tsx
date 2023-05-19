import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import { useStore } from './store'; // adjust the path as needed
import { useSelector, useDispatch } from 'react-redux';

interface ImageData {
  photoID: string;
  number: string;
  url: string;
  title: string;
  dateOriginal: string;
  imagePath?: string;
  index?: number;
}

interface LocationState {
  images: ImageData[];
}

const ExhibitionSpace = () => {
  const { state } = useLocation();
  console.log('State from location:', state);
  const navigate = useNavigate();
  const { photoID } = useParams(); // get photoID from route parameters
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMerged, setIsMerged] = useState(false);
  const [originalRotation, setOriginalRotation] = useState(0);
  const [mirroredRotation, setMirroredRotation] = useState(0);
  const [leftArtwork, setLeftArtwork] = useState('original');
  const [rightArtwork, setRightArtwork] = useState('mirrored');
  const [frameColor, setFrameColor] = useState('white');
  const [galleryBackground, setGalleryBackground] = useState('/assets/images/gallerybg/Gallery-2.png');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  // Get setSelectedImage from the store and rename it to setSelectedImageInStore to avoid conflict
  const { setSelectedImage: setSelectedImageInStore, selectedImage, images } = useStore();
    console.log('Selected image from store:', selectedImage);
    console.log('Images from store:', images);
    console.log('Image URL:', `http://localhost:4000/images${selectedImage?.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}`);

  useEffect(() => {
    if (state && state.images) {
      console.log('Inside useEffect with dependency on state:', state);
      const image = state.images.find((image: any) => image.photoID === photoID);
      console.log("Found image:", image); // This should print the image found or 'undefined'
      setSelectedImageInStore(image);
      setCurrentIndex(image?.index ?? 0);
      setIsLoading(false); // You should adjust this depending on when your data is considered "loaded"
    } else {
      console.log("State or images are not available yet!");
    }
  }, [photoID, state]);

  useEffect(() => {
    console.log("Inside useEffect with dependency on selectedImage:", selectedImage);
  }, [selectedImage]);  

  const handlePrevImage = () => {
    if (state && state.images && currentIndex > 0) {
      const previousImage = state.images[currentIndex - 1];
      navigate(`/exhibition-space/${previousImage.photoID}`, { state });
    }
  };

  const handleNextImage = () => {
    if (state && state.images && currentIndex < state.images.length - 1) {
      const nextImage = state.images[currentIndex + 1];
      navigate(`/exhibition-space/${nextImage.photoID}`, { state });
    }
  };

  const changeFrameColor = () => {
    setFrameColor((prevColor) => (prevColor === 'white' ? 'black' : 'white'));
  };

  const rotateArtwork = () => {
    if (leftArtwork === 'original') {
      setOriginalRotation((prevRotation) => (prevRotation + 90) % 360);
      setMirroredRotation((prevRotation) => (prevRotation - 90 + 360) % 360);
    } else {
      setOriginalRotation((prevRotation) => (prevRotation - 90 + 360) % 360);
      setMirroredRotation((prevRotation) => (prevRotation + 90) % 360);
    }
  };

  const swapArtworks = () => {
    setLeftArtwork((prevArtwork) => (prevArtwork === 'original' ? 'mirrored' : 'original'));
    setRightArtwork((prevArtwork) => (prevArtwork === 'original' ? 'mirrored' : 'original'));
  };

    // This function will return 'portrait' or 'landscape' based on the current rotation
    const getOrientation = () => {
      return originalRotation % 180 === 0 ? 'portrait' : 'landscape';
    };
  
    // Use this function to determine the gap
    const getGap = () => {
      const orientation = getOrientation();
      if (isMerged) {
        return '0px';
      }
      return orientation === 'portrait' ? '40px' : '155px';
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setGalleryBackground(`/assets/images/gallerybg/${event.target.value}`);
    };
    if (!selectedImage) {
      return <div>No image selected.</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading Exhibition... (if this persists, there may be an issue with the image data)</div>;
    } else {
      return (
        <div className={styles.exhibitionSpace}>
        <header className={styles.header}>
          <div className={styles.leftColumn}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
                &larr; Back to Series
              </button> </div> 
          <div className={styles.centerColumn}>
          <p>
                <strong>Photograph ID:</strong> {selectedImage.number}
                <br />
                <strong>Title:</strong> {selectedImage.title}
                <br />
                <strong>Date Original:</strong> {selectedImage.dateOriginal}
              </p>
          </div>
          <div className={styles.rightColumn}>
          <button className={styles.navButton} onClick={() => handleNextImage()}>
            Next Photo &rarr;
            </button>
            <button className={styles.navButton} onClick={() => handlePrevImage()}>
            &larr; Previous Photo  
            </button>
          </div>
        </header>
        <div 
          className={`${styles.gallery} ${isMerged ? styles.merged : ''}`}
          style={{
            backgroundImage: `url(${galleryBackground})`,
            gap: getGap(),
          }}
        >
          <div 
            className={`${styles.artwork} ${isMerged ? styles.merged : ''} ${leftArtwork === 'original' ? styles.mirrored : ''}`} 
            style={{ 
              borderColor: frameColor, 
              borderWidth: '10px', 
              borderStyle: 'solid',
              transform: `rotate(${originalRotation}deg) scaleX(${leftArtwork === 'original' ? -1 : 1})`,
            }}>
            <img src={`http://localhost:4000/images${selectedImage?.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}`} alt="Artwork" />
          </div>
          <div 
            className={`${styles.artwork} ${isMerged ? styles.merged : ''} ${rightArtwork === 'original' ? styles.mirrored : ''}`} 
            style={{ 
              borderColor: frameColor, 
              borderWidth: '10px', 
              borderStyle: 'solid',
              transform: `rotate(${mirroredRotation}deg) scaleX(${rightArtwork === 'original' ? -1 : 1})`,
            }}>
            <img src={selectedImage.url} alt="Mirrored Artwork" />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.swapButton} onClick={swapArtworks}>Swap</button>
          <button className={styles.rotateButton} onClick={rotateArtwork}>Rotate</button>
          <button className={styles.mergeButton} onClick={() => setIsMerged((prevMerged) => !prevMerged)}>Merge</button>
          <button className={styles.frameButton} onClick={changeFrameColor}>Change Frame Color</button>
          <select className={styles.gallerySelector} onChange={handleChange}>
            <option value="Gallery-1.png">Gallery 1</option>
            <option value="Gallery-2.png">Gallery 2</option>
            <option value="Gallery-3.png">Gallery 3</option>
          </select>
        </div>
      </div>
     );
   }
};

export default ExhibitionSpace;

  