import { useEffect, useState } from 'react';
import useMount from './useMount';

interface KeyEvent extends KeyboardEvent {
  pressedKeys: string[];
  preventRepeat(): void;
}

interface Options {
  preventRepeatByDefault?: boolean;
  pressedFn?(KeyEvent): void;
  releasedFn?(KeyEvent): void;
}

// we need realtime keyPress or release state
const keyEventMap: Record<string, boolean> = {};

const useKeyboardJs = (combination: string | string[], options: Options = {}) => {
  const [state, set] = useState<[boolean, null | KeyboardEvent]>([false, null]);
  // todo add types to keyboardjs
  const [keyboardJs, setKeyboardJs] = useState<any>(null);

  useMount(() => {
    import('keyboardjs').then(setKeyboardJs);
  });

  useEffect(() => {
    if (!keyboardJs) {
      return;
    }

    const down = (event: KeyEvent) => {
      if (options.preventRepeatByDefault) {
        if (!keyEventMap[combination.toString()]) {
          options.pressedFn && options.pressedFn(event);
          keyEventMap[combination.toString()] = true;
          set([true, event]);
        }
      } else {
        set([true, event]);
        options.pressedFn && options.pressedFn(event);
      }
    };
    const up = (event: KeyEvent) => {
      set([false, event]);
      options.releasedFn && options.releasedFn(event);
      keyEventMap[combination.toString()] = false;
    };
    keyboardJs.bind(combination, down, up);

    return () => {
      keyboardJs.unbind(combination, down, up);
    };
  }, [combination, keyboardJs, options]);

  return state;
};

export default useKeyboardJs;
