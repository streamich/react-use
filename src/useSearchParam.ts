import { useEffect, useState } from 'react';
import { off, on } from './misc/util';

const getValue = (search: string, param: string) => new URLSearchParams(search).get(param);

export type UseQueryParam = (param: string) => string | null;

const useSearchParam: UseQueryParam = (param) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const location = window.location;
    setValue(getValue(location.search, param))
    
    const onChange = () => {
      setValue(getValue(location.search, param));
    };

    on(window, 'popstate', onChange);
    on(window, 'pushstate', onChange);
    on(window, 'replacestate', onChange);

    return () => {
      off(window, 'popstate', onChange);
      off(window, 'pushstate', onChange);
      off(window, 'replacestate', onChange);
    };
  }, []);

  return value;
};

export default useSearchParam;
