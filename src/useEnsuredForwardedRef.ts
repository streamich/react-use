import { forwardRef, MutableRefObject, useEffect, useRef } from 'react';

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

export const ensuredForwardRef: typeof forwardRef = (render) => {
  return forwardRef((props, ref) => {
    const ensuredRef = useEnsuredForwardedRef(ref as MutableRefObject<any>);
    return render(props, ensuredRef);
  });
};
