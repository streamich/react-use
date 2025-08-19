import { useEffect } from 'react';

const useLifecycles = (mount, unmount?) => {
  useEffect(() => {
    const mountResult = mount ? mount() : undefined;

    return () => {
      if (unmount) {
        unmount(mountResult);
      }
    };
  }, []);
};

export default useLifecycles;
