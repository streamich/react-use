import { useState, useMemo } from 'react';

const useConverter = (converter, initialInput) => {
  const [input, setInput] = useState(initialInput);

  const output = useMemo(() => {
    return converter(input);
  }, [converter, input]);

  return [input, setInput, output];
};

export default useConverter;
