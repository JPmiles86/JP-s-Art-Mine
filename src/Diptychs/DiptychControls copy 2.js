 // my-gallery/src/Diptychs/DiptychControls.js

 import React, { useEffect } from 'react';
 import DownloadButton from './DownloadButton';
 import buttonStyles from '../screens/ButtonStyles.module.css';
 import useStore from '../screens/store'; 
 import { swapMapping, rotateMapping } from './DiptychIdCodeMapping'; 
 
 const DiptychControls = ({ navigateToInquiry, selectedPhoto, fabricCanvasRef, layoutSpecs, areShapesVisible, toggleShapesVisibility, children }) => {
    const { FrameId, isMerged, shapeCode, selectedDiptychIdCode, setFrameId, setIsMerged, setShapeCode, setSelectedDiptychIdCode } = useStore(state => ({
        FrameId: state.FrameId,
        isMerged: state.isMerged,
        shapeCode: state.shapeCode,
        selectedDiptychIdCode: state.selectedDiptychIdCode,
        setFrameId: state.setFrameId,
        setIsMerged: state.setIsMerged,
        setShapeCode: state.setShapeCode,
        setSelectedDiptychIdCode: state.setSelectedDiptychIdCode
    }));

    const updateDiptychIdCode = async () => {
        // Use state values directly here
        const aspectRatio = selectedPhoto.aspectRatio;
        const frameId = FrameId;
        const fused = isMerged;
        const shape = shapeCode;

        try {
            const response = await fetch(`http://localhost:3000/api/diptychsvgs/aspectratio/${aspectRatio}/frameid/${frameId}/fused/${fused}/shapeCode/${shape}`);
            if (!response.ok) {
                throw new Error('Error fetching DiptychIdCode');
            }
            const data = await response.json();
            console.log('Server response:', data);

            if (data.length > 0) {
                setSelectedDiptychIdCode(data[0].DiptychIdCode);
            } else {
                console.log('No matching DiptychIdCode found');
            }
        } catch (error) {
            console.error('Failed to update DiptychIdCode:', error);
        }
    };


    const handleFrameIdChange = () => { setFrameId(FrameId === 1 ? 2 : 1); updateDiptychIdCode(); };
    const handleToggleMergeStatus = () => { setIsMerged(isMerged === 'Entangled' ? 'Fused' : 'Entangled'); updateDiptychIdCode(); };
    const handleSwapShape = () => { setShapeCode(swapMapping[shapeCode] || shapeCode); updateDiptychIdCode(); };
    const handleRotateShape = () => { setShapeCode(rotateMapping[shapeCode] || shapeCode); updateDiptychIdCode(); };

    useEffect(() => {
  // The effect should run if there is a selected photo and no selectedDiptychIdCode
  if (selectedPhoto && !selectedDiptychIdCode) {
    // Set default values if needed, otherwise use existing state
    const defaultFrameId = FrameId || 1;
    const defaultIsMerged = isMerged || 'Entangled';
    const defaultShapeCode = shapeCode || 'CD';
    // Trigger the update with either selectedPhoto's aspect ratio or a default one
    const aspectRatioToUse = selectedPhoto.aspectRatio || 'defaultAspectRatio'; // Replace 'defaultAspectRatio' with an actual default if necessary
    updateDiptychIdCode(aspectRatioToUse, defaultFrameId, defaultIsMerged, defaultShapeCode);
  }
}, [selectedPhoto, selectedDiptychIdCode, FrameId, isMerged, shapeCode, updateDiptychIdCode]);

    
    return (
        <div className={buttonStyles.buttonContainer}>
            <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={handleFrameIdChange}>
                Frame in {FrameId === 1 ? 'Black' : 'White'}
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={handleToggleMergeStatus}>
                {isMerged === 'Entangled' ? 'Merge' : 'Unmerge'}
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={handleSwapShape}>
                Swap
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={handleRotateShape}>
                Rotate
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={toggleShapesVisibility}>
                {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={navigateToInquiry}>
                Inquire
            </button>
            <DownloadButton
                photoId={selectedPhoto.photoID}
                DiptychIdCode={useStore.getState().selectedDiptychIdCode}
                fabricCanvasRef={fabricCanvasRef}
                layoutSpecs={layoutSpecs}
                areShapesVisible={areShapesVisible}
                size="small"
            />
            <div className={buttonStyles.dropdownSelector}>
                {children}
            </div>
        </div>
    );
};

export default DiptychControls;