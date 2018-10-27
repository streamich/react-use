import {useEffect} from './react';

const useMount = (mount) => {
  useEffect(() => {
    if (mount) mount();
  }, []);
};

export default useMount;
