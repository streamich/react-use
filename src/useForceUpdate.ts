import { useMemo, useReducer } from 'react';

type VoidFunction = () => void;

const reducer = (state: boolean, _action: null): boolean => !state;

const useForceUpdate = (): VoidFunction => {
  const [ , dispatch] = useReducer<boolean, null>(reducer, true);

  // Turn dispatch(required_parameter) into dispatch().
  const memoizedDispatch = useMemo(
    (): VoidFunction =>
      (): void => {
        dispatch(null);
      },
    [ dispatch ]
  );
  return memoizedDispatch;
};

export default useForceUpdate;