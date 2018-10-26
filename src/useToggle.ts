import {useState} from './react';

export type UseToggle = (state: boolean) => [
  boolean, // state
  () => void, // toggle
  (state: boolean) => void // set
];

const useToggle: UseToggle = state => {
  const [on, set] = useState<boolean>(state);
  const toggle = () => set(!on);

  return [on, toggle, set];
};

export default useToggle;
