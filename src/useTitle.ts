import { useRef } from 'react';

const useTitle = (title: string) => {
  const t = useRef<string>();

  if (t.current !== title) {
    document.title = t.current = title;
  }
};

export default useTitle;
