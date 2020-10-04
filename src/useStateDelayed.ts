import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useStateDelayed<S>(
  initialState: S | (() => S),
  watchInput: Boolean,
  defaultState?: S | (() => S)
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (!loaded && watchInput) {
      setState(initialState);
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchInput, loaded]);

  function updateState(value) {
    setState(value);
    setLoaded(true);
  }

  return [state, updateState];
}

export default useStateDelayed;
