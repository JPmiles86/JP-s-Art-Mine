import { useState, useEffect, useMemo } from 'react';

export const useDiptychData = (aspectRatio, frameId, diptychId) => {
  const [data, setData] = useState({ diptychIdCodes: [], totalSlides: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/diptychsvgs/aspectratio/${aspectRatio}/frameid/${frameId}/diptychId/${diptychId}`);
        const jsonData = await response.json();
        setData({ diptychIdCodes: jsonData, totalSlides: jsonData.length });
      } catch (error) {
        console.error('Error fetching DiptychIdCodes:', error);
        setData({ diptychIdCodes: [], totalSlides: 0 }); // Consider setting to an error state or re-trying
      }
    };

    fetchData();
  }, [aspectRatio, frameId, diptychId]);

  return useMemo(() => data, [data]);
};
