import { RefObject, useEffect, useState } from 'react';
import { off, on } from './misc/util';

// kudos: https://usehooks.com/
const useHoverDirty = (ref: RefObject<Element>, enabled: boolean = true) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('useHoverDirty expects a single ref argument.');
    }
  }

  const [value, setValue] = useState(false);

  useEffect(() => {
    const onMouseOver = () => setValue(true);
    function onMouseOut(this: any, event: any) {
      const related = event.relatedTarget;
      const target = this;
      if (!related || (related !== target && !target.contains(related))) {
        setValue(false); 
      }
    }

    if (enabled && ref && ref.current) {
      on(ref.current, 'mouseover', onMouseOver);
      on(ref.current, 'mouseout', onMouseOut);
    }

    // fixes react-hooks/exhaustive-deps warning about stale ref elements
    const { current } = ref;

    return () => {
      if (enabled && current) {
        off(current, 'mouseover', onMouseOver);
        off(current, 'mouseout', onMouseOut);
      }
    };
  }, [enabled, ref, ref.current]);

  return value;
};

export default useHoverDirty;
