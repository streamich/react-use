import { useRef, useState } from 'react';

const incrementParameter = (num: number): number => ++num % 1_000_000;

const useUpdate = () => {
  const [, setState] = useState(0);
  // define updateCb only once
  return useRef(() => setState(incrementParameter)).current;
};

export default useUpdate;
