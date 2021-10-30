import { isBrowser } from './util';

let isPatched: true | false = false;

const patchHistoryMethod = (method) => {
  const history = window.history;
  const original = history[method];

  history[method] = function (state) {
    const result = original.apply(this, arguments);
    const event = new Event(method.toLowerCase());

    (event as any).state = state;

    window.dispatchEvent(event);

    return result;
  };
};

export default function tryPatchHistoryMethod() {
  if (isPatched) return;

  if (isBrowser) {
    patchHistoryMethod('pushState');
    patchHistoryMethod('replaceState');
    isPatched = true;
  }
}
