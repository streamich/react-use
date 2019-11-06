import { act, renderHook } from '@testing-library/react-hooks';
import useList from '../useList';

const setUp = (initialList?: any[]) => renderHook(() => useList(initialList));

it('should init list and utils', () => {
  const { result } = setUp([1, 2, 3]);
  const [list, utils] = result.current;

  expect(list).toEqual([1, 2, 3]);
  expect(utils).toStrictEqual({
    set: expect.any(Function),
    clear: expect.any(Function),
    updateAt: expect.any(Function),
    remove: expect.any(Function),
    push: expect.any(Function),
    filter: expect.any(Function),
    sort: expect.any(Function),
    reset: expect.any(Function),
  });
});

it('should init empty list if not initial list provided', () => {
  const { result } = setUp();

  expect(result.current[0]).toEqual([]);
});

it('should set new list', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.set([4, 5, 6]);
  });

  expect(result.current[0]).toEqual([4, 5, 6]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should clear current list', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.clear();
  });

  expect(result.current[0]).toEqual([]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should update element at specific position', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.updateAt(1, 'foo');
  });

  expect(result.current[0]).toEqual([1, 'foo', 3]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should remove element at specific position', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.remove(1);
  });

  expect(result.current[0]).toEqual([1, 3]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should push new element at the end of the list', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.push(0);
  });

  expect(result.current[0]).toEqual([1, 2, 3, 0]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should push duplicated element at the end of the list', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.push(2);
  });

  expect(result.current[0]).toEqual([1, 2, 3, 2]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should push multiple elements at the end of the list', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.push(4, 5, 6);
  });

  expect(result.current[0]).toEqual([1, 2, 3, 4, 5, 6]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should filter current list by provided function', () => {
  const initList = [1, -1, 2, -2, 3, -3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.filter(n => n < 0);
  });

  expect(result.current[0]).toEqual([-1, -2, -3]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should sort current list by default order', () => {
  const initList = ['March', 'Jan', 'Feb', 'Dec'];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.sort();
  });

  expect(result.current[0]).toEqual(['Dec', 'Feb', 'Jan', 'March']);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should sort current list by provided function', () => {
  const initList = ['March', 'Jan', 'Feb', 'Dec'];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.sort((a, b) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }

      return 0;
    });
  });

  expect(result.current[0]).toEqual(['March', 'Jan', 'Feb', 'Dec']);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should reset the list to initial list provided', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;

  act(() => {
    utils.push(4);
  });

  expect(result.current[0]).toEqual([1, 2, 3, 4]);

  act(() => {
    utils.reset();
  });

  expect(result.current[0]).toEqual([1, 2, 3]);
  expect(result.current[0]).not.toBe(initList); // checking immutability
});

it('should memoized its utils methods', () => {
  const initList = [1, 2, 3];
  const { result } = setUp(initList);
  const [, utils] = result.current;
  const { set, clear, updateAt, remove, push, filter, sort, reset } = utils;

  act(() => {
    push(4);
  });

  expect(result.current[1]).toBe(utils);
  expect(result.current[1].set).toBe(set);
  expect(result.current[1].clear).toBe(clear);
  expect(result.current[1].updateAt).toBe(updateAt);
  expect(result.current[1].remove).toBe(remove);
  expect(result.current[1].push).toBe(push);
  expect(result.current[1].filter).toBe(filter);
  expect(result.current[1].sort).toBe(sort);
  expect(result.current[1].reset).toBe(reset);
});
