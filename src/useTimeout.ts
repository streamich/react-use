import useTimeoutFn from './useTimeoutFn.js';
import useUpdate from './useUpdate.js';

export type UseTimeoutReturn = [() => boolean | null, () => void, () => void];

export default function useTimeout(ms: number = 0): UseTimeoutReturn {
  const update = useUpdate();

  return useTimeoutFn(update, ms);
}
