// App.tsx 
import React, { useEffect, useRef, useState } from 'react';
import ScrollContext from './ScrollContext';  
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './screens/Landing';
import ImageGrid from './screens/ImageGrid';
import ExhibitionSpace from './screens/ExhibitionSpace';
import Inquire from './screens/Inquire';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useStore from './screens/store';  // Import useStore

const App: React.FC = () => {
  const scrollableElement = useRef<HTMLDivElement>(null);
  const { loadMorePhotos } = useStore();  // Get `loadMorePhotos` from the store

  const handleScroll = () => {
    const current = scrollableElement.current;
    if (!current) return;
  
    const { scrollTop, scrollHeight, clientHeight } = current;
    const isBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight * 0.9;
    
    console.log('Scroll position:', scrollTop, 'Scroll height:', scrollHeight, 'Client height:', clientHeight, 'Is bottom:', isBottom);
  
    if (isBottom && scrollTop > 0) {
      loadMorePhotos();
    }
  };   

  useEffect(() => {
    const current = scrollableElement.current;
    if (current) {
      current.addEventListener('scroll', handleScroll);
      return () => current.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div ref={scrollableElement} style={{ height: '100vh', overflow: 'auto' }}>
      <Router>
      <Container maxWidth="lg" style={{margin: '0 auto'}}>
        <ScrollContext.Provider value={{ handleScroll }}> 
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/:filter" element={<ImageGrid />} />
            <Route path="/:filter/:photoID" element={<ExhibitionSpace />} />
            <Route path="/:filter/:photoID/inquire" element={<Inquire />} />
            {/* Other routes go here */}
            </Routes>
          </ScrollContext.Provider>
        </Container>
      </Router>
    </div>
  );
};

export default App;