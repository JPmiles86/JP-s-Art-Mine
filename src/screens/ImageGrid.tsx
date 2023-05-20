import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import styles from './ImageGrid.module.css';
import { useStore } from './store'; // adjust the path as needed
import { create } from 'zustand';


interface ImageObject {
    photoID: string;
    number: string;
    url: string;
    imagePath?: string; 
    title: string;
    dateOriginal: string;
    index?: number; 
  }

interface HeaderData {
  title: string;
  description: string;
  imageUrl: string;
}

interface RouteParams {
  filter?: string;
  [key: string]: string | undefined;
}

const ImageGrid: React.FC = () => {
  const { filter } = useParams<RouteParams>();
  const { images, setImages } = useStore();
  const [sortOrder, setSortOrder] = useState('random'); // Initialize to 'random'
  const [headerData, setHeaderData] = useState<HeaderData>({ title: '', description: '', imageUrl: '' });
  const navigate = useNavigate();

  const sortImages = (order: string, images: ImageObject[]) => {
    let sortedImages: ImageObject[];
    
    if (!Array.isArray(images)) {
      console.error('sortImages error: images is not an array', images);
      return [];
    }
  
    if (order === 'newest') {
      sortedImages = images.sort((a, b) => (new Date(a.dateOriginal) < new Date(b.dateOriginal) ? 1 : -1));
    } else if (order === 'oldest') {
      sortedImages = images.sort((a, b) => (new Date(a.dateOriginal) < new Date(b.dateOriginal) ? -1 : 1));
    } else { // Random
      sortedImages = images.sort(() => Math.random() - 0.5);
    }
  
    // Add index to sorted images
    const sortedImagesWithIndex = sortedImages.map((image, index) => {
      return {
        ...image,
        index,
      };
    });
  
    return sortedImagesWithIndex;
  };
  
// Inside your ImageGrid component
useEffect(() => {
    let url = '';
    let dataUrl = '';
    if (filter) { // Check if filter is defined
      if (filter.length === 6) {  // Assume date if filter is 6 characters long
        url = `/api/dates/${filter}/header`;
        dataUrl = `/api/photos/date/${filter}`;
      } else if (filter.length <= 3) {  // Assume series if filter is 3 or fewer characters long
        url = `/api/series/${filter}/header`;
        dataUrl = `/api/photos/series/${filter}`;
      } else {  // Assume image number otherwise
        url = `/api/numbers/${filter}/header`;
        dataUrl = `/api/photos/number/${filter}`;
      }
    }
    
    if (url !== '') {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setHeaderData(data);
        })
        .catch(error => console.error('Error fetching header data:', error));
  
      fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
          const sortedImages = sortImages(sortOrder, data);
          setImages(sortedImages);
        })
        .catch(error => console.error('Error fetching images:', error));
    }
  }, [filter, sortOrder]);
  

  return (
    <div className={styles.seriesPage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img src={headerData.imageUrl} alt="Header" className={styles.circularImage} />
          <div className={styles.titleAndText}>
            <h1>{headerData.title}</h1>
            <p>{headerData.description}</p>
            <div className={styles.websiteLink}>
              <a href="https://www.jpmilesfineart.com/" target="_blank" rel="noopener noreferrer">jpmilesfineart.com</a>
            </div>
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '10px' }}>Sort By:</p> 
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ fontFamily: 'EB Garamond' }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }} /> {/* Add this line for a gap */}
      <div className={styles.grid}>
        {images.map((image: ImageObject) => (
          <div 
            key={image.photoID} 
            className={styles.gridItem} 
            onClick={() => { 
              console.log('Navigating with state:', { data: { images } }); 
              useStore.getState().setSelectedImage(image); 
              navigate(`/${filter}/${image.photoID}`, { state: { data: { images } }});
            }}
          >
            {image.imagePath && 
              <img 
                src={`http://localhost:4000/images${image.imagePath.slice(image.imagePath.indexOf('originals') + 'originals'.length)}`} 
                alt="Grid Item" 
                className={styles.image} 
              />
            }
          </div>
        ))}
      </div>
      <footer>
        The Art Mine
        <a href="#top" className={styles.arrowLink}>↑</a>
      </footer>
    </div>
  );
}

export default ImageGrid;