// my-gallery/src/Diptychs/DiptychControls.js

import React, { useEffect, useState } from 'react';
import DownloadButton from './DownloadButton';
import buttonStyles from '../screens/ButtonStyles.module.css';
import useStore from '../utils/store'; 
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

    // State to track if an update is needed
    const [updateNeeded, setUpdateNeeded] = useState(false);

    useEffect(() => {
        // Check if selectedPhoto and its aspectRatio are available
        if (selectedPhoto?.aspectRatio && !selectedDiptychIdCode) {
            // Use the aspectRatio of the selectedPhoto, and default values for other parameters if they are not set
            const initialFrameId = FrameId || 1;
            const initialIsMerged = isMerged || 'Entangled';
            const initialShapeCode = shapeCode || 'CD';
    
            // Call handleUpdate with the initial values
            handleUpdate(initialFrameId, initialIsMerged, initialShapeCode);
        }
    }, [selectedPhoto, selectedDiptychIdCode, FrameId, isMerged, shapeCode]);
    

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
// Reset updateNeeded after updating
setUpdateNeeded(false);
};

// Batch update function
const handleUpdate = (newFrameId, newIsMerged, newShapeCode) => {
    setFrameId(newFrameId);
    setIsMerged(newIsMerged);
    setShapeCode(newShapeCode);
    setUpdateNeeded(true); // Set flag to indicate update is needed
};

// Button handlers
const handleFrameIdChange = () => handleUpdate(FrameId === 1 ? 2 : 1, isMerged, shapeCode);
const handleToggleMergeStatus = () => handleUpdate(FrameId, isMerged === 'Entangled' ? 'Fused' : 'Entangled', shapeCode);
const handleSwapShape = () => handleUpdate(FrameId, isMerged, swapMapping[shapeCode] || shapeCode);
const handleRotateShape = () => handleUpdate(FrameId, isMerged, rotateMapping[shapeCode] || shapeCode);

useEffect(() => {
    // Update DiptychIdCode when necessary
    if (updateNeeded) {
        updateDiptychIdCode();
    }
}, [updateNeeded]);



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
                photoId={selectedPhoto?.photoID}
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