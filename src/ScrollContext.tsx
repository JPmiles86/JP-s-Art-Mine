// ScrollContext.tsx
import React from 'react';

const ScrollContext = React.createContext({
  handleScroll: () => {},
  scrollToTop: () => {}, 
});

export default ScrollContext;