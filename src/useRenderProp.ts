import * as React from 'react';
import createMemo from './createMemo';

const {useState, useCallback} = React;

const useRenderProp = (element: React.ReactElement<any>): [React.ReactElement<any>, any[]] => {
  if (process.env.NODE_ENV !== 'production') {
    if (!React.isValidElement(element)) {
      throw new TypeError(
        'useRenderProp element to be a valid React element ' +
        'such as <MyRenderProp />.'
      );
    }
  }

  const [state, setState] = useState<any[]>([]);
  const useSetState = createMemo((...args) => setState(args));
  const render = useCallback((...args) => {
    useSetState(...args);
    return null;
  }, []);
  const cloned = React.cloneElement(element, {
    render,
    children: render,
  });

  return [cloned, state];
};

export default useRenderProp;
