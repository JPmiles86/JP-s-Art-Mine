import React from 'react';

const ImageOrderContext = React.createContext({
  imageOrder: [],
  setImageOrder: () => {},
});

export default ImageOrderContext;
