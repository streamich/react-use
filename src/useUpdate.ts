import { useState, useCallback } from 'react';

const useUpdate = () => {
  const [, setState] = useState(0);
  // useCallback with empty deps as we only want to define updateCb once
  const updateCb = useCallback(() => setState(cnt => cnt + 1), []);
  return updateCb;
};

export default useUpdate;
