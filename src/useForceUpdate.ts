import { useCallback, useState } from 'react';

const useForceUpdate = () => {
  const [, setState] = useState<any>();
  const forceUpdate = useCallback(() => setState({}), []);

  return forceUpdate;
};

export default useForceUpdate;
