import {useEffect, useState} from 'react';

// kudos: https://usehooks.com/
const useHoverDirty = (ref) => {
  if (process.env.NODE_ENV !== 'production') {
    if ((typeof ref !== 'object') || (typeof ref.current === 'undefined')) {
      throw new TypeError('useHoverDirty expects a single ref argument.');
    }
  }

  const [value, setValue] = useState(false);

  useEffect(() => {
    const onMouseOver = () => setValue(true);
    const onMouseOut = () => setValue(false);

    if (ref && ref.current) {
      ref.current.addEventListener('mouseover', onMouseOver);
      ref.current.addEventListener('mouseout', onMouseOut);
    }

    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('mouseover', onMouseOver);
        ref.current.removeEventListener('mouseout', onMouseOut);
      }
    };
  }, []);

  return value;
}

export default useHoverDirty;
