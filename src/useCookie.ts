import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

const useCookie = (
  cookieName: string
): [string | null, (newValue: string, options?: Cookies.CookieAttributes) => void, () => void] => {
  const [value, setValue] = useState<string | null>(() => Cookies.get(cookieName) || null);

  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName);
    setValue(null);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;
