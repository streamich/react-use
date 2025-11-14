import { useRef } from 'react';

const useWillMount = (fn: () => void) => {
  const willMount = useRef(true);
  if (willMount.current) fn();
  willMount.current = false;
};

export default useWillMount;
