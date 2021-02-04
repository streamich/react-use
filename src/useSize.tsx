import * as React from 'react';
import { isBrowser, off, on } from './misc/util';

const { useState, useEffect, useRef } = React;

const DRAF = (callback: () => void) => setTimeout(callback, 35);

export type Element = ((state: State) => React.ReactElement<any>) | React.ReactElement<any>;

export interface State {
  width: number;
  height: number;
}

const useSize = (
  element: Element,
  { width = Infinity, height = Infinity }: Partial<State> = {}
): [React.ReactElement<any>, State] => {
  if (!isBrowser) {
    return [
      typeof element === 'function' ? element({ width, height }) : element,
      { width, height },
    ];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<State>({ width, height });

  if (typeof element === 'function') {
    element = element(state);
  }

  const style = element.props.style || {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef<HTMLIFrameElement | null>(null);
  let window: Window | null = null;
  const setSize = () => {
    const iframe = ref.current;
    const size = iframe
      ? {
          width: iframe.offsetWidth,
          height: iframe.offsetHeight,
        }
      : { width, height };

    setState(size);
  };
  const onWindow = (windowToListenOn: Window) => {
    on(windowToListenOn, 'resize', setSize);
    DRAF(setSize);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const iframe: HTMLIFrameElement | null = ref.current;

    if (!iframe) {
      // iframe will be undefined if component is already unmounted
      return;
    }

    if (iframe.contentWindow) {
      window = iframe.contentWindow!;
      onWindow(window);
    } else {
      const onLoad = () => {
        on(iframe, 'load', onLoad);
        window = iframe.contentWindow!;
        onWindow(window);
      };

      off(iframe, 'load', onLoad);
    }

    return () => {
      if (window && window.removeEventListener) {
        off(window, 'resize', setSize);
      }
    };
  }, []);

  style.position = 'relative';

  const sized = React.cloneElement(
    element,
    { style },
    ...[
      React.createElement('iframe', {
        ref,
        style: {
          background: 'transparent',
          border: 'none',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: -1,
        },
      }),
      ...React.Children.toArray(element.props.children),
    ]
  );

  return [sized, state];
};

export default useSize;
