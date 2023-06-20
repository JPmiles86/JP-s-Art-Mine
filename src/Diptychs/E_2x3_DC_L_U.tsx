 // E_2x3_DC_L_U.tsx
 import React from 'react';
 import useStore from '../screens/store';
 
 const E_2x3_DC_L_U = () => {
   const { selectedPhoto } = useStore();
   const imageUrl = selectedPhoto ? `http://localhost:4000/images${selectedPhoto.imagePath ? selectedPhoto.imagePath.slice(selectedPhoto.imagePath.indexOf('originals') + 'originals'.length) : ''}` : '';
 
   if (!imageUrl) {
     return <div>Loading...</div>;
   }
 
   return (
       <svg viewBox="0 0 610 200" preserveAspectRatio="xMidYMid meet">
         <image href={imageUrl} x="-50" y="-100" height="300" width="300" transform="translate(200,0) scale(-1, 1) rotate(270,100,100)" preserveAspectRatio="xMidYMid meet" />
         <image href={imageUrl} x="250" y="10" height="300" width="300" transform="rotate(270,400,100)" preserveAspectRatio="xMidYMid meet" />
       </svg>
   );
 };
 
 export default E_2x3_DC_L_U;