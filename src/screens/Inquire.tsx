// Inquire.tsx
import React from 'react';
import { Box, Typography, Grid, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useStore from './store';
import styles from './Inquire.module.css';
import Entangled from './Entangled';
import * as diptychs from '../Diptychs';

const Inquiry: React.FC = () => {
  const { photoID } = useParams<{ photoID: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { photos, fetchPhotos, setSelectedPhoto, selectedPhoto, sortedPhotos } = useStore();
  const currentFilter = location.pathname.split('/')[1];

  const [frameOption, setFrameOption] = React.useState('unframed');
  const [FrameId, setFrameId] = React.useState('1'); // default to White

  const handleFrameOptionChange = (event: SelectChangeEvent<string>) => {
    const frameOption = event.target.value;
    let FrameId;
  
    switch (frameOption) {
      case 'white':
        FrameId = '1'; // replace with the correct FrameId for white
        break;
      case 'black':
        FrameId = '2'; // replace with the correct FrameId for black
        break;
      case 'unframed':
        FrameId = '3'; // replace with the correct FrameId for unframed
        break;
      default:
        FrameId = '1'; // default to white
    }
  
    setFrameOption(frameOption);
    setFrameId(FrameId); // set the FrameId state
  };
  

  React.useEffect(() => {
    if (photos.length === 0) {
      fetchPhotos();
    }
  }, [fetchPhotos]);  

  React.useEffect(() => {
    if (photoID) {
      console.log('Selected photo:', selectedPhoto);
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
      <Typography style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }} variant="h5" gutterBottom>
        Limited Edition Collector's Prints from JP Miles
      </Typography>
      <div>
        <button className={styles.button} onClick={handlePrevPhoto} style={{ marginRight: '10px' }}>Previous Photo</button>
        <Select id="frameOption" name="frameOption" value={frameOption} onChange={handleFrameOptionChange}>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="unframed">Unframed</MenuItem>
        </Select>
        <button className={styles.button} onClick={handleNextPhoto} style={{ marginLeft: '10px' }}>Next Photo</button>
      </div>
      {selectedPhoto ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography style={{ textAlign: 'center', marginTop: '25px', marginBottom: '20px' }} variant="h5">{selectedPhoto.diptcyhName}</Typography>
            <Typography style={{ textAlign: 'center', marginTop: '25px', marginBottom: '20px' }} variant="body1">Some data about the art...</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
          <Entangled aspectRatio={selectedPhoto.aspectRatio} frameOption={frameOption} FrameId={FrameId} images={photos} />
          <div style={{ marginBottom: '25px', marginTop: '25px' }}>
            <diptychs.E_3x4_CT_P_U />
            <Typography style={{ textAlign: 'center' }}>
              Diptych: E_3x4_CT_P_U
            </Typography>
            <Typography variant="h5">{selectedPhoto.DiptychIdName}</Typography>
          </div>
          </Grid>
        </Grid>
) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default Inquiry;
