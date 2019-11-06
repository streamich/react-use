import { useRef } from 'react';

function useTitle(title: string) {
  const t = useRef<string>();

  if (t.current !== title) {
    document.title = t.current = title;
  }
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
