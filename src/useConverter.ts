import { useState, useMemo } from 'react';

/**
 * useConverter
 * @param converter - The function that performs the conversion.
 * @param initialInput - The value that is passed when the function is first run.
 */
const useConverter = (converter, initialInput) => {
  const [input, setInput] = useState(initialInput);

  const output = useMemo(() => {
    return converter(input);
  }, [converter, input]);

  return [input, setInput, output];
};

export default useConverter;
