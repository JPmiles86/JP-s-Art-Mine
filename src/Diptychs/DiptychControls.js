 // my-gallery/src/Diptychs/DiptychControls.js

 import React from 'react';
 import styles from './DiptychControls.module.css';
 import DownloadButton from './DownloadButton';
 import { LayoutSpecs } from './LayoutSpecs'; // Adjust the path if necessary
 
 const DiptychControls = ({
     frameColor, 
     setFrameColor, 
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
         <div className={styles.buttonContainer}>
             <button className={styles.button} onClick={() => setFrameColor(frameColor === 1 ? 2 : 1)}>Frame in {frameColor === 1 ? 'Black' : 'White'}</button>
             <button className={styles.button} onClick={toggleMergeStatus}>{isMerged === 'entangled' ? 'Merge' : 'Unmerge'}</button>
             <button className={styles.button} onClick={swapShape}>Swap</button>
             <button className={styles.button} onClick={rotateShape}>Rotate</button>
             <button className={styles.button} onClick={toggleShapesVisibility}> {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}</button>
             <button className={styles.button} onClick={navigateToInquiry}>Inquire</button>
             <DownloadButton
                 photoId={photoId}
                 DiptychIdCode={DiptychIdCode}
                 fabricCanvasRef={fabricCanvasRef}
                 layoutSpecs={layoutSpecs} 
                 areShapesVisible={areShapesVisible}
             />
             <div className={styles.gallerySelector}>
                 {children}
             </div>
         </div>
     );
 };
 
 export default DiptychControls;
 