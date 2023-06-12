import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useStore from './store';
import Diptych from './Diptych';

const Inquiry: React.FC = () => {
  const { photoID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedImage, selectedImage, sortedImages } = useStore();
  const currentFilter = location.pathname.split('/')[1];

  React.useEffect(() => {
    if (photoID) {
      setSelectedImage(photoID);
    }
  }, [photoID, setSelectedImage]);

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
          {/* display the selected artwork */}
          <Diptych />
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default Inquiry;
