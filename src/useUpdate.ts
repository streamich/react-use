import { useReducer } from 'react';

const updateReducer = (bool: boolean): boolean => !bool;

export default function useUpdate(): () => void {
  const [, update] = useReducer(updateReducer, false);

  return update;
}
