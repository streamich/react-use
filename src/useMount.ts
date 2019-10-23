import useEffectOnce from './useEffectOnce';
import useUnmount from './useUnmount'

const useMount = (fn: (isMount?: () => boolean) => void) => {
  let isMount: boolean = true;

  useEffectOnce(() => {
    fn(() => isMount);
  });

  useUnmount(()=> {
    isMount = false
  });
};

export default useMount;
