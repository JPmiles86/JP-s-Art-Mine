// my-gallery/src/Diptychs/useDiptychInfo.js

import { useState, useEffect } from 'react';

const useDiptychInfo = (diptychIdCode) => {
  const [diptychInfo, setDiptychInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiptychInfo = async () => {
      try {
        const response = await fetch(`/api/diptychsvgs/${diptychIdCode}`);
        const data = await response.json();
        setDiptychInfo(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (diptychIdCode) {
      fetchDiptychInfo();
    }
  }, [diptychIdCode]);

  return { diptychInfo, isLoading, error };
};

export default useDiptychInfo;