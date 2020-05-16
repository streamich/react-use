/* eslint-disable */
import writeText from 'copy-to-clipboard';
import { useCallback } from 'react';
import useMountedState from './useMountedState';
import useSetState from './useSetState';

export interface CopyToClipboardState {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
}

const useCopyToClipboard = (): [CopyToClipboardState, (value: string) => void] => {
  const isMounted = useMountedState();
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

      if (!isMounted()) {
        return;
      }

      const noUserInteraction = writeText(value);

      setState({
        value,
        error: undefined,
        noUserInteraction,
      });
    } catch (error) {
      if (!isMounted()) {
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
