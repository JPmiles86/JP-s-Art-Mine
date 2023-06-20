// ImageGrid.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ImageGrid.module.css';
import { DataService, Series } from './DataService';
import useStore, { Store, GridHeaderData, Photograph } from './store';

interface RouteParams {
  filter?: string;
  [key: string]: string | undefined;
}

const ImageGrid: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const { filter } = useParams<RouteParams>();
  const { seriesFilter, setSeriesFilter, loading, gridHeaderData, setSortValue, fetchGridHeaderData, fetchPhotos, sortValue, sortedPhotos } = useStore();
  const navigate = useNavigate();  

  // Add this useEffect hook to fetch all series when the component is first loaded
  useEffect(() => {
    const dataService = new DataService();
    dataService.fetchAllSeries()
      .then(fetchedSeries => setSeries(fetchedSeries))
      .catch(error => console.error('Error fetching series:', error));
  }, []);

  useEffect(() => {
    if (filter) {
      fetchGridHeaderData(filter)
        .catch((error: any) => console.error('Error fetching header data:', error));
      fetchPhotos();
      if (filter === 'series') {
        const seriesCode = window.location.pathname.split('/')[2];
        setSeriesFilter(seriesCode);
      }
    }
  }, [filter]);  
  

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'newest' | 'oldest' | 'random';
    setSortValue(newSortOrder); // Update the sortValue in the global state when the dropdown changes
  };

  const handleSeriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeries = event.target.value;
    setSeriesFilter(newSeries);
    navigate(`/${newSeries}`);
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
        <select value={sortValue} onChange={handleSortChange} style={{ fontFamily: 'EB Garamond' }}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="random">Random</option>
        </select>
        {filter && filter.length <= 3 && (
          <>
           <p style={{ marginRight: '10px', marginLeft: '30px' }}>Sort By Series:</p> 
           <select value={seriesFilter} onChange={handleSeriesChange} style={{ fontFamily: 'EB Garamond' }}>
             {series.map((series: Series) => <option value={series.seriesCode}>{series.seriesName}</option>)}
           </select>
          </>
         )}
        </div>
      <div style={{ marginBottom: '20px' }} /> {/* Add this line for a gap */}
      <div className={styles.grid}>
  {!loading && sortedPhotos.map((photo: Photograph, index: number) => (
    <div
      key={photo.photoID}
      className={styles.gridItem} 
      onClick={() => { 
        console.log('Navigating with state:', { data: { sortedPhotos } }); 
        navigate(`/${filter}/${photo.photoID}`, { state: { data: { sortedPhotos } }});
      }}      
    >
      {photo.imagePath && 
        <img 
          src={`http://localhost:4000/images${photo.imagePath.slice(photo.imagePath.indexOf('originals') + 'originals'.length)}`} 
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