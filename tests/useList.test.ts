import { act, renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import useList, { ListActions } from '../src/useList';

describe('useList', () => {
  it('should be defined', () => {
    expect(useList).toBeDefined();
  });

  function getHook<T>(initialArray?: T[]) {
    return renderHook(
      (props): [number, [T[], ListActions<T>]] => {
        const counter = useRef(0);

        return [++counter.current, useList(props)];
      },
      { initialProps: initialArray }
    );
  }

  it('should init with 1st parameter and actions', () => {
    const hook = getHook([1, 2, 3]);
    const [, [list, actions]] = hook.result.current;

    expect(list).toEqual([1, 2, 3]);
    expect(actions).toStrictEqual({
      set: expect.any(Function),
      push: expect.any(Function),
      updateAt: expect.any(Function),
      insertAt: expect.any(Function),
      update: expect.any(Function),
      updateFirst: expect.any(Function),
      upsert: expect.any(Function),
      sort: expect.any(Function),
      filter: expect.any(Function),
      removeAt: expect.any(Function),
      remove: expect.any(Function),
      clear: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('should return the same actions object each render', () => {
    const hook = getHook([1, 2, 3]);
    const [, [, actions]] = hook.result.current;

    act(() => {
      actions.set([1, 2, 3, 4]);
    });

    expect(actions).toBe(hook.result.current[1][1]);
  });

  it('should default with empty array', () => {
    expect(getHook().result.current[1][0]).toEqual([]);
  });

  describe('set()', () => {
    it('should reset list with given array and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { set }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        set([1, 2, 3, 4]);
      });
      expect(hook.result.current[1][0]).toEqual([1, 2, 3, 4]);
      expect(hook.result.current[0]).toBe(2);

      act(() => {
        set([1, 2, 3, 4, 5]);
      });
      expect(hook.result.current[1][0]).toEqual([1, 2, 3, 4, 5]);
      expect(hook.result.current[0]).toBe(3);
    });
  });

  describe('push()', () => {
    it('should add arbitrary amount of items to the end and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { push }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        push(1, 2, 3, 4);
      });
      expect(hook.result.current[1][0]).toEqual([1, 2, 3, 1, 2, 3, 4]);
      expect(hook.result.current[0]).toBe(2);
    });

    it('should not do anything if called with no parameters', () => {
      const hook = getHook([1, 2, 3]);
      const [, [list, { push }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        push();
      });
      expect(hook.result.current[0]).toBe(1);
      expect(list).toBe(hook.result.current[1][0]);
    });
  });

  describe('updateAt()', () => {
    it('should replace item at given index with given value and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { updateAt }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        updateAt(1, 5);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 5, 3]);
    });

    it('should work fine if target index is out of array length', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { updateAt }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        updateAt(5, 6);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 2, 3, undefined, undefined, 6]);
    });
  });

  describe('insertAt()', () => {
    it('should insert item at given index shifting all the right elements and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { insertAt }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        insertAt(1, 5);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 5, 2, 3]);
    });

    it('should work if index is out of array length', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { insertAt }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        insertAt(5, 6);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 2, 3, undefined, undefined, 6]);
    });
  });

  describe('update()', () => {
    it('should replace all items that matches the predicate and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { update }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        update((a, _) => a % 2 === 1, 0);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([0, 2, 0]);
    });

    it('should pass two parameters to the predicate, iterated element and new one', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { update }]] = hook.result.current;
      const spy = jest.fn();

      act(() => {
        update(spy, 0);
      });

      expect(spy.mock.calls[0][0]).toBe(1);
      expect(spy.mock.calls[0][1]).toBe(0);
    });
  });

  describe('updateFirst()', () => {
    it('should replace first items that matches the predicate and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { updateFirst }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        updateFirst((a, _) => a % 2 === 1, 0);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([0, 2, 3]);
    });

    it('should pass two parameters to the predicate, iterated element and new one', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { updateFirst }]] = hook.result.current;
      const spy = jest.fn();

      act(() => {
        updateFirst(spy, 0);
      });

      expect(spy.mock.calls[0].length).toBe(2);
      expect(spy.mock.calls[0][0]).toBe(1);
      expect(spy.mock.calls[0][1]).toBe(0);
    });
  });

  describe('upsert()', () => {
    it('should replace first item that matches the predicate and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { upsert }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        upsert((a, _) => a === 1, 0);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([0, 2, 3]);
    });

    it('otherwise should push it to the list and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { upsert }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        upsert((a, _) => a === 5, 0);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 2, 3, 0]);
    });

    it('should pass two parameters to the predicate, iterated element and new one', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { upsert }]] = hook.result.current;
      const spy = jest.fn();

      act(() => {
        upsert(spy, 0);
      });

      expect(spy.mock.calls[0].length).toBe(2);
      expect(spy.mock.calls[0][0]).toBe(1);
      expect(spy.mock.calls[0][1]).toBe(0);
    });
  });

  describe('sort()', () => {
    it('should sort the list with given comparator and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { sort }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        sort((a, b) => (a === b ? 0 : a < b ? 1 : -1));
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([3, 2, 1]);
    });

    it('should use default array`s sorting function of called without parameters', () => {
      const hook = getHook([2, 3, 1]);
      const [, [, { sort }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        sort();
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 2, 3]);
    });
  });

  describe('filter()', () => {
    it('should filter the list with given predicate and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { filter }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        filter((val) => val % 2 === 1);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 3]);
    });

    it('should pass three parameters to the predicate, iterated element, it`s index and filtered array', () => {
      const hook = getHook([1, 2, 3]);
      const [, [list, { filter }]] = hook.result.current;
      const spy = jest.fn((_, _2, _3) => false);

      act(() => {
        filter(spy);
      });

      expect(spy.mock.calls[0].length).toBe(3);
      expect(spy.mock.calls[0][0]).toBe(1);
      expect(spy.mock.calls[0][1]).toBe(0);
      expect(spy.mock.calls[0][2]).toEqual(list);
    });
  });

  describe('removeAt()', () => {
    it('should remove item at given index and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { removeAt }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        removeAt(1);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 3]);
    });

    it('should do nothing if index is out of array length, although it should cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { removeAt }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        removeAt(5);
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([1, 2, 3]);
    });
  });

  describe('remove()', () => {
    it('should be a ref to removeAt', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { remove, removeAt }]] = hook.result.current;

      expect(remove).toBe(removeAt);
    });
  });

  describe('clear()', () => {
    it('should clear the list and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { clear }]] = hook.result.current;

      expect(hook.result.current[0]).toBe(1);
      act(() => {
        clear();
      });
      expect(hook.result.current[0]).toBe(2);
      expect(hook.result.current[1][0]).toEqual([]);
    });
  });

  describe('reset()', () => {
    it('should reset list to initial values and cause re-render', () => {
      const hook = getHook([1, 2, 3]);
      const [, [, { set, reset }]] = hook.result.current;

      act(() => {
        set([1, 2, 3, 4, 6, 7, 8]);
      });
      expect(hook.result.current[1][0]).toEqual([1, 2, 3, 4, 6, 7, 8]);

      expect(hook.result.current[0]).toBe(2);
      act(() => {
        reset();
      });
      expect(hook.result.current[0]).toBe(3);
      expect(hook.result.current[1][0]).toEqual([1, 2, 3]);
    });
  });
});
