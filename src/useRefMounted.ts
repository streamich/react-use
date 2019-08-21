import { RefObject, useEffect, useRef } from 'react';

/**
 * @deprecated This hook is obsolete, use `useMountedState` instead
 */
const useRefMounted = (): RefObject<boolean> => {
  const refMounted = useRef<boolean>(false);

  useEffect(() => {
    refMounted.current = true;

    return () => {
      refMounted.current = false;
    };
  }, []);

  return refMounted;
};

/**
 * @deprecated This hook is obsolete, use `useMountedState` instead
 */
export default useRefMounted;
