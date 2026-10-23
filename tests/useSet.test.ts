import { act, renderHook } from '@testing-library/react-hooks';
import useSet from '../src/useSet';

const setUp = <K>(initialSet?: Set<K>) => renderHook(() => useSet(initialSet));

it('should init set and utils', () => {
  const { result } = setUp(new Set([1, 2]));
  const [set, utils] = result.current;

  expect(set).toEqual(new Set([1, 2]));
  expect(utils).toStrictEqual({
    has: expect.any(Function),
    add: expect.any(Function),
    remove: expect.any(Function),
    toggle: expect.any(Function),
    reset: expect.any(Function),
    clear: expect.any(Function),
  });
});

it('should init empty set if no initial set provided', () => {
  const { result } = setUp();

  expect(result.current[0]).toEqual(new Set());
});

it('should have an initially provided key', () => {
  const { result } = setUp(new Set(['a']));
  const [, utils] = result.current;

  let value;
  act(() => {
    value = utils.has('a');
  });

  expect(value).toBe(true);
});

it('should have an added key', () => {
  const { result } = setUp(new Set());

  act(() => {
    result.current[1].add('newKey');
  });

  let value;
  act(() => {
    value = result.current[1].has('newKey');
  });

  expect(value).toBe(true);
});

it('should get false for non-existing key', () => {
  const { result } = setUp(new Set(['a']));
  const [, utils] = result.current;

  let value;
  act(() => {
    value = utils.has('nonExisting');
  });

  expect(value).toBe(false);
});

it('should add a new key', () => {
  const { result } = setUp(new Set(['oldKey']));
  const [, utils] = result.current;

  act(() => {
    utils.add('newKey');
  });

  expect(result.current[0]).toEqual(new Set(['oldKey', 'newKey']));
});

it('should work if setting existing key', () => {
  const { result } = setUp(new Set(['oldKey']));
  const [, utils] = result.current;

  act(() => {
    utils.add('oldKey');
  });

  expect(result.current[0]).toEqual(new Set(['oldKey']));
});

it('should remove existing key', () => {
  const { result } = setUp(new Set([1, 2]));
  const [, utils] = result.current;

  act(() => {
    utils.remove(2);
  });

  expect(result.current[0]).toEqual(new Set([1]));
});

it.each(['remove', 'toggle'] as const)(
  'should %s NaN without mutating the previous set',
  (action) => {
    const initialSet = new Set([NaN, 1]);
    const { result } = setUp(initialSet);
    const previousSet = result.current[0];

    act(() => {
      result.current[1][action](NaN);
    });

    expect(result.current[0]).toEqual(new Set([1]));
    expect(result.current[1].has(NaN)).toBe(false);
    expect(result.current[0]).not.toBe(previousSet);
    expect(previousSet).toEqual(new Set([NaN, 1]));
    expect(initialSet).toEqual(new Set([NaN, 1]));

    act(() => {
      result.current[1].reset();
    });

    expect(result.current[0]).toEqual(new Set([NaN, 1]));
  }
);

it('should toggle NaN on and off', () => {
  const { result } = setUp(new Set<number>());

  act(() => {
    result.current[1].toggle(NaN);
  });

  expect(result.current[1].has(NaN)).toBe(true);

  act(() => {
    result.current[1].toggle(NaN);
  });

  expect(result.current[0].size).toBe(0);
});

it('should remove an existing key on toggle', () => {
  const { result } = setUp(new Set([1, 2]));
  const [, utils] = result.current;

  act(() => {
    utils.toggle(2);
  });

  expect(result.current[0]).toEqual(new Set([1]));
});

it('should add a new key on toggle', () => {
  const { result } = setUp(new Set([1]));
  const [, utils] = result.current;

  act(() => {
    utils.toggle(2);
  });

  expect(result.current[0]).toEqual(new Set([1, 2]));
});

it('should do nothing if removing non-existing key', () => {
  const { result } = setUp(new Set(['a', 'b']));
  const [, utils] = result.current;

  act(() => {
    utils.remove('nonExisting');
  });

  expect(result.current[0]).toEqual(new Set(['a', 'b']));
});

it('should reset to initial set provided', () => {
  const { result } = setUp(new Set([1]));
  const [, utils] = result.current;

  act(() => {
    utils.add(2);
  });

  expect(result.current[0]).toEqual(new Set([1, 2]));

  act(() => {
    utils.reset();
  });

  expect(result.current[0]).toEqual(new Set([1]));
});

it('should be empty', () => {
  const { result } = setUp(new Set([1]));
  const [, utils] = result.current;

  act(() => {
    utils.clear();
  });

  expect(result.current[0]).toEqual(new Set([]));
});

it('should memoized its utils methods', () => {
  const { result } = setUp(new Set(['a', 'b']));
  const [, utils] = result.current;
  const { add, remove, reset, clear, toggle } = utils;

  act(() => {
    add('foo');
  });

  expect(result.current[1].add).toBe(add);
  expect(result.current[1].remove).toBe(remove);
  expect(result.current[1].toggle).toBe(toggle);
  expect(result.current[1].reset).toBe(reset);
  expect(result.current[1].clear).toBe(clear);
});
