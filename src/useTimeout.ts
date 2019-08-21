import useTimeoutFn from './useTimeoutFn';
import useUpdate from './useUpdate';

export type UseTimeoutReturn = [() => boolean | null, () => void, () => void];

export default function useTimeout(ms: number = 0): UseTimeoutReturn {
  const update = useUpdate();

  return useTimeoutFn(update, ms);
}
