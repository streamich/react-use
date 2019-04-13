import { useEffect } from 'react';

const useBeforeUnload = (enabled: boolean = true, message?: string) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      if (message) {
        event.returnValue = message;
      }

      return message;
    };

    window.addEventListener('beforeunload', handler);

    return () => window.removeEventListener('beforeunload', handler);
  }, [message, enabled]);
};

export default useBeforeUnload;
