import { useCallback, useState } from 'react';

/**
 * MIN & MAX safe integers are literals due to no support in IE
 */
const minInt = -1000000000
const maxInt = 9007199254740991
const incrementParameter = (num: number): number => {
  return num !== maxInt ? (num += 1) : minInt;
}

const useUpdate = () => {
  const [, setState] = useState(minInt);
  // useCallback with empty deps as we only want to define updateCb once
  return useCallback(() => setState(incrementParameter), []);
};

export default useUpdate;
