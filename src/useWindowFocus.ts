import { useEffect, useState } from 'react';

const useWindowFocus = (defaultState: boolean = false) => {
  const [isFocused, setIsFocused] = useState(defaultState);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return isFocused;
};

export default useWindowFocus;
