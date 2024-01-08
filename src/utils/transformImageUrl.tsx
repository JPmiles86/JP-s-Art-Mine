// transformImageUrl.tsx

import React, { useEffect, useState } from 'react';
import { imageUrlToDataUrl } from './imageUtils';

// HOC to wrap SVG components
const transformImageUrl = (WrappedComponent: React.FC<{ dataUrl: string | null }>) => {
  return (props: any) => {
    console.log("Transforming Image URL for: ", props.dataUrl);
    const { imageUrl } = props;
    const [dataUrl, setDataUrl] = useState<string | null>(null);

    useEffect(() => {
      if (imageUrl) {
        imageUrlToDataUrl(imageUrl)
          .then((dataUrl) => {
            console.log("Data URL set: ", dataUrl);
            setDataUrl(dataUrl);
          })
          .catch((error) => {
            console.error('Error converting image to Data URL', error);
          });
      }
    }, [imageUrl]);

    if (!dataUrl) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} dataUrl={dataUrl} />;
  };
};

export default transformImageUrl;
