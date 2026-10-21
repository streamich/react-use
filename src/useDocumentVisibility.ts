import { useEffect, useState } from 'react';

const useDocumentVisibility = (defaultState: boolean = false) => {
  const [isVisible, setIsVisible] = useState(defaultState);

  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(document.visibilityState === 'visible');

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export default useDocumentVisibility;
