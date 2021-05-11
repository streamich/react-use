import { Dispatch, SetStateAction, useCallback, useLayoutEffect, useRef, useState } from "react";

export type StorageParserOptions<T> =
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };

export type StorageTuple<T> = [state: T, set: Dispatch<SetStateAction<T>>, remove: () => void];

export interface UseStorage {
  <T>(key: string, initialValue?: undefined, options?: StorageParserOptions<T>): StorageTuple<
    T | undefined
  >;
  <T>(key: string, initialValue: T, options?: StorageParserOptions<T>): StorageTuple<T>;
}

export interface MakeUseStorage {
  (storage: Storage): UseStorage;
}

const makeUseStorage: MakeUseStorage = (storage: Storage) => <T>(
  key: string,
  initialValue?: T,
  options?: StorageParserOptions<T>
): StorageTuple<T | undefined> => {
  if (!key) {
    throw new Error("The storage key may not be falsy");
  }

  const deserializer: (x: string) => T = options
    ? options.raw
      ? (value) => value
      : options.deserializer
    : JSON.parse;

  const serializer: (x: T) => string = options
    ? options.raw
      ? (x) => (typeof x === "string" ? x : JSON.stringify(x))
      : options.serializer
    : JSON.stringify;

  const initializer = useRef((key: string) => {
    const storageValue = storage.getItem(key);

    if (storageValue !== null) {
      return deserializer(storageValue);
    }

    if (typeof initialValue !== "undefined") {
      storage.setItem(key, serializer(initialValue));
      return initialValue;
    }

    return void 0;
  });

  const [state, setState] = useState<T | undefined>(() => initializer.current(key));

  useLayoutEffect(() => setState(initializer.current(key)), [key]);

  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (stateOrGetState) => {
      const newState =
        typeof stateOrGetState === "function"
          ? (stateOrGetState as Function)(state)
          : stateOrGetState;

      if (typeof newState === "undefined") {
        return;
      }

      const serialized = serializer(newState);

      storage.setItem(key, serialized);
      setState(deserializer(serialized));
    },
    [key, setState]
  );

  const remove = useCallback(() => {
    storage.removeItem(key);
    setState(initialValue);
  }, [key, setState]);

  return [state, set, remove];
};

export default makeUseStorage;
