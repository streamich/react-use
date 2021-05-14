import useEffectOnce from './useEffectOnce.js';

const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};

export default useMount;
