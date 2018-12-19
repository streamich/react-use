import { useState, useEffect } from 'react';

const useDebounce = (fn: () => any, ms: number = 0, args: Array<any> = []) => {
  const [timeout, setTimeoutVar] = useState<any>(null);

  useEffect(() => {
    // if args change then clear timeout
    clearTimeout(timeout);
    const t = setTimeout(fn.bind(null, args), ms);
    setTimeoutVar(t);
  }, args);
};

export default useDebounce;
