import { isBrowser } from '../src/misc/util';
import 'jest-localstorage-mock';

if (isBrowser) {
  (window as any).ResizeObserver = class ResizeObserver {
    observe() {}

    disconnect() {}
  };
}

window.URL.createObjectURL = function () {
  return '';
};
if (typeof Worker === 'undefined') {
  global.Worker = class {
    addEventListener() {}

    removeEventListener() {}

    dispatchEvent() {
      return false;
    }

    onmessage() {}

    onmessageerror() {}

    onerror() {}

    postMessage() {}

    terminate() {}
  };
}

Object.defineProperty(window, 'Worker', {
  writable: true,
  value: Worker,
});
