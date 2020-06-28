import { useState, useEffect } from 'react';

export const useImage = (src: string) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false);

  useEffect(() => {
    if (src) {
      setHasStartedInitialFetch(true);
      setHasLoaded(false);
      setHasError(false);

      const image = new Image();
      image.src = src;

      const handleError = () => {
        setHasError(true);
      };

      const handleLoad = () => {
        setHasLoaded(true);
        setHasError(false);
      };

      image.onerror = handleError;
      image.onload = handleLoad;

      return () => {
        image.removeEventListener('error', handleError);
        image.removeEventListener('load', handleLoad);
      };
    }

    return;
  }, [src]);

  return { hasLoaded, hasError, hasStartedInitialFetch };
};
