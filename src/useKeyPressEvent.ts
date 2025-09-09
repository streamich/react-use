import useKeyDefault, { Handler, KeyFilter } from './useKey';

const useKeyPressEvent = (
  key: KeyFilter,
  keydown?: Handler | null | undefined,
  keyup?: Handler | null | undefined,
  useKey = useKeyDefault
) => {
  useKey(key, (event) => keydown?.(event), { event: 'keydown' });
  useKey(key, (event) => keyup?.(event), { event: 'keyup' });
};

export default useKeyPressEvent;
