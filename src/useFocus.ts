  
import * as React from 'react';

const { useState } = React;

const noop = () => {};

export type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;

const useFocus = (element: Element): [React.ReactElement<any>, boolean] => {
  const [state, setState] = useState(false);

  const onFocus = (originalOnFocus?: any) => (event: any) => {
    (originalOnFocus || noop)(event);
    setState(true);
  };
  const onBlur = (originalOnBlur?: any) => (event: any) => {
    (originalOnBlur || noop)(event);
    setState(false);
  };

  if (typeof element === 'function') {
    element = element(state);
  }

  const el = React.cloneElement(element, {
    onFocus: onFocus(element.props.onFocus),
    onBlur: onBlur(element.props.onBlur),
  });

  return [el, state];
};

export default useFocus;