import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

const useCookie = (
  cookieName: string
): [
  string | null,
  (newValue: string, options?: Cookies.CookieAttributes) => void,
  (options?: Cookies.CookieAttributes) => void
] => {
  const [value, setValue] = useState<string | null>(() => Cookies.get(cookieName) || null);

  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(
    (options?: Cookies.CookieAttributes) => {
      Cookies.remove(cookieName, options);
      setValue(null);
    },
    [cookieName]
  );

  return [value, updateCookie, deleteCookie];
};

export default useCookie;
