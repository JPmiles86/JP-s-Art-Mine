// ImageGrid.tsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ImageGrid.module.css';
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
  const { 
    currentFilter, setCurrentFilter, setSelectedPhoto,
    setPhotos, setSortedPhotos, selectedPhoto, setSortValue, 
    sortValue, sortedPhotos, clearPhotos, initialPhotoFetch, 
    setInitialPhotoFetch, resetLoadIndex, previousFilter,
    setPreviousFilter
  } = useStore();
  const navigate = useNavigate();  
  const [scrollPos, setScrollPos] = useState(0);  
  const { handleScroll, scrollToTop } = useContext(ScrollContext);  
  const [gridHeaderData, setGridHeaderData] = useState<GridHeaderData | null>(null);
  const [needsHeaderImageUpdate, setNeedsHeaderImageUpdate] = useState(false);
  const [urlParsed, setUrlParsed] = useState(false); 
  const { loadedPhotos, loadMorePhotos, photos } = useStore((state) => ({
    loadedPhotos: state.loadedPhotos,
    loadMorePhotos: state.loadMorePhotos,
    photos: state.photos,
  }));
  const handleUrlParsing = () => {
    new parseUrlService().parseUrl();
  };
     
  useEffect(() => {
    console.log("useEffect - fetchAllSeries");
    fetchAllSeries()
      .then(fetchedSeries => {
        setSeries(fetchedSeries);
      })
      .catch(error => console.error('Error fetching series:', error));
  }, []);  

  useEffect(() => {
    // If sortedPhotos is populated but loadedPhotos is empty, load the initial photos
    if (sortedPhotos.length > 0 && loadedPhotos.length === 0) {
      loadMorePhotos();
    }
  }, [sortedPhotos, loadedPhotos, loadMorePhotos]);  

  useEffect(() => {
    console.log("useEffect - handleScroll");
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMorePhotos();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePhotos]);

  useEffect(() => {
    if (!currentFilter && sortedPhotos.length === 0) {
      console.log("ImageGrid URL parsing required", { currentFilter, sortedPhotosLength: sortedPhotos.length });
      handleUrlParsing();
    }
  }, [currentFilter, sortedPhotos.length, handleUrlParsing]);
  
  useEffect(() => {
    // Check if the current filter has changed and fetch new photos
     if (currentFilter && (sortedPhotos.length === 0 || previousFilter !== currentFilter)) {
      console.log("ImageGrid fetching new photos", { currentFilter, sortedPhotosLength: sortedPhotos.length });
      clearPhotos();
      setLoading(true);
      resetLoadIndex();
      fetchPhotosService(
        setPhotosError,
        setLoading,
        setPhotos,
        setInitialPhotoFetch,
        currentFilter,
        false
      ).then(() => {
        loadMorePhotos();
      });
      setPreviousFilter(currentFilter); // Update the previous filter
    }
  }, [currentFilter, sortValue, loadMorePhotos, sortedPhotos.length]);
  
  useEffect(() => {
    if (currentFilter) {
      setLoading(true);
      fetchGridHeaderData(currentFilter)
        .then(data => {
          setGridHeaderData(data);
          if (data?.imageUrl === null && selectedPhoto) {
            setNeedsHeaderImageUpdate(true);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching header data:', error);
          setLoading(false);
        });
    }
  }, [currentFilter, selectedPhoto]);
  
  
  // This useEffect will run when needsHeaderImageUpdate is true
  useEffect(() => {
  if (needsHeaderImageUpdate && selectedPhoto) {
    console.log("useEffect - needsHeaderImageUpdate");
    // Determine whether the currentFilter is a date or a number
    const isDateFilter = /^\d{6}$/.test(currentFilter); // Assuming dates are in the format of YYYYMMDD
    const endpoint = isDateFilter
      ? 'http://localhost:4000/api/dates/update-image-url'
      : 'http://localhost:4000/api/numbers/update-image-url';

    const body = {
      [isDateFilter ? 'date' : 'number']: currentFilter,
      imageUrl: selectedPhoto.imagePath,
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
      // After updating the header image, fetch the header data again
      fetchGridHeaderData(currentFilter)
      
        .then(updatedData => {
          if (updatedData) {
            setGridHeaderData(updatedData);
            console.log("useEffect - needsHeaderImageUpdate - setGridHeaderData");
          }
        })
        .catch(error => console.error('Error re-fetching header data:', error));
    })
    .catch(error => console.error('Error updating header image:', error))
    .finally(() => setNeedsHeaderImageUpdate(false)); // Reset the state
  }
}, [needsHeaderImageUpdate, selectedPhoto, currentFilter]);
  
  useEffect(() => {
    console.log('loadedPhotos after fetch:', loadedPhotos);
  }, [loadedPhotos]);  

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'newest' | 'oldest' | 'random';
    setSortValue(newSortOrder); // Update the sortValue in the global state when the dropdown changes
    console.log("handleSortChange and setting new sorting order", newSortOrder);
  };

  const handleSeriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeriesCode = event.target.value;
    setCurrentFilter(newSeriesCode);
    setInitialPhotoFetch(false);
    clearPhotos();
    resetLoadIndex();
    setLoading(true);
  
    fetchPhotosService(
      setPhotosError,
      setLoading,
      setPhotos,
      setInitialPhotoFetch,
      newSeriesCode,
      false
    ).then(() => {
      // This will now trigger the store to sort the photos after they are fetched
      setSortValue(sortValue); 
      loadMorePhotos();
    });
  
    navigate(`/${newSeriesCode}`);
    console.log("handleSeriesChange and setting new currentFilter", newSeriesCode);
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
        setSelectedPhoto(photo.photoID);
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