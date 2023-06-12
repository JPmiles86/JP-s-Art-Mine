import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ImageGrid.module.css';
import useStore, { Store, GridHeaderData, ImageObject } from './store';

interface RouteParams {
  filter?: string;
  [key: string]: string | undefined;
}

const ImageGrid: React.FC = () => {
  const { filter } = useParams<RouteParams>();
  const { loading, gridHeaderData, setSortValue, fetchGridHeaderData, fetchImages, sortValue, sortedImages } = useStore();
  const navigate = useNavigate();  

  useEffect(() => {
    if (filter) {
      fetchGridHeaderData(filter)
        .catch((error: any) => console.error('Error fetching header data:', error));
      fetchImages();
    }
  }, [filter]);  

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'newest' | 'oldest' | 'random';
    setSortValue(newSortOrder); // Update the sortValue in the global state when the dropdown changes
  };

  return (
    <div className={styles.seriesPage}>
      <header className={styles.header}>
  <div className={styles.headerContent}>
    {gridHeaderData && (
      <>
        <img src={gridHeaderData.imageUrl} alt="Header" className={styles.circularImage} />
        <div className={styles.titleAndText}>
          <h1>{gridHeaderData.title}</h1>
          <p>{gridHeaderData.description}</p>
          <div className={styles.websiteLink}>
            <a href="https://www.jpmilesfineart.com/" target="_blank" rel="noopener noreferrer">jpmilesfineart.com</a>
          </div>
        </div>
      </>
    )}
  </div>
</header>
<div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '10px' }}>Sort By:</p> 
        <select 
          value={sortValue} // Use the global state variable
          onChange={handleSortChange}
          style={{ fontFamily: 'EB Garamond' }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }} /> {/* Add this line for a gap */}
      <div className={styles.grid}>
  {!loading && sortedImages.map((image: ImageObject, index: number) => (
    <div
      key={image.photoID}
      className={styles.gridItem} 
      onClick={() => { 
        console.log('Navigating with state:', { data: { sortedImages } }); 
        navigate(`/${filter}/${image.photoID}`, { state: { data: { sortedImages } }});
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