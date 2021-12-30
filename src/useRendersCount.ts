import { useRef } from 'react';

export function useRendersCount(): number {
  return ++useRef(0).current;
}

export default useRendersCount;
