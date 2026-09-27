import { renderHook, act } from '@testing-library/react-hooks';
import Cookies from 'js-cookie';
import { useCookie } from '../src';

const setup = (cookieName: string) =>
  renderHook((name) => useCookie(name), { initialProps: cookieName });

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

describe('when the cookie name changes', () => {
  beforeEach(() => {
    Cookies.set('first-cookie', 'first-value');
    Cookies.set('second-cookie', 'second-value');
  });

  afterEach(() => {
    Cookies.remove('first-cookie');
    Cookies.remove('second-cookie');
  });

  it('should return the value of the new cookie', () => {
    const { result, rerender } = setup('first-cookie');

    rerender('second-cookie');

    expect(result.current[0]).toBe('second-value');
  });

  it('should return null when the new cookie does not exist', () => {
    const { result, rerender } = setup('first-cookie');

    rerender('missing-cookie');

    expect(result.current[0]).toBeNull();
  });

  it('should read the current value when switching back to a previous cookie', () => {
    const { result, rerender } = setup('first-cookie');

    rerender('second-cookie');
    Cookies.set('first-cookie', 'updated-first-value');
    rerender('first-cookie');

    expect(result.current[0]).toBe('updated-first-value');
  });

  it('should update and delete the new cookie without changing the previous cookie', () => {
    const { result, rerender } = setup('first-cookie');

    rerender('second-cookie');

    act(() => {
      result.current[1]('updated-second-value');
    });

    expect(result.current[0]).toBe('updated-second-value');
    expect(Cookies.get('second-cookie')).toBe('updated-second-value');
    expect(Cookies.get('first-cookie')).toBe('first-value');

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBeNull();
    expect(Cookies.get('second-cookie')).toBeUndefined();
    expect(Cookies.get('first-cookie')).toBe('first-value');
  });
});
