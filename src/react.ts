import * as React from 'react';

export type UseState = <T>(initialState: T | (() => T)) => [T, (newState: T | ((newState) => T)) => void];
export const useState: UseState = (React as any).useState;

export type UseEffect = (didUpdate: () => ((() => void) | void), params?: any[]) => void;
export const useEffect: UseEffect = (React as any).useEffect;

export interface ReactRef<T> {current: T};
export type UseRef = <T>(initialValue: T) => ReactRef<T>;
export const useRef: UseRef = (React as any).useRef;

export type UseCallback = <T extends ((...args: any[]) => any)>(callback: T, args: any[]) => T;
export const useCallback: UseCallback = (React as any).useCallback;

export type UseMemo = <T>(fn: Function, args: any[]) => T;
export const useMemo: UseMemo = (React as any).useMemo;
