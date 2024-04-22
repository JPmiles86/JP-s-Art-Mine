// my-gallery/src/screens/Favorites.tsx

import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { Typography, Grid, Box, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import { useNavigate } from 'react-router-dom';
import useStore from '../utils/store';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import ScrollContext from '../ScrollContext'; 
import { fabric } from 'fabric';
import buttonStyles from './ButtonStyles.module.css';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import FullScreenView from '../components/layout/FullScreenView';
import LikeButtonFavs from '../components/layout/LikeButtonFavs';
import FullScreenButton from '../components/layout/FullScreenButton';
import DownloadButton from '../components/layout/DownloadButton';
import { useInView } from 'react-intersection-observer';

interface FavoriteItem {
  photoId: string;
  diptychIdCode: string;
  imagePath: string;
  seriesCode: string;
  seriesName: string;
  fused: string;
  shapeInCenterEdge: string;
}

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

  const handleConfirmUnlike = async () => {
    if (itemToRemove) {
      try {
        await fetch(`/api/likes/${itemToRemove.photoId}/${itemToRemove.diptychIdCode}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: useStore.getState().userId, isLiked: false }),
        });
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

  const handleLayoutSpecsReady = useCallback((layoutSpecs: LayoutSpecs) => {
    console.log('handleLayoutSpecsReady called with:', layoutSpecs);
    setLayoutSpecsMap(prevMap => new Map(prevMap).set(layoutSpecs.DiptychIdCode, layoutSpecs));
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

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const userId = useStore.getState().userId;
        console.log('userId:', userId);
        if (userId) {
          const response = await axios.get(`/api/favorites/${userId}`);
          setFavoriteItems(response.data);
        } else {
          setFavoriteItems([]);
        }
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      }
    };

    fetchFavoriteItems();
  }, [useStore.getState().userId]);

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

  const renderCurrentView = () => (
    <Grid container spacing={0} style={{ marginTop: '40px' }}>
      {favoriteItems.map((item, index) => (
        <Grid item xs={12} key={`${item.photoId}-${item.diptychIdCode}`} style={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '20px 0' }}>
          <Box display="flex" alignItems="center" style={{ width: '100%' }}>
            <Box flex="0 0 40%" marginRight="20px" display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="subtitle1">
                <strong>Photo ID:</strong> {item.photoId}
                <br />
                <strong>From the Series:</strong> {item.seriesName}
                <br />
                <strong>Diptych Variation:</strong> {item.fused} - {item.shapeInCenterEdge}
              </Typography>
              <Box marginTop="10px">
                <Grid container spacing={1}>
                  <Grid item>
                  <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={() => navigateToInquireAndSetDiptychCode(item.photoId, item.diptychIdCode, item.seriesCode)}>
                    Inquire
                  </button>
                  </Grid>
                  <Grid item>
                    <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={() => handleFavoriteClick(item.photoId, item.diptychIdCode, item.seriesCode)}>
                      Exhibition View
                    </button>
                  </Grid>
                  <Grid item>
                    <FullScreenButton onClick={() => handleOpenFullScreen(index)} />
                  </Grid>
                  <Grid item>
                    <DownloadButton
                      photoId={item.photoId}
                      DiptychIdCode={item.diptychIdCode}
                      fabricCanvasRef={fabricCanvasMap.get(item.diptychIdCode)}
                      layoutSpecs={layoutSpecsMap.get(item.diptychIdCode) || {} as LayoutSpecs}
                      areShapesVisible={areShapesVisible}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={() => setAreShapesVisible(prev => !prev)}>
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
                      onLayoutSpecsReady={handleLayoutSpecsReady}
                      updateHeight={(height) => updateDiptychHeight(item.diptychIdCode, height, 0)}
                    />
                  )}
                </div>
              </div>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );


  const renderListView = () => (
    <Grid container spacing={2} style={{ marginTop: '45px' }}>
      {favoriteItems.map((item, index) => (
        <Grid item xs={12} key={`${item.photoId}-${item.diptychIdCode}`} style={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '10px 0', marginLeft: '100px', marginRight: '100px', }} >
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
                        onLayoutSpecsReady={handleLayoutSpecsReady}
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
                <strong>Photo ID:</strong> {item.photoId}
                <br />
                <strong>From the Series:</strong> {item.seriesName}
                <br />
                <strong>Diptych Variation:</strong> {item.fused} - {item.shapeInCenterEdge}
              </Typography>
              <Box marginTop="10px">
                <button
                  className={`${buttonStyles.button} ${buttonStyles.small}`}
                  onClick={() => navigateToInquireAndSetDiptychCode(item.photoId, item.diptychIdCode, item.seriesCode)}
                >
                  Inquire
                </button>
                <button className={buttonStyles.button} onClick={() => handleFavoriteClick(item.photoId, item.diptychIdCode, item.seriesCode)}>
                  Exhibition View
                </button>
                <DownloadButton
                  photoId={item.photoId}
                  DiptychIdCode={item.diptychIdCode}
                  fabricCanvasRef={fabricCanvasMap.get(item.diptychIdCode)}
                  layoutSpecs={layoutSpecsMap.get(item.diptychIdCode) || {} as LayoutSpecs}
                  areShapesVisible={areShapesVisible}
                  size="large"
                />
                <button className={buttonStyles.button} onClick={() => handleOpenFullScreen(index)}>
                  Full Screen
                </button>
              </Box>
            </Box>
          </Box>
        </Grid>
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
      <FullScreenView
        open={fullScreenOpen}
        onClose={handleCloseFullScreen}
        onPrev={handlePrevFullScreen}
        onNext={handleNextFullScreen}
      >
        {fullScreenOpen && (
          <DynamicDiptychComponent
            photoId={favoriteItems[selectedIndex].photoId}
            imagePath={favoriteItems[selectedIndex].imagePath}
            DiptychIdCode={favoriteItems[selectedIndex].diptychIdCode}
            containerRef={fullScreenContainerRef}
            onCanvasReady={(canvasRef, diptychIdCode) => updateFabricCanvas(diptychIdCode, canvasRef)}
            areShapesVisible={areShapesVisible}
            onLayoutSpecsReady={handleLayoutSpecsReady}
            updateHeight={(height) => updateDiptychHeight(favoriteItems[selectedIndex].diptychIdCode, height, 0)}
          />
        )}
      </FullScreenView>
      <button onClick={scrollToTop} className={buttonStyles.scrollToTopButton}>
        ↑
      </button>
    </div>
  );
};

export default Favorites;