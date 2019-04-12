import { useCallback, useState } from 'react';

export type UseToggle = (
  state: boolean
) => [
  boolean, // state
  (nextValue?: boolean) => void // toggle
];

const useToggle: UseToggle = state => {
  const [value, setValue] = useState<boolean>(state);

  const toggle = useCallback(
    (nextValue?: boolean) => {
      if (typeof nextValue !== 'undefined') {
        setValue(!!nextValue);
        return;
      }

      setValue(newValue => !newValue);
    },
    [setValue]
  );

  return [value, toggle];
};

export default useToggle;
