import { useEffect, useState } from 'react';

export const useDevicePixelRatio = () => {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const updatePixelRatio = () => {
      setRatio(window.devicePixelRatio);
    };
    const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
    const media = matchMedia(mqString);
    media.addEventListener('change', updatePixelRatio);
    return () => {
      media.removeEventListener('change', updatePixelRatio);
    };
  }, [window.devicePixelRatio]);

  return { ratio };
};
