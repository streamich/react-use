import useStorage, { IUseStorageOptions } from './useStorage';
import { IHookStateInitialSetter } from './misc/hookState';

const hasLocalStorage = typeof localStorage !== 'undefined';

export const LocalStorageAdaprer = {
  get<T extends any | string>(key: string): T | null {
    try {
      if (hasLocalStorage) {
        return localStorage.getItem(key) as T;
      }

      return null;
    } catch (e) {
      return null;
    }
  },

  set(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default function useLocalStorage<T>(
  key: string,
  initialValue?: IHookStateInitialSetter<T>,
  options: IUseStorageOptions<T> = {}
) {
  return useStorage<T>(LocalStorageAdaprer, key, initialValue, options);
}
