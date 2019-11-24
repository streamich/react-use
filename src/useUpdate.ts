import { useCallback, useState } from 'react';

const incrementParameter = (num: number): number => ++num;

const useUpdate = () => {
  const [, setState] = useState(0);
  // useCallback with empty deps as we only want to define updateCb once
  return useCallback(() => setState(incrementParameter), []);
};

export default useUpdate;
