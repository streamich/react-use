import { useState, useCallback } from 'react';

export function use01(initValue: 0 | 1 = 0) {
  const [v, setV] = useState(initValue);

  const toggle = useCallback(() => {
    setV((oldV) => Number(!oldV) as typeof v);
  }, []);

  return [v, toggle, setV] as const;
}
