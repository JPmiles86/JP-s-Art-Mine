// ImageGrid.tsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ImageGrid.module.css';
import { DataService, Series } from './DataService';
import ScrollContext from '../ScrollContext'; 
import useStore, { Store, GridHeaderData, Photograph } from './store';
import urlConfig from './urlConfig';  // Add this line

interface RouteParams {
  filter?: string;
  [key: string]: string | undefined;
}

const ImageGrid: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(false);
  const { filter } = useParams<RouteParams>();
  const { previousFilter, setPreviousFilter, seriesFilter, setSeriesFilter, gridHeaderData, setSortValue, fetchGridHeaderData, fetchPhotos, sortValue, sortedPhotos, clearPhotos } = useStore();
  const navigate = useNavigate();  
  const [scrollPos, setScrollPos] = useState(0);  
  const { handleScroll, scrollToTop } = useContext(ScrollContext);  // Access handleScroll
  const { loadedPhotos, loadMorePhotos } = useStore((state) => ({
   loadedPhotos: state.loadedPhotos,
   loadMorePhotos: state.loadMorePhotos,
     }));
     
  useEffect(() => {
    const dataService = new DataService();
    dataService.fetchAllSeries()
      .then(fetchedSeries => {
        setSeries(fetchedSeries);
      })
      .catch(error => console.error('Error fetching series:', error));
  }, []);  
  
  useEffect(() => {
    console.log('seriesFilter changed:', seriesFilter);
  }, [seriesFilter]);

  useEffect(() => {
    if (filter && filter !== previousFilter) {
      clearPhotos(); // Clear the old data
      setLoading(true); // Set loading to true before fetching new data
      setSeriesFilter(filter);
      const filterValueFromUrl = window.location.pathname.split('/')[1];
      if (filterValueFromUrl && filterValueFromUrl.length === 3) {
        setSeriesFilter(filterValueFromUrl);
      } else {
        setSeriesFilter(''); // Reset the seriesFilter state when the filter is not 'series'
      }
      fetchGridHeaderData(filter)
        .catch((error: any) => console.error('Error fetching header data:', error));
      fetchPhotos().then(() => {
        console.log('Photos after fetch:', loadedPhotos);
        setLoading(false); // Set loading to false after fetching new data
      });
      setPreviousFilter(filter);
    }
  }, [filter, previousFilter, setPreviousFilter, setSeriesFilter, fetchPhotos, clearPhotos]);  
  
  useEffect(() => {
    console.log('loadedPhotos after fetch:', loadedPhotos);
  }, [loadedPhotos]);  

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'newest' | 'oldest' | 'random';
    setSortValue(newSortOrder); // Update the sortValue in the global state when the dropdown changes
  };

  const handleSeriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeriesCode = event.target.value;
    setSeriesFilter(newSeriesCode);
    navigate(`/${newSeriesCode}`);
  };  

  if (loading) {
    return <div>Loading...</div>; // Replace this with your actual loading component
  } else {return (
    <div id="scrollable-container" ref={scrollContainerRef}>
   <header className={styles.header}>
     <div className={styles.headerContent}>
       {gridHeaderData && (
         <>
           {
    gridHeaderData && (
        <>
            {console.log(gridHeaderData.imageUrl)}
            {console.log('Image URL:', gridHeaderData.imageUrl)}
            <img src={`${urlConfig.baseURL}${gridHeaderData.imageUrl.slice(gridHeaderData.imageUrl.indexOf('originals') + 'originals'.length)}`} alt="Header" className={styles.circularImage} />
        </>
    )
}
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
           {series.map((series: Series) => <option key={series.seriesCode} value={series.seriesCode}>{series.seriesName}</option>)}
           </select>
         </>
       )}
     </div>
   </header>
      <div style={{ marginBottom: '20px' }} /> {/* Add this line for a gap */}
      <div className={styles.grid}>
      {!loading && loadedPhotos.map((photo: Photograph, index: number) => (
    <div
      key={photo.photoID}
      className={styles.gridItem} 
      onClick={() => { 
        console.log('Navigating with state:', { data: { loadedPhotos } }); 
        navigate(`/${filter}/${photo.photoID}`, { state: { data: { loadedPhotos } }});
      }}      
    >
      {photo.imagePath && 
        <img 
          src={`${urlConfig.baseURL}${photo.imagePath.slice(photo.imagePath.indexOf('originals') + 'originals'.length)}`} 
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
      <button onClick={scrollToTop} className={styles.scrollToTopButton}>
        ↑
      </button>
    </div>
  );
}
}
export default ImageGrid;