import {useState, useCallback, useRef} from 'react';
import useUpdateEffect from './useUpdateEffect';
import useRefMounted from './useRefMounted';
const writeTextDefault = require('copy-to-clipboard');

export type WriteText = (text: string) => Promise<void>; // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
export interface UseCopyToClipboardOptions {
  writeText?: WriteText;
  onCopy?: (text: string) => void;
  onError?: (error: any, text: string) => void;
}
export type UseCopyToClipboard = (text?: string, options?: UseCopyToClipboardOptions) => [boolean, () => void];

const useCopyToClipboard: UseCopyToClipboard = (text = '', options) => {
  const {writeText = writeTextDefault, onCopy, onError} = (options || {}) as UseCopyToClipboardOptions;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof text !== 'string') {
      console.warn('useCopyToClipboard hook expects first argument to be string.');
    }
  }

  const mounted = useRefMounted();
  const latestText = useRef(text);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = useCallback(async () => {
    if (latestText.current !== text) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Trying to copy stale text.');
      }
      return;
    }

    try {
      await writeText(text);
      if (!mounted.current) return;
      setCopied(true);
      onCopy && onCopy(text);
    } catch (error) {
      if (!mounted.current) return;
      console.error(error);
      setCopied(false);
      onError && onError(error, text);
    }
  }, [text]);

  useUpdateEffect(() => {
    setCopied(false);
    latestText.current = text;
  }, [text]);

  return [copied, copyToClipboard];
}

export default useCopyToClipboard;
