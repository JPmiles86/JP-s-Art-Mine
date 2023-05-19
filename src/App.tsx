import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './screens/Landing';
import ImageGrid from './screens/ImageGrid';
import ExhibitionSpace from './screens/ExhibitionSpace';
import { create } from 'zustand';


const App: React.FC = () => {
  return (
    <>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/:filter" element={<ImageGrid />} />
            <Route path="/:filter/:photoID" element={<ExhibitionSpace />} />
            {/* Other routes go here */}
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
