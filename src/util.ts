export const isClient = typeof window === 'object';

export const on = (obj: any, ...args: any[]) => obj && obj.addEventListener(...args);

export const off = (obj: any, ...args: any[]) => obj && obj.removeEventListener(...args);
