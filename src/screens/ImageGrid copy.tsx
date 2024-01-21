// ImageGrid.tsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ImageGrid.module.css';
// import { DataService, Series } from '../utils/DataService';
import ScrollContext from '../ScrollContext'; 
import useStore, { Store, GridHeaderData, Photograph } from '../utils/store';
import urlConfig from './urlConfig';  
import { fetchGridHeaderData } from '../utils/fetchGridHeaderData';
import { fetchAllSeries } from '../utils/fetchAllSeries';
import { fetchPhotosService } from '../utils/fetchPhotosService';
import { parseUrlService } from '../utils/parseUrlService';


interface RouteParams {
  filter?: string;
  [key: string]: string | undefined;
}

type Series = {
  seriesCode: string;
  seriesName: string;
  // ... any other properties
};

const ImageGrid: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);
  const { filter } = useParams<RouteParams>();
  const { currentFilter, setCurrentFilter, setPhotos, setSortedPhotos, setSelectedPhoto, gridHeaderData, setGridHeaderData, setSortValue, fetchGridHeaderData, sortValue, sortedPhotos, clearPhotos, initialPhotoFetch, setInitialPhotoFetch, resetLoadIndex } = useStore();
  const navigate = useNavigate();  
  const [scrollPos, setScrollPos] = useState(0);  
  const { handleScroll, scrollToTop } = useContext(ScrollContext);  // Access handleScroll
  const { loadedPhotos, loadMorePhotos, fetchPhotos, photos } = useStore((state) => ({
    loadedPhotos: state.loadedPhotos,
    loadMorePhotos: state.loadMorePhotos,
    fetchPhotos: state.fetchPhotos,
    photos: state.photos,
  }));
     
  useEffect(() => {
    fetchAllSeries()
      .then(fetchedSeries => {
        setSeries(fetchedSeries);
      })
      .catch(error => console.error('Error fetching series:', error));
  }, []);  

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMorePhotos();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePhotos]);

  useEffect(() => {
    // Ensure currentFilter is set when navigating to the page
    if (!currentFilter) {
      const { filter: urlFilter, photoID } = new parseUrlService().parseUrl();
      if (urlFilter) {
        setCurrentFilter(urlFilter);
        if (photoID) {
          setSelectedPhoto(photoID);
        }
      }
    }
    // Fetch new photos whenever currentFilter changes
    if (currentFilter) {
      clearPhotos(); // Clear the old data
      setLoading(true);
      resetLoadIndex(); // Reset load index to load photos from the start
      fetchPhotosService(
        setCurrentFilter,
        setSelectedPhoto,
        setPhotosError,
        setLoading,
        setPhotos,
        setSortedPhotos,
        setInitialPhotoFetch,
        currentFilter,
        sortValue,
        false
      ).then(() => {
        loadMorePhotos(); // Load the initial set of photos
      });

      fetchGridHeaderData(currentFilter)
        .then(data => {
          if (data) {
            setGridHeaderData(data);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching header data:', error);
          setLoading(false);
        });
    }
  }, [currentFilter, sortValue, loadMorePhotos]);
  

  useEffect(() => {
    if (currentFilter) {
      clearPhotos(); // Clear the old data
      setLoading(true); // Set loading to true before fetching new data
      fetchGridHeaderData(currentFilter)
        .then(data => {
          if (data) {
            setGridHeaderData(data);
          }
          setLoading(false); // Set loading to false after fetching new data
        })
        .catch(error => {
          console.error('Error fetching header data:', error);
          setLoading(false); // Ensure we handle loading state correctly in case of error
        });
    }
  }, [currentFilter]);  
  
  useEffect(() => {
    console.log('loadedPhotos after fetch:', loadedPhotos);
  }, [loadedPhotos]);  

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'newest' | 'oldest' | 'random';
    setSortValue(newSortOrder); // Update the sortValue in the global state when the dropdown changes
  };

  const handleSeriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeriesCode = event.target.value;
    setCurrentFilter(newSeriesCode);
    setInitialPhotoFetch(false);
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
                {gridHeaderData.imageUrl && (
                  <img
                    src={`${urlConfig.baseURL}${gridHeaderData.imageUrl.slice(gridHeaderData.imageUrl.indexOf('originals') + 'originals'.length)}`}
                    alt="Header"
                    className={styles.circularImage}
                  />
                )}
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
           <select value={currentFilter} onChange={handleSeriesChange} style={{ fontFamily: 'EB Garamond' }}>
            {series.map((seriesItem: any) => (
              <option key={seriesItem.seriesCode} value={seriesItem.seriesCode}>{seriesItem.seriesName}</option>
            ))}
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