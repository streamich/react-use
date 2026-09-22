import { useEffect, useState } from 'react';
import { isBrowser, off, on } from './misc/util';

const getAllParams = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    if (!(key in result)) {
      result[key] = value;
    }
  });

  return result;
};

export type UseAllSearchParam = () => Record<string, string>;

const useAllSearchParam: UseAllSearchParam = () => {
  const location = window.location;
  const [params, setParams] = useState<Record<string, string>>(() => getAllParams(location.search));

  useEffect(() => {
    const onChange = () => {
      setParams(getAllParams(location.search));
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

  return params;
};

const useAllSearchParamServer: UseAllSearchParam = () => ({});

export default isBrowser ? useAllSearchParam : useAllSearchParamServer;
