import {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  MutableRefObject,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  RefForwardingComponent,
  useEffect,
  useRef,
} from 'react';

const assignRef = <T>(ref: ForwardedRef<T>, value: T | null) => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
};

export default function useEnsuredForwardedRef<T>(
  forwardedRef: ForwardedRef<T>
): MutableRefObject<T> {
  const ensuredRef = useRef<T>(
    (forwardedRef && typeof forwardedRef !== 'function' ? forwardedRef.current : null) as T
  );

  useEffect(() => {
    assignRef(forwardedRef, ensuredRef.current);

    return () => assignRef(forwardedRef, null);
  }, [forwardedRef]);

  return ensuredRef;
}

export function ensuredForwardRef<T, P = {}>(
  Component: RefForwardingComponent<T, P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  return forwardRef((props: PropsWithChildren<P>, ref) => {
    const ensuredRef = useEnsuredForwardedRef(ref);
    return Component(props, ensuredRef);
  });
}
