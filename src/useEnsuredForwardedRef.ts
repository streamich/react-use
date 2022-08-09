import {
  forwardRef,
  ForwardRefExoticComponent,
  MutableRefObject,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  ForwardRefRenderFunction,
  useRef,
} from "react";

export default function useEnsuredForwardedRef<T>(
  forwardedRef: MutableRefObject<T>
): MutableRefObject<T> {
  const ensuredRef = useRef(forwardedRef && forwardedRef.current);

  useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    forwardedRef.current = ensuredRef.current;
  }, [forwardedRef]);

  return ensuredRef;
}

export function ensuredForwardRef<T, P = {}>(
  Component: ForwardRefRenderFunction<T, P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  return forwardRef((props: PropsWithChildren<P>, ref) => {
    const ensuredRef = useEnsuredForwardedRef(ref as MutableRefObject<T>);
    return Component(props, ensuredRef);
  });
}
