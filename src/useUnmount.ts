import useEffectOnce from './useEffectOnce'

const useUnmount = (fn: () => void | undefined) => {
  useEffectOnce(() => fn);
};

export default useUnmount;
