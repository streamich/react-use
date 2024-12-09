import {
  forwardRef,
  ForwardRefExoticComponent,
  MutableRefObject,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  RefCallback,
  RefForwardingComponent,
  useEffect,
  useRef,
} from 'react';

export default function useEnsuredForwardedRef<T>(
  forwardedRef: MutableRefObject<T | null> | RefCallback<T> | null
): MutableRefObject<T> {
  const initialValue = forwardedRef && 'current' in forwardedRef ? forwardedRef.current : null;
  const ensuredRef = useRef(initialValue);

  useEffect(() => {
    if (typeof forwardedRef === 'function') {
      forwardedRef(ensuredRef.current);
    } else if (forwardedRef) {
      forwardedRef.current = ensuredRef.current;
    }
  }, [forwardedRef]);

  return ensuredRef as MutableRefObject<T>;
}

export function ensuredForwardRef<T, P = {}>(
  Component: RefForwardingComponent<T, P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  return forwardRef((props: PropsWithChildren<P>, ref) => {
    const ensuredRef = useEnsuredForwardedRef(ref as MutableRefObject<T>);
    return Component(props, ensuredRef);
  });
}
