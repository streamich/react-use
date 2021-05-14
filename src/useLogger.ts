import useEffectOnce from './useEffectOnce.js';
import useUpdateEffect from './useUpdateEffect.js';

const useLogger = (componentName: string, ...rest) => {
  useEffectOnce(() => {
    console.log(`${componentName} mounted`, ...rest);
    return () => console.log(`${componentName} unmounted`);
  });

  useUpdateEffect(() => {
    console.log(`${componentName} updated`, ...rest);
  });
};

export default useLogger;
