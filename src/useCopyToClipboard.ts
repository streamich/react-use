import useUpdateEffect from './useUpdateEffect';
import {useState, useCallback} from 'react';

const copyDefault = (text) => {
  const element = document.createElement('textarea');
  element.value = text;
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
};

const useCopyToClipboard = (text: string = '', copy = copyDefault): [boolean, () => void] => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = useCallback(() => {
    copy(text);
    setCopied(true);
  }, [text]);

  useUpdateEffect(() => {
    setCopied(false);
  }, [text]);

  return [copied, copyToClipboard];
}

export default useCopyToClipboard;
