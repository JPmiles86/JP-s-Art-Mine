// my-gallery/src/screens/Favorites.tsx

import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { Typography, Grid, Box, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../utils/store';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import ScrollContext from '../ScrollContext'; 
import { fabric } from 'fabric';
import buttonStyles from './ButtonStyles.module.css';
import styles from './ExhibitionSpace.module.css';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import FullScreenView from '../components/layout/FullScreenView';
import LikeButtonFavs from '../components/layout/LikeButtonFavs';
import FullScreenButtonFavs from '../components/layout/FullScreenButtonFavs';
import DownloadButton from '../components/layout/DownloadButton';
import DownloadFavsButton from '../components/layout/DownloadFavsButton';
import urlConfig from '../utils/urlConfig';  
import LazyLoad from 'react-lazyload';
import { FixedSizeList as List } from 'react-window';
import { debounce } from 'lodash';
import { fetchFavorites, updateLikeStatus, saveNotes } from '../utils/favoritesService';


interface Photograph {
  photoID: string;
  number: string;
  date: string;
  seriesName: string;
  seriesCode: string;
}

interface FavoriteItem {
  photoId: string;
  date: string;
  number: string;
  diptychIdCode: string;
  imagePath: string;
  seriesCode: string;
  seriesName: string;
  fused: string;
  shapeInCenterEdge: string;
  layoutSpecs?: LayoutSpecs;
  notes?: string;
}

// Ensure FavoriteItem is exported if used in another module
export type { FavoriteItem };

const Favorites: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvasMap, setFabricCanvasMap] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [diptychHeights, setDiptychHeights] = useState<{ [key: string]: { height: number; marginTop: number } }>({});  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<FavoriteItem | null>(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListView, setIsListView] = useState(false);
  const { handleScroll, scrollToTop } = useContext(ScrollContext);  
  const [renderedItems, setRenderedItems] = useState<number[]>([]);
  const renderDelay = 100; // Adjust this value to control the delay between renderings (in milliseconds)
  const [favoriteNotes, setFavoriteNotes] = useState<{ [key: string]: string }>({});
  const [modifiedNotes, setModifiedNotes] = useState<{ [key: string]: boolean }>({});
  const userId = useStore.getState().userId?.toString(); // Convert userId to string if it's not null
  const { setCurrentFilter } = useStore();

  function getPhotoUrl(imagePath: string) {
    const pathIndex = imagePath.indexOf('/originals');
    return pathIndex >= 0 ? `${urlConfig.baseURL}${imagePath.slice(pathIndex + '/originals'.length)}` : imagePath;
  }

  const handleOpenFullScreen = (index: number) => {
    setSelectedIndex(index);
    setFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setFullScreenOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  const handlePrevFullScreen = () => {
    setSelectedIndex(prevIndex => (prevIndex === 0 ? favoriteItems.length - 1 : prevIndex - 1));
  };

  const handleNextFullScreen = () => {
    setSelectedIndex(prevIndex => (prevIndex === favoriteItems.length - 1 ? 0 : prevIndex + 1));
  };

  const handleUnlike = (item: FavoriteItem) => {
    setItemToRemove(item);
    setConfirmationOpen(true);
  };

  const handleFilterChange = (filter: string) => {
    console.log('handleFilterChange called with filter:', filter);
    setCurrentFilter(filter);
    navigate(`/${filter}`);
  };

  const handleDateFilterChange = (date: string) => {
    console.log('handleDateFilterChange called with date:', date);
    setCurrentFilter(date);
    navigate(`/${date}`);
  };
  
  const handleNumberFilterChange = (number: string) => {
    console.log('handleNumberFilterChange called with number:', number);
    setCurrentFilter(number);
    navigate(`/${number}`);
  };

  const handleConfirmUnlike = async () => {
    if (itemToRemove && userId) {  // Check that userId is defined
      try {
        await updateLikeStatus(userId, itemToRemove.photoId, itemToRemove.diptychIdCode, false);
        setFavoriteItems(prevItems => prevItems.filter(item => item !== itemToRemove));
      } catch (error) {
        console.error('Error unliking:', error);
      }
    }
    setConfirmationOpen(false);
    setItemToRemove(null);
  };

  const updateFabricCanvas = (diptychIdCode: string, canvas: fabric.Canvas) => {
    setFabricCanvasMap(prevMap => new Map(prevMap).set(diptychIdCode, canvas));
  };

  const updateDiptychHeight = useCallback((diptychIdCode: string, height: number, marginTop: number) => {
    setDiptychHeights((prevHeights) => ({
      ...prevHeights,
      [diptychIdCode]: { height, marginTop },
    }));
  }, []);

  const handleLayoutSpecsReady = useCallback((layoutSpecs: LayoutSpecs, diptychIdCode: string) => {
    setFavoriteItems(prevItems =>
      prevItems.map(item => {
        if (item.diptychIdCode === diptychIdCode) {
          const updatedLayoutSpecs = {
            ...layoutSpecs,
            photoId: item.photoId,
            photoUrl: getPhotoUrl(item.imagePath),
            mirroredPhotoUrl: getPhotoUrl(item.imagePath),
          };
          return { ...item, layoutSpecs: updatedLayoutSpecs };
        }
        return item;
      })
    );
  }, []);

  const handleFavoriteClick = (photoId: string, diptychIdCode: string, seriesCode: string) => {
    useStore.getState().setSelectedDiptychIdCode(diptychIdCode);
    updateFrameIdFromDiptychCode(diptychIdCode);
    navigate(`/${seriesCode}/${photoId}`, { state: { selectedDiptychIdCode: diptychIdCode } });
  };
  
  const navigateToInquireAndSetDiptychCode = (photoId: string, diptychIdCode: string, seriesCode: string) => {
    useStore.getState().setSelectedDiptychIdCode(diptychIdCode);
    updateFrameIdFromDiptychCode(diptychIdCode);
    navigate(`/${seriesCode}/${photoId}/inquire`);
  };

  const updateFrameIdFromDiptychCode = useCallback((diptychIdCode: string) => {
    const frameType = diptychIdCode.split('_')[4].charAt(0);
    let newFrameId;
    switch (frameType) {
      case 'W':
        newFrameId = 1;
        break;
      case 'B':
        newFrameId = 2;
        break;
      case 'U':
        newFrameId = 3;
        break;
      default:
        newFrameId = 1;
    }
    useStore.getState().setFrameId(newFrameId);
  }, []);

  const handleSaveNotes = async (photoId: string, diptychIdCode: string) => {
    if (userId) {  // Check that userId is defined
      try {
        await saveNotes(userId, photoId, diptychIdCode, favoriteNotes[`${photoId}-${diptychIdCode}`]);
        setModifiedNotes({
          ...modifiedNotes,
          [`${photoId}-${diptychIdCode}`]: false,
        });
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    }
  };
  
  useEffect(() => {
    if (userId) {
      const loadFavorites = async () => {
        try {
          const items = await fetchFavorites(userId);
          setFavoriteItems(items);
          const initialNotes: { [key: string]: string } = {};
          items.forEach(item => {
            initialNotes[`${item.photoId}-${item.diptychIdCode}`] = item.notes || '';
          });
          setFavoriteNotes(initialNotes);
        } catch (error) {
          console.error('Failed to load favorites:', error);
          setFavoriteItems([]);
          setFavoriteNotes({});
        }
      };
      loadFavorites();
    }
  }, [userId]);

  useEffect(() => {
    const renderItem = (index: number) => {
      setTimeout(() => {
        setRenderedItems((prevItems) => [...prevItems, index]);
      }, index * renderDelay);
    };

    favoriteItems.forEach((_, index) => {
      renderItem(index);
    });
  }, [favoriteItems, renderDelay]);

  useEffect(() => {
    const handleResize = debounce(() => {
      // Your resize handling logic
    }, 200); // Adjust the debounce delay as needed
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCurrentView = () => (
    <Grid container spacing={0} style={{ marginTop: '40px' }}>
      {favoriteItems.map((item, index) => (
        <LazyLoad key={`${item.photoId}-${item.diptychIdCode}`} height={200} once>
          <Grid item xs={12} key={`${item.photoId}-${item.diptychIdCode}`} style={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '20px 0' }}>
            <Box display="flex" alignItems="center" style={{ width: '100%' }}>
              <Box flex="0 0 40%" marginRight="20px" display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="subtitle1">
                  <strong>Photo ID:</strong>{' '}
                  <span className={`${styles.idButton} ${styles.linkButton}`} onClick={() => handleFilterChange(item.date)}>
                    {item.date}
                  </span>
                  <strong> - </strong>
                  <span className={`${styles.idButton} ${styles.linkButton}`} onClick={() => handleFilterChange(item.number)}>
                    {item.number}
                  </span>
                  <br />
                  <strong>From the Series:</strong>{' '}
                  <span
                    className={`${styles.idButton} ${styles.linkButton}`}
                    onClick={() => handleFilterChange(item.seriesCode)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.seriesName}
                  </span>
                  <br />
                  <strong>Diptych Variation:</strong> {item.fused} - {item.shapeInCenterEdge}
                </Typography>
                  <Box marginTop="10px">
                    <Grid container spacing={1}>
                      <Grid item>
                      <button className={`${buttonStyles.button}`} onClick={() => navigateToInquireAndSetDiptychCode(item.photoId, item.diptychIdCode, item.seriesCode)}>
                        Inquire
                      </button>
                      </Grid>
                      <Grid item>
                        <button className={`${buttonStyles.button}`} onClick={() => handleFavoriteClick(item.photoId, item.diptychIdCode, item.seriesCode)}>
                          Exhibition View
                        </button>
                      </Grid>
                      <Grid item>
                        <FullScreenButtonFavs onClick={() => handleOpenFullScreen(index)} />
                      </Grid>
                      <Grid item>
                      <DownloadFavsButton
                        photoId={item.photoId}
                        diptychIdCode={item.diptychIdCode}
                        fabricCanvasRef={fabricCanvasMap.get(item.diptychIdCode)}
                        layoutSpecs={item.layoutSpecs} // Use the layoutSpecs from the favoriteItems state
                        areShapesVisible={areShapesVisible}
                        size="large"
                      />
                      </Grid>
                      <Grid item>
                        <button className={`${buttonStyles.button}`} onClick={() => setAreShapesVisible(prev => !prev)}>
                          {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
                        </button>
                      </Grid>
                      <Grid item>
                        <LikeButtonFavs
                          photoId={item.photoId}
                          diptychIdCode={item.diptychIdCode}
                          setIsAuthModalOpen={() => {}}
                          onLikeButtonClick={() => handleUnlike(item)}
                          onUnlikeConfirmed={handleConfirmUnlike}
                        />
                      </Grid>
                      <Box marginTop="10px" marginLeft="15px">
                        <Typography variant="subtitle2">Notes:</Typography>
                        <div style={{ width: '400px' }}></div>
                        <textarea
                          className="notes-textbox"
                          value={favoriteNotes[`${item.photoId}-${item.diptychIdCode}`] || ''}
                          onChange={(e) => {
                            setFavoriteNotes({
                              ...favoriteNotes,
                              [`${item.photoId}-${item.diptychIdCode}`]: e.target.value,
                            });
                            setModifiedNotes({
                              ...modifiedNotes,
                              [`${item.photoId}-${item.diptychIdCode}`]: true,
                            });
                          }}
                          rows={2}
                          style={{ width: '100%', resize: 'vertical', fontFamily: 'EB Garamond, serif' }}
                        />
                        {modifiedNotes[`${item.photoId}-${item.diptychIdCode}`] && (
                          <button
                            onClick={() => handleSaveNotes(item.photoId, item.diptychIdCode)}
                            className={`${buttonStyles.button}`}
                          >
                            Save Notes
                          </button>
                        )}
                      </Box>
                    </Grid>
                  </Box>
                </Box>
                <Box flex="1" className={buttonStyles.clickable} onClick={() => handleFavoriteClick(item.photoId, item.diptychIdCode, item.seriesCode)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: `${diptychHeights[item.diptychIdCode]?.height || 0}px` }}>
                  <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderedItems.includes(index) && (
                        <DynamicDiptychComponent
                          photoId={item.photoId}
                          imagePath={item.imagePath}
                          DiptychIdCode={item.diptychIdCode}
                          containerRef={containerRef}
                          onCanvasReady={(canvasRef, diptychIdCode) => updateFabricCanvas(diptychIdCode, canvasRef)}
                          areShapesVisible={areShapesVisible}
                          onLayoutSpecsReady={(layoutSpecs) => handleLayoutSpecsReady(layoutSpecs, item.diptychIdCode)}
                          updateHeight={(height) => updateDiptychHeight(item.diptychIdCode, height, 0)}
                        />
                      )}
                    </div>
                  </div>
                </Box>
              </Box>
            </Grid>
            </LazyLoad>
          ))}
        </Grid>
      );


      const renderListView = () => (
        <Grid container spacing={2} style={{ marginTop: '45px' }}>
          {favoriteItems.map((item, index) => (
            <LazyLoad key={`${item.photoId}-${item.diptychIdCode}`} height={200} once>
              <Grid item xs={12} key={`${item.photoId}-${item.diptychIdCode}`} style={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '10px 0', marginLeft: '100px', marginRight: '100px' }}>
                <Box display="flex" alignItems="center" width="100%">
      
                <Box
                  flex="0 0 200px"
                  marginRight="20px"
                  className={buttonStyles.clickable}
                  onClick={() => handleFavoriteClick(item.photoId, item.diptychIdCode, item.seriesCode)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px' }}
                >
                  <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ transform: `translateY(${(diptychHeights[item.diptychIdCode]?.marginTop || 0) / 20}px)` }}>
                        {renderedItems.includes(index) && (
                          <DynamicDiptychComponent
                            photoId={item.photoId}
                            imagePath={item.imagePath}
                            DiptychIdCode={item.diptychIdCode}
                            containerRef={containerRef}
                            onCanvasReady={(canvasRef, diptychIdCode) => updateFabricCanvas(diptychIdCode, canvasRef)}
                            areShapesVisible={areShapesVisible}
                            onLayoutSpecsReady={(layoutSpecs) => handleLayoutSpecsReady(layoutSpecs, item.diptychIdCode)}
                            updateHeight={(height) => {
                              const containerHeight = 150;
                              const marginTop = (containerHeight - height) / 2;
                              updateDiptychHeight(item.diptychIdCode, height, marginTop);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Box>
                <Box flex="1">
                  <Typography variant="subtitle1">
                    <strong>Photo ID:</strong>{' '}
                    <span className={`${styles.idButton} ${styles.linkButton}`} onClick={() => handleFilterChange(item.date)}>
                      {item.date}
                    </span>
                    <strong> - </strong>
                    <span className={`${styles.idButton} ${styles.linkButton}`} onClick={() => handleFilterChange(item.number)}>
                      {item.number}
                    </span>
                    <br />
                    <strong>From the Series:</strong>{' '}
                    <span
                      className={`${styles.idButton} ${styles.linkButton}`}
                      onClick={() => handleFilterChange(item.seriesCode)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.seriesName}
                    </span>
                    <br />
                    <strong>Diptych Variation:</strong> {item.fused} - {item.shapeInCenterEdge}
                  </Typography>
                  <Box marginTop="10px" display="flex" alignItems="center">
                    <button
                      className={`${buttonStyles.button}`}
                      onClick={() => navigateToInquireAndSetDiptychCode(item.photoId, item.diptychIdCode, item.seriesCode)}
                      style={{ marginRight: '10px' }}
                    >
                      Inquire
                    </button>
                    <button
                      className={`${buttonStyles.button}`}
                      onClick={() => handleFavoriteClick(item.photoId, item.diptychIdCode, item.seriesCode)}
                      style={{ marginRight: '10px' }}
                    >
                      Exhibition View
                    </button>
                    <DownloadFavsButton
                      photoId={item.photoId}
                      diptychIdCode={item.diptychIdCode}
                      fabricCanvasRef={fabricCanvasMap.get(item.diptychIdCode)}
                      layoutSpecs={item.layoutSpecs}
                      areShapesVisible={areShapesVisible}
                      size="large"
                    />
                    <button
                      className={`${buttonStyles.button}`}
                      onClick={() => handleOpenFullScreen(index)}
                      style={{ marginLeft: '10px' }}
                    >
                      Full Screen
                    </button>
                  </Box>
                  <Box marginTop="10px">
                    <Typography variant="subtitle2" style={{ marginLeft: '5px' }}>Notes:</Typography>
                    <div style={{ width: '400px' }}>
                      <textarea
                        className="notes-textbox"
                        value={favoriteNotes[`${item.photoId}-${item.diptychIdCode}`] || ''}
                        onChange={(e) => {
                          setFavoriteNotes({
                            ...favoriteNotes,
                            [`${item.photoId}-${item.diptychIdCode}`]: e.target.value,
                          });
                          setModifiedNotes({
                            ...modifiedNotes,
                            [`${item.photoId}-${item.diptychIdCode}`]: true,
                          });
                        }}
                        rows={2}
                        style={{ width: '100%', resize: 'vertical', fontFamily: 'EB Garamond, serif', marginLeft: '5px' }}
                      />
                    </div>
                    {modifiedNotes[`${item.photoId}-${item.diptychIdCode}`] && (
                      <button
                        onClick={() => handleSaveNotes(item.photoId, item.diptychIdCode)}
                        className={`${buttonStyles.button}`}
                      >
                        Save Notes
                      </button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            </LazyLoad>
          ))}
        </Grid>
      );

  return (
    <div>
      <Box position="sticky" top={60} bgcolor="white" zIndex={1000} paddingTop="0px" paddingBottom="10px">
        <Typography variant="h4" align="center">
          My Favorites
        </Typography>
        <Box display="flex" justifyContent="center" marginTop="10px">
          <FormControlLabel
            control={<Switch checked={isListView} onChange={() => setIsListView(prev => !prev)} />}
            label={isListView ? "Larger View" : "List View"}
          />
        </Box>
        </Box>
        {!useStore.getState().userId ? (
          <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
            Please sign in to view your favorites.
          </Typography>
        ) : favoriteItems.length === 0 ? (
          <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
            You have no favorite items yet.
          </Typography>
        ) : isListView ? renderListView() : renderCurrentView()}
        <ConfirmationModal
          open={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={handleConfirmUnlike}
        />
        {
        fullScreenOpen && favoriteItems.length > 0 && selectedIndex < favoriteItems.length && (
          <FullScreenView
            open={fullScreenOpen}
            onClose={handleCloseFullScreen}
            onPrev={handlePrevFullScreen}
            onNext={handleNextFullScreen}
            diptychIdCode={favoriteItems[selectedIndex].diptychIdCode}
          >
            <DynamicDiptychComponent
              photoId={favoriteItems[selectedIndex].photoId}
              imagePath={favoriteItems[selectedIndex].imagePath}
              DiptychIdCode={favoriteItems[selectedIndex].diptychIdCode}
              containerRef={fullScreenContainerRef}
              onCanvasReady={(canvasRef, diptychIdCode) => updateFabricCanvas(diptychIdCode, canvasRef)}
              areShapesVisible={areShapesVisible}
              onLayoutSpecsReady={(layoutSpecs) => handleLayoutSpecsReady(layoutSpecs, favoriteItems[selectedIndex].diptychIdCode)}
              updateHeight={(height) => updateDiptychHeight(favoriteItems[selectedIndex].diptychIdCode, height, 0)}
            />
          </FullScreenView>
        )
      }
      <button onClick={scrollToTop} className={buttonStyles.scrollToTopButton}>
        ↑
      </button>
    </div>
  );
};

export default Favorites;