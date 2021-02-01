import { IHookStateInitialSetter, IHookStateSetAction, resolveHookState } from './misc/hookState';
import { useCallback, useEffect, useState } from 'react';

export interface IUseStorageAdapter<T> {
  get(key: string): T;

  get(key: string, done: (value: T) => void): void;

  set(key: string, value: T | string): void;

  set(key: string, value: T | string, done: () => void): void;

  remove(key: string, done: () => void);

  remove(key: string);
}

type IUseLocalStorageCommonOptions = Partial<{
  initialValueOnMount: boolean;
  initialValueStore: boolean;
}>;

export type IUseStorageOptions<T> =
  | (IUseLocalStorageCommonOptions & { rawData: true })
  | (IUseLocalStorageCommonOptions & {
      rawData?: false;
      serializer?: (value: T) => string;
      deserializer?: (value: string) => T;
    });

function useStorage<T>(
  adapter: IUseStorageAdapter<T>,
  key: string,
  initialValue?: IHookStateInitialSetter<T>,
  options: IUseStorageOptions<T> = {}
) {
  if (!key.length) {
    throw new Error('`useStorage` must be a valuable string');
  }

  if (
    !options.rawData &&
    ((options.serializer && !options.deserializer) || (!options.serializer && options.deserializer))
  ) {
    throw new Error(
      '`useStorage` must have `serializer` and `deserializer` to be set simultaneously'
    );
  }

  const serializer = !options.rawData && (options.serializer ?? JSON.stringify);
  const deserializer = !options.rawData && (options.deserializer ?? JSON.parse);

  const get = () => {
    const val = adapter.get(key) as T | string | null;

    if (val !== null) {
      return deserializer ? deserializer(val as string) : val;
    }

    const initVal = resolveHookState(initialValue);

    // if initial value store enabled and it is not undefined
    // store it
    if (options.initialValueStore && typeof initVal !== 'undefined') {
      adapter.set(key, serializer ? serializer(initVal) : initVal);
    }

    return initVal;
  };

  const [state, setState] = useState<T | undefined>(
    options.initialValueOnMount ? get() : undefined
  );

  useEffect(() => {
    if (!options.initialValueOnMount) {
      setState(get());
    }
  }, [options.initialValueOnMount]);

  const set = useCallback(
    (value: IHookStateSetAction<T>) => {
      let newVal = resolveHookState(value);

      if (typeof newVal === 'undefined') {
        return;
      }

      const serialized = serializer ? serializer(newVal) : newVal;
      adapter.set(key, serialized);
      setState(newVal);
    },
    [adapter, key, serializer]
  );

  const remove = useCallback(() => {
    adapter.remove(key);
    setState(undefined);
  }, [adapter, key]);

  return [state, set, remove];
}

export default useStorage;
