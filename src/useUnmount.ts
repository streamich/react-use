import {useEffect} from 'react';

const useUnmount = (unmount) => {
  useEffect(() => () => {
    if (unmount) unmount();
  }, []);
};

export default useUnmount;
