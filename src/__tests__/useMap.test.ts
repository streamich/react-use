import { act, renderHook } from '@testing-library/react-hooks';
import useMap from '../useMap';

const setUp = (initialMap?: object) => renderHook(() => useMap(initialMap));

it('should init map and utils', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [map, utils] = result.current;

  expect(map).toEqual({ foo: 'bar', a: 1 });
  expect(utils).toStrictEqual({
    get: expect.any(Function),
    set: expect.any(Function),
    remove: expect.any(Function),
    reset: expect.any(Function),
  });
});

it('should init empty map if not initial object provided', () => {
  const { result } = setUp();

  expect(result.current[0]).toEqual({});
});

it('should get corresponding value for existing provided key', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [, utils] = result.current;

  let value;
  act(() => {
    // @ts-ignore
    value = utils.get('a');
  });

  expect(value).toBe(1);
});

it('should get undefined for non-existing provided key', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [, utils] = result.current;

  let value;
  act(() => {
    // @ts-ignore
    value = utils.get('nonExisting');
  });

  expect(value).toBeUndefined();
});

it('should set new key-value pair', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [, utils] = result.current;

  act(() => {
    // @ts-ignore
    utils.set('newKey', 99);
  });

  expect(result.current[0]).toEqual({ foo: 'bar', a: 1, newKey: 99 });
});

it('should override current value if setting existing key', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [, utils] = result.current;

  act(() => {
    // @ts-ignore
    utils.set('foo', 99);
  });

  expect(result.current[0]).toEqual({ foo: 99, a: 1 });
});

it('should remove corresponding key-value pair for existing provided key', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [, utils] = result.current;

  act(() => {
    // @ts-ignore
    utils.remove('foo');
  });

  expect(result.current[0]).toEqual({ a: 1 });
});

it('should do nothing if removing non-existing provided key', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [, utils] = result.current;

  act(() => {
    // @ts-ignore
    utils.remove('nonExisting');
  });

  expect(result.current[0]).toEqual({ foo: 'bar', a: 1 });
});

it('should reset map to initial object provided', () => {
  const { result } = setUp({ foo: 'bar', a: 1 });
  const [, utils] = result.current;

  act(() => {
    // @ts-ignore
    utils.set('z', 99);
  });

  expect(result.current[0]).toEqual({ foo: 'bar', a: 1, z: 99 });

  act(() => {
    utils.reset();
  });

  expect(result.current[0]).toEqual({ foo: 'bar', a: 1 });
});
