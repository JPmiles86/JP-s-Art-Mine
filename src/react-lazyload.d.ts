declare module 'react-lazyload' {
    import React from 'react';
  
    interface LazyLoadProps {
      once?: boolean;
      height?: number | string;
      offset?: number;
      overflow?: boolean;
      resize?: boolean;
      scroll?: boolean;
      children?: React.ReactNode;
      placeholder?: React.ReactNode;
      unmountIfInvisible?: boolean;
      debounce?: number | boolean;
      throttle?: number | boolean;
    }
  
    class LazyLoad extends React.Component<LazyLoadProps> {}
  
    export default LazyLoad;
  }