import { useEffect, useState } from 'react';

export function useWorker<T = any>(worker: Worker) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    worker.addEventListener('message', (e) => {
      setData(e.data);
      setIsLoading(false);
    });
    worker.addEventListener('error', (e) => {
      setError(e.error);
      setIsLoading(false);
    });
  }, [worker]);

  return { instance: worker, data, error, isLoading };
}
