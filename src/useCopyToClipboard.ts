import * as writeText from 'copy-to-clipboard';
import { useCallback } from 'react';
import useRefMounted from './useRefMounted';
import useSetState from './useSetState';

export interface CopyToClipboardState {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
}

const useCopyToClipboard = (): [CopyToClipboardState, (value: string) => void] => {
  const mounted = useRefMounted();
  const [state, setState] = useSetState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true,
  });

  const copyToClipboard = useCallback(value => {
    try {
      if (process.env.NODE_ENV === 'development') {
        if (typeof value !== 'string') {
          console.error(`Cannot copy typeof ${typeof value} to clipboard, must be a string`);
        }
      }

      const noUserInteraction = writeText(value);

      if (!mounted.current) {
        return;
      }
      setState({
        value,
        error: undefined,
        noUserInteraction,
      });
    } catch (error) {
      if (!mounted.current) {
        return;
      }
      setState({
        value: undefined,
        error,
        noUserInteraction: true,
      });
    }
  }, []);

  return [state, copyToClipboard];
};

export default useCopyToClipboard;
