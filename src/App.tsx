// my-gallery/src/App.tsx
import React, { useEffect, useRef } from 'react';
import ScrollContext from './ScrollContext';  
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './screens/Landing';
import ImageGrid from './screens/ImageGrid';
import ExhibitionSpace from './screens/ExhibitionSpace';
import Inquire from './screens/Inquire';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useStore from './utils/store'; 
import smoothscroll from 'smoothscroll-polyfill';
import TopNavBar from './components/layout/TopNavBar';
import { AuthProvider } from './contexts/AuthContext';
import ResetPassword from './pages/auth/ResetPassword';

// kick off the polyfill!
smoothscroll.polyfill();

const AppContent: React.FC = () => {
  const scrollableElement = useRef<HTMLDivElement>(null);
  const { loadMorePhotos } = useStore();  // Get `loadMorePhotos` from the store
  const location = useLocation();
  const isResetPasswordPage = location.pathname === '/reset-password';

  const handleScroll = () => {
    const current = scrollableElement.current;
    if (!current) return;
    const { scrollTop, scrollHeight, clientHeight } = current;
    const isBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight * 0.9;
    if (isBottom && scrollTop > 0) {
      loadMorePhotos();
    }
  };   

  const scrollToTop = () => {
    const current = scrollableElement.current;
    if (current) {
      current.scrollTo({ top: 0, behavior: 'auto' });
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
      {!isResetPasswordPage && <TopNavBar />}
      <Container maxWidth="lg" style={{margin: '0 auto'}}>
        <ScrollContext.Provider value={{ handleScroll, scrollToTop }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/:filter" element={<ImageGrid />} />
            <Route path="/:filter/:photoID" element={<ExhibitionSpace />} />
            <Route path="/:filter/:photoID/inquire" element={<Inquire />} />
            {/* Other routes go here */}
          </Routes>
        </ScrollContext.Provider>
      </Container>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;