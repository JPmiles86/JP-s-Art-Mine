// ExhibitionHeader.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from '../utils/store'; 
import ButtonStyles from './ButtonStyles.module.css';

interface ExhibitionHeaderProps {
  currentFilter: string;
  selectedPhoto: Photograph | null;
  diptychInfo: DiptychInfo | null;
  handlePrevPhoto: () => void;
  handleNextPhoto: () => void;
}

interface Photograph {
  photoID: string;
  number: string;
  date: string;
  seriesName: string;
  seriesCode: string;
}

interface DiptychInfo {
  fused: string;
  shapeInCenterEdge: string;
  shapeAtTopEdge: string;
  leftSide: string;
  rightSide: string;
}

const ExhibitionHeader: React.FC<ExhibitionHeaderProps> = ({
  currentFilter,
  selectedPhoto,
  diptychInfo,
  handlePrevPhoto,
  handleNextPhoto,
}) => {
  const navigate = useNavigate();
  const { setCurrentFilter } = useStore(); // Use the setCurrentFilter from the store
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  const toggleExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter); // Set the current filter
    navigate(`/${filter}`); // Navigate to the updated filter URL
  };

  const handleBackToImageGrid = () => {
    navigate(`/${currentFilter}`);
  };

  if (!selectedPhoto) {
    return <div>No photo selected.</div>;
  }

  return (
    <header className={styles.header}  style={{ marginTop: '0px'}}>
      <div className={styles.leftColumn}>
        <button className={styles.navButton} onClick={handleBackToImageGrid}>
          &larr; Back to Image Grid
        </button>
      </div>
      <div className={styles.centerColumn}>
        <p>
          <strong>Artwork ID:&nbsp;</strong>
          <span
            className={`${styles.idButton} ${styles.linkButton}`}
            onClick={() => handleFilterChange(selectedPhoto.date)}
          >
            {selectedPhoto.date}
          </span>
          <strong> - </strong>
          <span
            className={`${styles.idButton} ${styles.linkButton}`}
            onClick={() => handleFilterChange(selectedPhoto.number)}
          >
            {selectedPhoto.number}
          </span>
          <br />
          <strong>From the Series:&nbsp;</strong>
          <span
            className={`${styles.idButton} ${styles.linkButton}`}
            onClick={() => handleFilterChange(selectedPhoto.seriesCode)}
          >
            {selectedPhoto.seriesName}
          </span>
          
          </p>
            {showExtraInfo && (
          <p>
          <strong>Diptych Variation: </strong>
          {diptychInfo ? (
            <>
              {diptychInfo.fused === 'Fused' ? `${diptychInfo.fused} - ${diptychInfo.shapeInCenterEdge}` : diptychInfo.fused}
            </>
          ) : (
            'Loading...'
          )}
          <br />
          <strong>Left Side: </strong>
          {diptychInfo ? diptychInfo.leftSide : 'Loading...'} &nbsp;&nbsp;&nbsp;
          <strong>Right Side: </strong>
          {diptychInfo ? diptychInfo.rightSide : 'Loading...'}
          <br />
          <strong>Shape in center: </strong>
          {diptychInfo ? diptychInfo.shapeInCenterEdge : 'Loading...'} &nbsp;&nbsp;&nbsp;
          <strong>Shape on top: </strong>
          {diptychInfo ? diptychInfo.shapeAtTopEdge : 'Loading...'}
          <br />
        </p>
        )}
        <button onClick={toggleExtraInfo} className={ButtonStyles.moreinfobutton}>
          {showExtraInfo ? '↑ Less Info ↑' : '↓ More Info ↓'}
        </button>
      </div>
      <div className={styles.rightColumn}>
        <button className={styles.idButton} onClick={handlePrevPhoto}>
          &larr; Previous
        </button>
        <strong> &nbsp;&nbsp;-&nbsp;&nbsp;Photo&nbsp;&nbsp;-&nbsp;&nbsp; </strong>
        <button className={styles.idButton} onClick={handleNextPhoto}>
          Next &rarr;
        </button>
      </div>
    </header>
  );
};

export default ExhibitionHeader;
