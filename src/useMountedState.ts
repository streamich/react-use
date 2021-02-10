import { useCallback, useEffect, useState } from 'react';

export default function useMountedState(): () => boolean {
  const [isMounted, setMounted] = useState(false);

  // This would not be necessary but is kept for signature backward-compatibility.
  const get = useCallback(() => isMounted, [isMounted]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return get;
}
