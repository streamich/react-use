import * as React from 'react';
const { useEffect } = React;
import useKeyPress from './useKeyPress';

type KeyPressCallback = ((targetKey: string) => void) | undefined | null;

const useKeyPressEvent = (
  targetKey: string,
  onKeyup: KeyPressCallback = undefined,
  onKeydown: KeyPressCallback = undefined
) => {
  const useKeyboardJS: boolean = targetKey.length > 1;
  const pressedKeys: boolean = useKeyPress(targetKey, {
    useKeyboardJS,
  });

  if (onKeydown === undefined) {
    onKeydown = onKeyup;
    onKeyup = null;
  }

  useEffect(
    () => {
      if (!pressedKeys) {
        if (onKeyup) onKeyup(targetKey);
        return;
      }

      if (onKeydown) onKeydown(targetKey);
    },
    [pressedKeys]
  );
};

export default useKeyPressEvent;
