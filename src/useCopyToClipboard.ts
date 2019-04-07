import useUpdateEffect from './useUpdateEffect';
import useRefMounted from './useRefMounted';
import {useState, useCallback, useRef} from 'react';

export type WriteText = (text: string) => Promise<void>; // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
export type UseCopyToClipboard = (text?: string, writeText?: WriteText) => [boolean, () => void];

const writeTextDefault = async (text) => {
  const element = document.createElement('textarea');
  element.value = text;
  document.body.appendChild(element);
  try {
    element.select();
    document.execCommand('copy');
  } finally {
    document.body.removeChild(element);
  }
};

const useCopyToClipboard: UseCopyToClipboard = (text = '', writeText = writeTextDefault) => {
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
    } catch (error) {
      if (!mounted.current) return;
      console.error(error);
      setCopied(false);
    }
  }, [text]);

  useUpdateEffect(() => {
    setCopied(false);
    latestText.current = text;
  }, [text]);

  return [copied, copyToClipboard];
}

export default useCopyToClipboard;
