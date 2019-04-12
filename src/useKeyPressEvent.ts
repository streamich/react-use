import { Handler, KeyFilter } from './useKey';
import useKeyPressDefault from './useKeyPress';
import useUpdateEffect from './useUpdateEffect';

const useKeyPressEvent = (
  key: string | KeyFilter,
  keydown?: Handler | null | undefined,
  keyup?: Handler | null | undefined,
  useKeyPress = useKeyPressDefault
) => {
  const [pressed, event] = useKeyPress(key);
  useUpdateEffect(() => {
    if (!pressed && keyup) {
      keyup(event!);
    } else if (pressed && keydown) {
      keydown(event!);
    }
  }, [pressed]);
};

export default useKeyPressEvent;
