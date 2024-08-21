import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ExhibitionSpace.module.css';
import useStore from '../utils/store';
import { fetchPhotosService } from '../utils/fetchPhotosService';
import ExhibitionHeader from './ExhibitionHeader';
import GalleryBackgroundSelector from '../components/layout/GalleryBackgroundSelector';
import DynamicDiptychComponent from '../Diptychs/DynamicDiptychComponent';
import { diptychConfigurations } from '../Diptychs/diptychFabricConfigurations';
import DiptychControls from '../Diptychs/DiptychControls';
import useDiptychInfo from '../Diptychs/useDiptychInfo';
import useGalleryNavigation from '../utils/useGalleryNavigation';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import HidePhotoButton from '../components/layout/HidePhotoButton';
import { fabric } from 'fabric';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonStyles from './ButtonStyles.module.css';
import { parseDiptychIdCode } from '../Diptychs/DiptychDynamicUtils';

export interface Photograph {
  photoID: string;
  number: string;
  url: string;
  imagePath?: string;
  aspectRatio: string;
  title: string;
  date: string;
  dateOriginal: string;
  index?: number;
  seriesName: string;
  seriesCode: string;
}

const ExhibitionSpace = () => {
  console.log('ExhibitionSpace Rendered or Re-rendered');
  const navigate = useNavigate();
  const { photos } = useStore((state) => state);
  const { filter, photoID } = useParams<{ filter: string; photoID: string }>();
  const {
    currentFilter,
    setCurrentFilter,
    sortedPhotos,
    loading,
    setLoading,
    shapeCode,
    initialPhotoFetch,
    setInitialPhotoFetch,
    setPhotos,
  } = useStore((state) => state);

  const selectedPhotograph = useMemo(
    () => sortedPhotos.find((photo) => photo.photoID === photoID),
    [sortedPhotos, photoID]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryBackground, setGalleryBackground] = useState(
    '/assets/images/gallerybg/Gallery-2.png'
  );
  const [error] = useState<Error | null>(null);
  const { selectedDiptychIdCode, setSelectedDiptychIdCode } = useStore((state) => ({
    selectedDiptychIdCode: state.selectedDiptychIdCode,
    setSelectedDiptychIdCode: state.setSelectedDiptychIdCode,
  }));
  const [isContainerReady, setIsContainerReady] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [layoutSpecsMap, setLayoutSpecsMap] = useState<Map<string, LayoutSpecs>>(new Map());
  const [areShapesVisible, setAreShapesVisible] = useState(false);
  const { diptychInfo } = useDiptychInfo(selectedDiptychIdCode);
  const [isLoading, setIsLoading] = useState(true);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  const userRole = useStore((state) => state.userRole);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const [diptychHeightInfo, setDiptychHeightInfo] = useState<{ height: number; marginTop: number }>({
    height: 0,
    marginTop: 0,
  });
  const [maxContainerSize, setMaxContainerSize] = useState({ width: 0, height: 0 });
  const [photosError, setPhotosError] = useState<string | null>(null);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  const updateDiptychHeightInfo = useCallback((height: number) => {
    const marginTop = fullScreenContainerRef.current
      ? (fullScreenContainerRef.current.clientHeight - height) / 2
      : 0;

    setDiptychHeightInfo({ height, marginTop });
  }, []);

  const { handlePrevPhoto, handleNextPhoto } = useGalleryNavigation(
    sortedPhotos,
    currentFilter
  );

  const handleLayoutSpecsReadyMemoized = useCallback((layoutSpecs: LayoutSpecs) => {
    console.log('handleLayoutSpecsReady called with:', layoutSpecs);
    setLayoutSpecsMap((prevMap) => new Map(prevMap).set(layoutSpecs.DiptychIdCode, layoutSpecs));
  }, []);

  const navigateToInquiryMemoized = useCallback(() => {
    if (photoID) {
      navigate(`/${currentFilter}/${photoID}/inquire`);
      console.log('Navigating to the inquire page.');
    }
  }, [navigate, photoID, currentFilter]);

  const handleChangeGalleryBackground = useCallback((backgroundImage: string) => {
    setGalleryBackground(backgroundImage);
  }, []);

  const galleryBackgroundStyle = useMemo(
    () => ({
      backgroundImage: `url(${galleryBackground})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [galleryBackground]
  );

  const wrappedHandlePrevPhoto = useCallback(() => {
    handlePrevPhoto?.(currentIndex);
  }, [handlePrevPhoto, currentIndex]);

  const wrappedHandleNextPhoto = useCallback(() => {
    handleNextPhoto?.(currentIndex);
  }, [handleNextPhoto, currentIndex]);

  const toggleShapesVisibility = useCallback(() => {
    setAreShapesVisible((prev) => !prev);
    console.log('Toggling shapes visibility');
  }, []);

  const onCanvasReady = useCallback((canvasRef: fabric.Canvas, selectedDiptychIdCode: string) => {
    console.log(`Canvas ready for ${selectedDiptychIdCode}`, canvasRef);
    setFabricCanvas(canvasRef);
  }, []);

  useEffect(() => {
    console.log(`[ExhibitionSpace] Current filter: ${currentFilter}, New filter: ${filter}`);
    if (filter && filter !== currentFilter) {
      setCurrentFilter(filter);
      console.log('[ExhibitionSpace] Filter updated to:', filter);
    }
  }, [filter, setCurrentFilter, currentFilter]);

  useEffect(() => {
    let isMounted = true;

    async function initializeGallery() {
      if (!sortedPhotos.length && currentFilter && isMounted) {
        console.log('[ExhibitionSpace] Fetching photos...');
        await fetchPhotosService(
          setPhotosError,
          setLoading,
          setPhotos,
          setInitialPhotoFetch,
          currentFilter,
          initialPhotoFetch,
          userRole,
        );
      }

      if (isMounted) {
        const photo = sortedPhotos.find((photo) => photo.photoID === photoID);
        if (photo) {
          console.log('[ExhibitionSpace] Selected photo found:', photo);
        }
      }
    }

    initializeGallery();

    return () => {
      isMounted = false;
    };
  }, [currentFilter, photoID, sortedPhotos, initialPhotoFetch]);

  useEffect(() => {
    if (photoID && sortedPhotos.length > 0) {
      console.log('Updating currentIndex - photoID:', photoID, 'sortedPhotos:', sortedPhotos);
      const newIndex = sortedPhotos.findIndex((photo) => photo.photoID === photoID);
      if (newIndex >= 0) {
        setCurrentIndex(newIndex);
      }
    }
  }, [photoID, sortedPhotos]);

  useEffect(() => {
    console.log('useEffect for container size check triggered');
    const checkContainerSize = () => {
      const containerToCheck = isFullScreen ? fullScreenContainerRef.current : galleryRef.current;
      if (containerToCheck) {
        const { clientWidth, clientHeight } = containerToCheck;
        const containerReady = clientWidth > 0 && clientHeight > 0;
        console.log(
          'Container dimensions check, isContainerReady:',
          containerReady,
          'Width:',
          clientWidth,
          'Height:',
          clientHeight
        );
        setIsContainerReady(containerReady);
      }
    };

    checkContainerSize();
    window.addEventListener('resize', checkContainerSize);

    return () => {
      window.removeEventListener('resize', checkContainerSize);
    };
  }, [isFullScreen, photoID, isLoading]);

  useEffect(() => {
    if (selectedDiptychIdCode) {
      const { mergedStatus, color, shape } = parseDiptychIdCode(selectedDiptychIdCode);
      useStore.getState().setIsMerged(mergedStatus === 'entangled' ? 'Entangled' : 'Fused');
      useStore.getState().setFrameId(color);
      useStore.getState().setShapeCode(shape);
    }
  }, [selectedDiptychIdCode]);

  const diptychControlsRef = useRef<HTMLDivElement>(null);

  const calculateMaxContainerSize = useCallback(() => {
    const config = selectedDiptychIdCode
      ? diptychConfigurations[selectedDiptychIdCode as keyof typeof diptychConfigurations]
      : null;
    const aspectRatio = config ? config.originalWidth / config.originalHeight : 16 / 9;

    const windowHeight = window.innerHeight;
    const diptychControlsHeight = diptychControlsRef.current
      ? diptychControlsRef.current.clientHeight
      : 0;
    const availableHeight = windowHeight - diptychControlsHeight;

    const maxWidthBasedOnHeight = availableHeight * aspectRatio;
    const maxHeightBasedOnWidth = window.innerWidth / aspectRatio;

    const maxWidth =
      maxWidthBasedOnHeight > window.innerWidth ? window.innerWidth : maxWidthBasedOnHeight;
    const maxHeight =
      maxHeightBasedOnWidth > availableHeight ? availableHeight : maxHeightBasedOnWidth;

    setMaxContainerSize({ width: maxWidth, height: maxHeight });
  }, [selectedDiptychIdCode]);

  useEffect(() => {
    calculateMaxContainerSize();
    window.addEventListener('resize', calculateMaxContainerSize);
    return () => window.removeEventListener('resize', calculateMaxContainerSize);
  }, [calculateMaxContainerSize]);

  if (!photoID) {
    return <div>No photo selected.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (
    loading.photos ||
    loading.diptychSVG ||
    loading.diptychInfo ||
    loading.galleryBackground
  ) {
    return <div>Loading Exhibition...</div>;
  }

  console.log('[ExhibitionSpace] Render start:', { photoID, currentFilter, selectedDiptychIdCode });

  return (
    <div className={styles.exhibitionSpace}>
      {isFullScreen ? (
        <div
          ref={fullScreenContainerRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button className={ButtonStyles.idButtonWhite} onClick={wrappedHandlePrevPhoto}>
              &larr; Previous
            </button>
            <strong className={ButtonStyles.photoText}>
              &nbsp;&nbsp;-&nbsp;&nbsp;Photo&nbsp;&nbsp;-&nbsp;&nbsp;
            </strong>
            <button className={ButtonStyles.idButtonWhite} onClick={wrappedHandleNextPhoto}>
              Next &rarr;
            </button>
          </div>
          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 9999 }}>
            <IconButton onClick={handleCloseFullScreen} style={{ color: 'white', cursor: 'pointer' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              margin: '40px',
            }}
          >
            <div
              ref={containerRef}
              className={styles.diptychWrapper}
              style={{
                width: '100%',
                height: '100%',
                maxWidth: `${maxContainerSize.width}px`,
                maxHeight: `${maxContainerSize.height}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              {isContainerReady && photoID && selectedDiptychIdCode && selectedPhotograph?.imagePath ? (
                <DynamicDiptychComponent
                  photoId={photoID}
                  imagePath={selectedPhotograph.imagePath}
                  containerRef={containerRef}
                  onCanvasReady={onCanvasReady}
                  DiptychIdCode={selectedDiptychIdCode}
                  areShapesVisible={areShapesVisible}
                  onLayoutSpecsReady={handleLayoutSpecsReadyMemoized}
                  updateHeight={updateDiptychHeightInfo}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
          <div
            ref={diptychControlsRef}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10000 }}
          >
            <DiptychControls
              navigateToInquiry={navigateToInquiryMemoized}
              selectedPhoto={selectedPhotograph}
              layoutSpecs={selectedDiptychIdCode ? layoutSpecsMap.get(selectedDiptychIdCode) : undefined}
              fabricCanvasRef={fabricCanvas}
              areShapesVisible={areShapesVisible}
              toggleShapesVisibility={toggleShapesVisibility}
              handlePrevPhoto={wrappedHandlePrevPhoto}
              handleNextPhoto={wrappedHandleNextPhoto}
              handleOpenFullScreen={toggleFullScreen}
            >
              {!isFullScreen && (
                <GalleryBackgroundSelector onChange={handleChangeGalleryBackground} />
              )}
            </DiptychControls>
          </div>
        </div>
      ) : (
        <>
          <ExhibitionHeader
            currentFilter={currentFilter}
            selectedPhoto={selectedPhotograph || null}
            diptychInfo={diptychInfo}
            handlePrevPhoto={wrappedHandlePrevPhoto}
            handleNextPhoto={wrappedHandleNextPhoto}
          />
          <div ref={galleryRef} className={styles.gallery} style={galleryBackgroundStyle}>
            <div
              style={{
                width: shapeCode && ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
                height: shapeCode && ['C', 'S'].includes(shapeCode.charAt(0)) ? '45%' : '64%',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <div className={styles.diptychWrapper}>
                {isContainerReady &&
                photoID &&
                selectedDiptychIdCode &&
                selectedPhotograph?.imagePath ? (
                  <DynamicDiptychComponent
                    photoId={photoID}
                    imagePath={selectedPhotograph.imagePath}
                    containerRef={containerRef}
                    onCanvasReady={onCanvasReady}
                    DiptychIdCode={selectedDiptychIdCode}
                    areShapesVisible={areShapesVisible}
                    onLayoutSpecsReady={handleLayoutSpecsReadyMemoized}
                  />
                ) : (
                  <div> </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                  {selectedPhotograph && userRole === 'Admin' && (
                    <HidePhotoButton photoId={selectedPhotograph.photoID} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
          <DiptychControls
            navigateToInquiry={navigateToInquiryMemoized}
            selectedPhoto={selectedPhotograph}
            layoutSpecs={selectedDiptychIdCode ? layoutSpecsMap.get(selectedDiptychIdCode) : undefined}
            fabricCanvasRef={fabricCanvas}
            areShapesVisible={areShapesVisible}
            toggleShapesVisibility={toggleShapesVisibility}
            handlePrevPhoto={wrappedHandlePrevPhoto}
            handleNextPhoto={wrappedHandleNextPhoto}
            handleOpenFullScreen={toggleFullScreen}
          >
            {!isFullScreen && (
              <GalleryBackgroundSelector onChange={handleChangeGalleryBackground} />
            )}
          </DiptychControls>

          </div>
        </>
      )}
    </div>
  );
};

export default ExhibitionSpace;
