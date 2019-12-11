export const isClient = typeof window === 'object';

export const on = (obj: any, ...args: any[]) => {
  try {
    obj.addEventListener(...args);
  } catch (error) {
    handleError(error);
  }
};

export const off = (obj: any, ...args: any[]) => {
  try {
    obj.removeEventListener(...args);
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
};
