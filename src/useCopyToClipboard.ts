import {useCallback} from 'react';
import useSetState from './useSetState'
import useRefMounted from './useRefMounted';
import * as writeText from 'copy-to-clipboard';

export interface CopyToClipboardState {
  value?: string,
  noUserInteraction: boolean,
  error?: Error,
}

const useCopyToClipboard = (): [CopyToClipboardState, (value: string) => void] => {
  const mounted = useRefMounted();
  const [state, setState] = useSetState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true
  });

  const copyToClipboard = useCallback((value) => {
    try {
      if (!value) {
        throw new Error('No value to copy to clipboard')
      }

      if (typeof value !== "string") {
        throw new Error(`Cannot copy typeof ${typeof value} to clipboard, must be a string`);
      }

      const noUserInteraction = writeText(value);
      if (!mounted.current) return;

      setState({
        value,
        error: undefined,
        noUserInteraction
      });
    } catch (error) {
      if (!mounted.current) return;

      setState({
        value: undefined,
        error,
        noUserInteraction: true
      });
    }
  }, []);

  return [state, copyToClipboard];
}

export default useCopyToClipboard;
