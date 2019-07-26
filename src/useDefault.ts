import { useState } from 'react';

const useDefault = (defaultValue, initialValue): [any, (nextValue?: any) => void] => {
  const [value, setValue] = useState(initialValue);

  if (value === undefined || value === null) {
    return [defaultValue, setValue];
  }

  return [value, setValue];
};

export default useDefault;
