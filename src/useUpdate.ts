import { useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState(0);
  return () => setState(cnt => cnt + 1);
};

export default useUpdate;
