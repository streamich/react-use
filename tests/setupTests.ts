import 'jest-localstorage-mock';

(window as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  disconnect() {}
};
