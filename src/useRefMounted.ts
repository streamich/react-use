import {useRef, useEffect, RefObject} from 'react';

const useRefMounted = (): RefObject<boolean> => {
  const refMounted = useRef<boolean>(false);

  useEffect(() => {
    refMounted.current = true;

    return () => {
      refMounted.current = false;
    };
  });

  return refMounted;
};

export default useRefMounted;
