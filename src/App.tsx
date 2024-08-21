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
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import Purchase from './screens/Purchase';
import RequestAccess from './screens/RequestAccess';
import Success from './screens/Success';
import ReferAFriend from './screens/ReferAFriend'; 
import ReferralSignUp from './screens/ReferralSignUp';

// kick off the polyfill!
smoothscroll.polyfill();

const AppContent: React.FC = () => {
  const scrollableElement = useRef<HTMLDivElement>(null);
  const { loadMorePhotos } = useStore();
  const location = useLocation();
  const isResetPasswordPage = location.pathname === '/reset-password';

  const handleScroll = () => {
    const current = scrollableElement.current;
    if (!current) return;
    const { scrollTop, scrollHeight, clientHeight } = current;
    const isBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight * 0.9;
    if (isBottom && scrollTop > 0 && location.pathname.startsWith('/ImageGrid')) {
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
      {!isResetPasswordPage && <div className="nav-bar"><TopNavBar /></div>}
      <Container maxWidth="lg" style={{margin: '0 auto'}}>
        <ScrollContext.Provider value={{ handleScroll, scrollToTop }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/refer-a-friend" element={<ReferAFriend />} /> 
            <Route path="/register" element={<ReferralSignUp />} />
            <Route path="/:filter" element={<ImageGrid />} />
            <Route path="/:filter/:photoID" element={<ExhibitionSpace />} />
            <Route path="/:filter/:photoID/inquire" element={<Inquire />} />
            <Route path="/:filter/:photoID/purchase/:artworkID" element={<Purchase />} />
            <Route path="/:filter/:photoID/request/:artworkID" element={<RequestAccess />} />
            <Route path="/:filter/:photoID/success/:artworkID" element={<Success />} />
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
