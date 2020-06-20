import 'jest-localstorage-mock';

(window as any).ResizeObserver = class ResizeObserver {
  observe() {}
  disconnect() {}
};
