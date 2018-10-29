import * as React from 'react';
import useRenderProp from './useRenderProp';

const useAdopt = <T extends {[key: string]: any[]}>(map: {[key in keyof T]: React.ReactElement<any>}): [React.ReactElement<any>, T] => {
  const keys = Object.keys(map);
  const fragments: React.ReactElement<any>[] = [];
  const result: T = {} as T;

  keys.sort();
  for (const key of keys) {
    const [fragment, value] = useRenderProp(map[key]);
    fragments.push(React.cloneElement(fragment, {key}));
    result[key] = value;
  }

  return [React.createElement(React.Fragment, null, ...fragments), result];
};

export default useAdopt;
