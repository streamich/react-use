import { useMemo } from 'react';
import useTween from './useTween';

export type InterpolationMap = Record<string, readonly [number, number]>;

const formatMapEntryValue = (value: unknown): string => {
  // Best-effort stringify for dev error logs; avoids throwing on circular structures.
  try {
    const json = JSON.stringify(value);
    return json;
  } catch {
    // ignore
  }

  return String(value);
};

const useInterpolations = <T extends InterpolationMap>(
  map: T,
  easingName: string = 'inCirc',
  ms: number = 200,
  delay: number = 0
): { [K in keyof T]: number } => {
  const t = useTween(easingName, ms, delay);

  return useMemo(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (!map || typeof map !== 'object') {
        console.error('useInterpolations() expected "map" to be an object.');
        return {} as { [K in keyof T]: number };
      }
    }

    const keys = Object.keys(map) as Array<keyof T>;

    if (process.env.NODE_ENV !== 'production') {
      for (const key of keys) {
        const value = map[key];
        const keyString = String(key);
        if (!Array.isArray(value) || value.length !== 2) {
          const valueString = formatMapEntryValue(value);
          console.error(
            `useInterpolations() expected map["${keyString}"] to be a [start, end] tuple, got ${valueString}.`
          );
          return {} as { [K in keyof T]: number };
        }
        if (typeof value[0] !== 'number' || typeof value[1] !== 'number') {
          console.error(
            `useInterpolations() expected map["${keyString}"] to contain numbers, got [${typeof value[0]}, ${typeof value[1]}].`
          );
          return {} as { [K in keyof T]: number };
        }
        if (!Number.isFinite(value[0]) || !Number.isFinite(value[1])) {
          console.error(
            `useInterpolations() expected map["${keyString}"] to contain finite numbers, got [${value[0]}, ${value[1]}].`
          );
          return {} as { [K in keyof T]: number };
        }
      }
    }

    const result = {} as { [K in keyof T]: number };
    for (const key of keys) {
      const [start, end] = map[key];
      result[key] = start + (end - start) * t;
    }
    return result;
  }, [map, t]);
};

export default useInterpolations;
