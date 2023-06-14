import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useStore from './store';
import * as diptychs from '../Diptychs';

const Inquiry: React.FC = () => {
  const { photoID } = useParams<{ photoID: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { images, fetchImages, setSelectedImage, selectedImage, sortedImages } = useStore();
  const currentFilter = location.pathname.split('/')[1];

  React.useEffect(() => {
    if (images.length === 0) {
      fetchImages();
    }
  }, [images, fetchImages]);

  React.useEffect(() => {
    if (photoID) {
      setSelectedImage(photoID);
    }
  }, [photoID, setSelectedImage, images]); // added images as dependency

  const currentIndex = sortedImages.findIndex(image => image.photoID === photoID);

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      const previousImage = sortedImages[currentIndex - 1];
      navigate(`/${currentFilter}/${previousImage.photoID}/inquire`);
    }
  };

  const handleNextImage = () => {
    if (currentIndex < sortedImages.length - 1) {
      const nextImage = sortedImages[currentIndex + 1];
      navigate(`/${currentFilter}/${nextImage.photoID}/inquire`);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Thanks for inquiring about purchasing my art, which Diptych are you interested in purchasing?
      </Typography>
      <div>
        <button onClick={handlePrevImage} style={{ marginRight: '10px' }}>Previous Image</button>
        <button onClick={handleNextImage} style={{ marginLeft: '10px' }}>Next Image</button>
      </div>
      {selectedImage ? (
        <Box>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_CD_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_CD_P_W
            </Typography>
          </div>
          <div style={{ marginBottom: '100px' }}>
            <diptychs.E_2x3_CD_P_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_CD_P_B
            </Typography>
          </div>
          <div style={{ marginBottom: '100px' }}>
            <diptychs.E_2x3_CT_P_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_CT_P_B
            </Typography>
          </div>
          <div style={{ marginBottom: '100px' }}>
            <diptychs.F_3x4_CT_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_CT_P_W
            </Typography>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_SD_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_SD_P_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_SD_P_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_SD_P_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_ST_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_ST_P_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_ST_P_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_ST_P_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_DC_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_DC_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_DS_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_DS_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_TC_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_TC_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_TS_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_TS_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_DC_L_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_DC_L_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_DS_L_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_DS_L_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_TC_L_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_TC_L_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_TS_L_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_TS_L_B
            </Typography>
          </div>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default Inquiry;
