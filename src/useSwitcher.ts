import { useCallback, useState } from 'react';

/**
 * @param defaultValue	initial value of the switch. Default {@link false}
 * @example
 *  const [isOpen, turnIsOpenOn, turnIsOpenOff, toggleIsOpen] = useSwitcher();
 */
const useSwitcher = (defaultValue: boolean = false): readonly [boolean, () => void, () => void, () => void] => {
  const [state, setState] = useState(defaultValue);

  const turnOn = useCallback(() => setState(true), []);
  const turnOff = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState((s) => !s), []);

  return [state, turnOn, turnOff, toggle] as const;
};

export default useSwitcher;
