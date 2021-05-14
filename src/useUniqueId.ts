import { useEffect, useRef, useState } from 'react';

// A map of prefixes to a counter.
let counts: Record<string, number> = {};

// Returns a unique string for a given identifier by incrementing a counter.
function uniqueId(prefix: string): string {
  if (!counts[prefix]) {
    counts[prefix] = 0;
  }

  const id = ++counts[prefix];

  return `${prefix}-${id}`;
}

export default function useUniqueId(prefix: string = 'id', deps: ReadonlyArray<any> = []): string {
  const [uid, setUid] = useState<string>(() => uniqueId(prefix));

  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setUid(uniqueId(prefix));
  }, [...deps, prefix]);

  return uid;
}
