import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SeriesGrid.module.css';

interface ImageObject {
  url: string;
  // ... other properties of the image object
}

interface SeriesGridProps {
  images: ImageObject[];
}

const SeriesGrid: React.FC<SeriesGridProps> = ({ images }) => {
  return (
    <div className={styles.grid}>
      {images.map((image, index) => (
        <Link key={index} to={`/exhibition-space/${index}`} className={styles.gridItem}>
          <div className={styles.imageWrapper}>
            <img src={image.url} alt={`Artwork ${index}`} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SeriesGrid;