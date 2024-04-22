// my-gallery/src/screens/Favorites.tsx

// src/screens/Favorites.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import { useNavigate } from 'react-router-dom';
import useStore from '../utils/store';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import { fabric } from 'fabric';
import buttonStyles from './ButtonStyles.module.css';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import FullScreenView from '../components/layout/FullScreenView';
import LikeButtonFavs from '../components/layout/LikeButtonFavs';
import FullScreenButton from '../components/layout/FullScreenButton';
import DownloadButton from '../components/layout/DownloadButton';

interface FavoriteItem {
  photoId: string;
  diptychIdCode: string;
  imagePath: string;
  seriesCode: string;
  seriesName: string;
  fused: string;
  shapeInCenterEdge: string;
  // Add other relevant properties
}

const Favorites: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [fabricCanvasMap, setFabricCanvasMap] = useState<Map<string, fabric.Canvas>>(new Map());
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const [diptychHeights, setDiptychHeights] = useState<{ [key: string]: number }>({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<FavoriteItem | null>(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevDiptychHeights, setPrevDiptychHeights] = useState<{ [key: string]: number }>({});
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  const checkLikeStatus = async (photoId: string, diptychIdCode: string) => {
    try {
      const response = await fetch(`/api/likes/${useStore.getState().userId}/${photoId}/${diptychIdCode}`);
      const data = await response.json();
      setLikedItems(prevLikedItems => ({ ...prevLikedItems, [`${photoId}-${diptychIdCode}`]: data.isLiked }));
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };
  
  const handleOpenFullScreen = (index: number) => {
    setPrevDiptychHeights(diptychHeights);
    setSelectedIndex(index);
    setFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setFullScreenOpen(false);
    setTimeout(() => {
      triggerResize();
    }, 1);
  };

  const triggerResize = () => {
    window.dispatchEvent(new Event('resize'));
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
        setLikedItems(prevLikedItems => ({ ...prevLikedItems, [`${itemToRemove.photoId}-${itemToRemove.diptychIdCode}`]: false }));
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

  const updateDiptychHeight = useCallback((diptychIdCode: string, height: number) => {
    setDiptychHeights((prevHeights) => ({
      ...prevHeights,
      [diptychIdCode]: height,
    }));
  }, []);

  const handleLayoutSpecsReady = useCallback((layoutSpecs: LayoutSpecs) => {
    console.log('handleLayoutSpecsReady called with:', layoutSpecs);
    setLayoutSpecsMap(prevMap => new Map(prevMap).set(layoutSpecs.DiptychIdCode, layoutSpecs));
  }, []);

  const handleFavoriteClick = (photoId: string, diptychIdCode: string, seriesCode: string) => {
    // Update the selectedDiptychIdCode in the global store
    useStore.getState().setSelectedDiptychIdCode(diptychIdCode);
    // Navigate to the exhibition space with the selected photoId, seriesCode, and diptychIdCode
    navigate(`/${seriesCode}/${photoId}`, { state: { selectedDiptychIdCode: diptychIdCode } });
  };

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const userId = useStore.getState().userId;
        console.log('userId:', userId);
        if (userId) {
          const response = await axios.get(`/api/favorites/${userId}`);
          setFavoriteItems(response.data);
          response.data.forEach((item: FavoriteItem) => {
            checkLikeStatus(item.photoId, item.diptychIdCode);
          });
        } else {
          setFavoriteItems([]);
        }
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      }
    };
  
    fetchFavoriteItems();
  }, [useStore.getState().userId]);

  return (
    <div>
      <Typography variant="h4" align="center" style={{ marginTop: '80px' }}>
        My Favorites
      </Typography>
      {!useStore.getState().userId ? (
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          Please sign in to view your favorites.
        </Typography>
      ) : favoriteItems.length === 0 ? (
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          You have no favorite items yet.
        </Typography>
      ) : (
        <Grid container spacing={0} style={{ marginTop: '20px' }}>
          {favoriteItems.map((item, index) => (
            <Grid item xs={12} key={`${item.photoId}-${item.diptychIdCode}`} style={{ borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '20px 0' }}>
              <Box display="flex" alignItems="center" style={{ border: '1px dashed red', width: '100%' }}>
                <Box flex="0 0 40%" marginRight="20px" display="flex" flexDirection="column" justifyContent="center" style={{ border: '1px dashed blue' }}>
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
                      <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={() => navigate(`/${item.seriesCode}/${item.photoId}/inquire`)}>
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
                      {/* Add more button Grid items here */}
                    </Grid>
                  </Box>
                </Box>
                <Box flex="1" className={buttonStyles.clickable} onClick={() => handleFavoriteClick(item.photoId, item.diptychIdCode, item.seriesCode)} style={{ border: '1px dashed green', display: 'flex', alignItems: 'center', justifyContent: 'center', height: `${diptychHeights[item.diptychIdCode] || 0}px` }}>                  
                  <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DynamicDiptychComponent
                        photoId={item.photoId}
                        imagePath={item.imagePath}
                        DiptychIdCode={item.diptychIdCode}
                        containerRef={containerRef}
                        onCanvasReady={(canvasRef, diptychIdCode) => updateFabricCanvas(diptychIdCode, canvasRef)}
                        areShapesVisible={areShapesVisible}
                        onLayoutSpecsReady={handleLayoutSpecsReady}
                        updateHeight={(height) => updateDiptychHeight(item.diptychIdCode, height)}
                      />
                    </div>
                  </div>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
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
            updateHeight={(height) => updateDiptychHeight(favoriteItems[selectedIndex].diptychIdCode, height)}
          />
        )}
      </FullScreenView>
    </div>
  );
};

export default Favorites;