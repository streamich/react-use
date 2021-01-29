import { useCallback, useEffect } from 'react';
import { off, on } from './misc/util';

const useBeforeUnload = (enabled: boolean | (() => boolean) = true, message?: string) => {
  const handler = useCallback(
    (event: BeforeUnloadEvent) => {
      const finalEnabled = typeof enabled === 'function' ? enabled() : true;

      if (!finalEnabled) {
        return;
      }

      event.preventDefault();

      if (message) {
        event.returnValue = message;
      }

      return message;
    },
    [enabled, message]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    on(window, 'beforeunload', handler);

    return () => off(window, 'beforeunload', handler);
  }, [enabled, handler]);
};

export default useBeforeUnload;
