import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useStore from './store';
import * as diptychs from '../Diptychs';

const Inquiry: React.FC = () => {
  const { photoID } = useParams<{ photoID: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { photos, fetchPhotos, setSelectedPhoto, selectedPhoto, sortedPhotos } = useStore();
  const currentFilter = location.pathname.split('/')[1];

  React.useEffect(() => {
    if (photos.length === 0) {
      fetchPhotos();
    }
  }, [photos, fetchPhotos]);

  React.useEffect(() => {
    if (photoID) {
      setSelectedPhoto(photoID);
    }
  }, [photoID, setSelectedPhoto, photos]); // added photos as dependency

  const currentIndex = sortedPhotos.findIndex(photo => photo.photoID === photoID);

  const handlePrevPhoto = () => {
    if (currentIndex > 0) {
      const previousPhoto = sortedPhotos[currentIndex - 1];
      navigate(`/${currentFilter}/${previousPhoto.photoID}/inquire`);
    }
  };

  const handleNextPhoto = () => {
    if (currentIndex < sortedPhotos.length - 1) {
      const nextPhoto = sortedPhotos[currentIndex + 1];
      navigate(`/${currentFilter}/${nextPhoto.photoID}/inquire`);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Thanks for inquiring about purchasing my art, which Diptych are you interested in purchasing?
      </Typography>
      <div>
        <button onClick={handlePrevPhoto} style={{ marginRight: '10px' }}>Previous Photo</button>
        <button onClick={handleNextPhoto} style={{ marginLeft: '10px' }}>Next Photo</button>
      </div>
      {selectedPhoto ? (
        <Box>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_3x4_CD_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_CD_P_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_CD_P_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_CD_P_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_CT_P_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_CT_P_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_3x4_CT_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_CT_P_W
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
            <diptychs.E_3x4_SD_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_SD_P_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_2x3_ST_P_B />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_2x3_ST_P_B
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_3x4_ST_P_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_ST_P_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.F_3x4_DC_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: F_3x4_DC_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_3x4_DS_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_DS_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_3x4_TC_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_TC_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_3x4_TS_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_TS_L_W
            </Typography>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <diptychs.E_3x4_DC_L_W />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_DC_L_W
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
