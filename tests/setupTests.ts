import 'jest-localstorage-mock';
import { isBrowser } from '../src/misc/util';

if (isBrowser) {
  (window as any).ResizeObserver = class ResizeObserver {
    observe() {}

    disconnect() {}
  };
}
