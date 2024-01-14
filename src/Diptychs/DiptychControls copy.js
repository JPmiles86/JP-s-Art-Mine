 // my-gallery/src/Diptychs/DiptychControls.js

 import React from 'react';
 import DownloadButton from './DownloadButton';
 import { LayoutSpecs } from './LayoutSpecs'; // Adjust the path if necessary
 import buttonStyles from '../screens/ButtonStyles.module.css';
 
 const DiptychControls = ({
     FrameId, 
     setFrameId, 
     isMerged,
     toggleMergeStatus, 
     swapShape, 
     rotateShape, 
     navigateToInquiry,
     photoId, 
     DiptychIdCode, 
     fabricCanvasRef,
     layoutSpecs,
     areShapesVisible,
     toggleShapesVisibility,
     children
 }) => {
     return (
         <div className={buttonStyles.buttonContainer}>
             <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={() => setFrameId(FrameId === 1 ? 2 : 1)}>Frame in {FrameId === 1 ? 'Black' : 'White'}</button>
             <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={toggleMergeStatus}>{isMerged === 'entangled' ? 'Merge' : 'Unmerge'}</button>
             <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={swapShape}>Swap</button>
             <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={rotateShape}>Rotate</button>
             <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={toggleShapesVisibility}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}</button>
             <button className={`${buttonStyles.button} ${buttonStyles.small}`} onClick={navigateToInquiry}>Inquire</button>
             <DownloadButton
                 photoId={photoId}
                 DiptychIdCode={DiptychIdCode}
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
 