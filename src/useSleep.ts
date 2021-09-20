import { useRef, useEffect, useCallback } from 'react';

export default function useSleep() {
    const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  
    useEffect(() => {
      return () => {
        timeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }, []);
  
    return useCallback((time: number) => {
      return new Promise<void>((resolve) => {
        const timeoutId = setTimeout(() => {
          timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutId);
          resolve();
        }, time);
        timeoutIdsRef.current.push(timeoutId);
      });
    }, []);
  }
  