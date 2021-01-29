export const noop = () => {};

export const on = (obj: any, ...args: any[]) => obj.addEventListener(...args);

export const off = (obj: any, ...args: any[]) => obj.removeEventListener(...args);

export const isBrowser = typeof window === 'object';
