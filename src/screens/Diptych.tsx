// Diptych.tsx
import React from 'react';
import styles from './Diptych.module.css';
import useStore from './store'; 
import { useEffect, useState } from 'react';

const Diptych = () => {
  const { selectedImage } = useStore();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
      if (!selectedImage) {
          setImageUrl('');
      } else {
          setImageUrl(`http://localhost:4000/images${selectedImage?.imagePath ? selectedImage.imagePath.slice(selectedImage.imagePath.indexOf('originals') + 'originals'.length) : ''}`);
      }
  }, [selectedImage]);

  if (!imageUrl) {
      return <div>Loading...</div>;
  }

  return (
    <div className={styles.artworkContainer}>
      <div className={styles.diptych}>
          <img src={imageUrl} alt="Artwork 1" className={styles.artwork} />
          <img src={imageUrl} alt="Artwork 2" className={`${styles.artwork} ${styles.artworkMirror}`} />
      </div>
    </div>
  );
}

export default Diptych;
