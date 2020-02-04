export const isClient = typeof window === 'object';

export const on = (obj: any, ...args: any[]) => obj.addEventListener(...args);

export const off = (obj: any, ...args: any[]) => obj.removeEventListener(...args);
