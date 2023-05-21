import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import { useStore } from './store'; // adjust the path as needed

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
  const [frameVisible, setFrameVisible] = useState(true);
  

  // Get setSelectedImage from the store and rename it to setSelectedImageInStore to avoid conflict
  const { setSelectedImage: setSelectedImageInStore, selectedImage, images } = useStore();
    console.log('Selected image from store:', selectedImage);
    console.log('Images from store:', images);
    console.log('Image URL:', `http://localhost:4000/images${selectedImage?.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}`);

    useEffect(() => {
      console.log('Inside useEffect with dependency on photoID:', photoID);
      if (images && images.length > 0) {
        const image = images.find((image: any) => image.photoID === photoID);
        console.log("Found image:", image); // This should print the image found or 'undefined'
        setSelectedImageInStore(image);
        setCurrentIndex(image?.index ?? 0);
        setIsLoading(false); // You should adjust this depending on when your data is considered "loaded"
      } else {
        console.log("Images are not available yet!");
      }
    }, [photoID, images, setSelectedImageInStore]);

  useEffect(() => {
    console.log("Inside useEffect with dependency on selectedImage:", selectedImage);
  }, [selectedImage]);  

  const handlePrevImage = () => {
    if (images && currentIndex > 0) {
      const previousImage = images[currentIndex - 1];
      setSelectedImageInStore(previousImage);
      navigate(`/exhibition-space/${previousImage.photoID}`);
    }
  };

  const handleNextImage = () => {
    if (images && currentIndex < images.length - 1) {
      const nextImage = images[currentIndex + 1];
      setSelectedImageInStore(nextImage);
      navigate(`/exhibition-space/${nextImage.photoID}`);
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
      const rotation = originalRotation % 360;
      return (rotation === 90 || rotation === 270) ? 'landscape' : 'portrait';
    };    
  
    const mergeArtworks = () => {
      setIsMerged((prevMerged) => !prevMerged);
      setFrameVisible(!frameVisible);
    };

    // Use this function to determine the gap
    const getGap = () => {
      const orientation = getOrientation();
      if (isMerged) {
        return orientation === 'portrait' ? '0%' : '10.01%';
      }
      return orientation === 'portrait' ? '4%' : '14%';
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
          <button className={styles.navButton} onClick={() => navigate(-1)}>
                &larr; Back to Series
              </button> </div> 
              <div className={styles.centerColumn}>
              <p>
    <strong>Artwork ID:&nbsp;</strong> <button
      className={styles.idButton}
      onClick={() => navigate(`/${selectedImage.date}`)}
    >
      {selectedImage.date}
    </button>
    <strong> - </strong>
    <button
      className={styles.idButton}
      onClick={() => navigate(`/${selectedImage.number}`)}
    >
      {selectedImage.number}
    </button>
  </p>
  </div>
          <div className={styles.rightColumn}>
	<button className={styles.idButton} onClick={() => handlePrevImage()}>
            &larr; Previous  
            </button>
            <strong> &nbsp;&nbsp;-&nbsp;&nbsp;Photo&nbsp;&nbsp;-&nbsp;&nbsp; </strong>
            <button className={styles.idButton} onClick={() => handleNextImage()}>
            Next &rarr;
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
  className={`${styles.artwork} ${isMerged ? styles.merged : ''} ${frameVisible ? '' : styles.noFrame} ${leftArtwork === 'original' ? styles.mirrored : ''}`} 
  data-frame-color={frameColor}
  style={{transform: `rotate(${originalRotation}deg) scaleX(${leftArtwork === 'original' ? -1 : 1})`,}}>
  <img src={`http://localhost:4000/images${selectedImage?.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}`} alt="Artwork" />
</div>
<div 
  className={`${styles.artwork} ${isMerged ? styles.merged : ''} ${frameVisible ? '' : styles.noFrame} ${rightArtwork === 'original' ? styles.mirrored : ''}`} 
  data-frame-color={frameColor}
  style={{transform: `rotate(${mirroredRotation}deg) scaleX(${rightArtwork === 'original' ? -1 : 1})`,}}>
  <img src={`http://localhost:4000/images${selectedImage?.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}`} alt="Mirrored Artwork" />
</div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.swapButton} onClick={swapArtworks}>Swap</button>
          <button className={styles.rotateButton} onClick={rotateArtwork}>Rotate</button>
          <button className={styles.mergeButton} onClick={mergeArtworks}> {isMerged ? 'Unmerge' : 'Merge'}</button>
          <button className={styles.frameColorButton} onClick={changeFrameColor}>
            Frame in {frameColor === 'white' ? 'Black' : 'White'}
          </button>
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

  