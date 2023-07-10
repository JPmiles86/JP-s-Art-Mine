// ScrollContext.tsx
import React from 'react';

const ScrollContext = React.createContext({
  handleScroll: () => {},
});

export default ScrollContext;