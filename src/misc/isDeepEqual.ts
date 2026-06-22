// Based on `fast-deep-equal/react` (MIT, Evgeny Poberezkin), inlined so that
// objects with a `null` prototype (e.g. created via `Object.create(null)`) can be
// compared without throwing. The upstream module assumes every object inherits
// `valueOf`/`toString` from `Object.prototype` and calls them unconditionally,
// which throws `TypeError: a.valueOf is not a function` for null-prototype objects.
// See https://github.com/streamich/react-use/issues/2700 and
// https://github.com/epoberezkin/fast-deep-equal/issues/111.
const isDeepEqual = (a: any, b: any): boolean => {
  if (a === b) {
    return true;
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) {
      return false;
    }

    let length: number;
    let i: number;

    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (!isDeepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }

    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    // Guard the `valueOf`/`toString` shortcuts behind a real-method check so
    // null-prototype objects fall through to the own-keys comparison below.
    if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === 'function') {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString && typeof a.toString === 'function') {
      return a.toString() === b.toString();
    }

    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }

    for (i = length; i-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (i = length; i-- !== 0; ) {
      const key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner, which contains
        // circular references and is not needed when comparing the elements themselves.
        continue;
      }

      if (!isDeepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  // true if both NaN, false otherwise (`x !== x` is the canonical NaN check)
  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b;
};

export default isDeepEqual;
