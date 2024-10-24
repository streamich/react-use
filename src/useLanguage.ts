import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { isDocument } from './misc/util';

function useLanguage() {
  const [lang, setLangState] = useState<string>(document.documentElement.lang);

  const setLang: Dispatch<SetStateAction<string>> = (action) => {
    if (typeof action === 'function') {
      document.documentElement.lang = action(lang);
    } else {
      document.documentElement.lang = action;
    }
  };

  useEffect(() => {
    const handler = () => {
      setLangState(document.documentElement.lang);
    };

    const observer = new MutationObserver(handler);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  return [lang, setLang] as const;
}

export default typeof isDocument
  ? useLanguage
  : () => ['', (_action: SetStateAction<string>) => {}] as const;
