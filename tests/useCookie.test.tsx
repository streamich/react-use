import { renderHook, act } from '@testing-library/react-hooks';
import Cookies from 'js-cookie';
import { useCookie } from '../src';

const setup = (cookieName: string) => renderHook(() => useCookie(cookieName));

it('should have initial value of null if no cookie exists', () => {
  const { result } = setup('some-cookie');

  expect(result.current[0]).toBeNull();
});

it('should have initial value of the cookie if it exists', () => {
  const cookieName = 'some-cookie';
  const value = 'some-value';
  Cookies.set(cookieName, value);

  const { result } = setup(cookieName);

  expect(result.current[0]).toBe(value);

  // cleanup
  Cookies.remove(cookieName);
});

it('should update the cookie on call to updateCookie', () => {
  const spy = jest.spyOn(Cookies, 'set');

  const cookieName = 'some-cookie';
  const { result } = setup(cookieName);

  const newValue = 'some-new-value';
  act(() => {
    result.current[1](newValue);
  });

  expect(result.current[0]).toBe(newValue);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(cookieName, newValue, undefined);

  // cleanup
  spy.mockRestore();
  Cookies.remove(cookieName);
});

it('should delete the cookie on call to deleteCookie', () => {
  const cookieName = 'some-cookie';
  const value = 'some-value';
  Cookies.set(cookieName, value);

  const spy = jest.spyOn(Cookies, 'remove');

  const { result } = setup(cookieName);

  expect(result.current[0]).toBe(value);

  act(() => {
    result.current[2]();
  });

  expect(result.current[0]).toBeNull();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith(cookieName);

  // cleanup
  spy.mockRestore();
  Cookies.remove(cookieName);
});
