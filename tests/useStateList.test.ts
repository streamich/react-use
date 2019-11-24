import { act, renderHook } from '@testing-library/react-hooks';
import useStateList from '../src/useStateList';

describe('useStateList', () => {
  it('should be defined', () => {
    expect(useStateList).toBeDefined();
  });

  function getHook(list: any[] = ['a', 'b', 'c']) {
    return renderHook(({ states }) => useStateList(states), { initialProps: { states: list } });
  }

  it('should return an object containing `state`, `next` and `prev`', () => {
    const res = getHook().result.current;

    expect(res).toStrictEqual({
      state: expect.any(String),
      currentIndex: expect.any(Number),
      prev: expect.any(Function),
      next: expect.any(Function),
      setStateAt: expect.any(Function),
      setState: expect.any(Function),
    });
  });

  it('should return the first state on init', () => {
    expect(getHook().result.current.state).toBe('a');
  });

  describe('setState()', () => {
    it('should set state value if it exists in states list', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => hook.result.current.setState('c'));

      expect(hook.result.current.state).toBe('c');
    });

    it('should throw if required state not exists', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      expect(() => hook.result.current.setState('d')).toThrow(
        `State 'd' is not a valid state (does not exist in state list)`
      );
    });

    it('should do nothing on unmounted component', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');
      hook.unmount();

      expect(() => hook.result.current.setState('c')).not.toThrow(Error);
      expect(hook.result.current.state).toBe('a');
    });
  });

  describe('setStateAt()', () => {
    it('should set state by it`s index in states list', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => hook.result.current.setStateAt(2));
      expect(hook.result.current.state).toBe('c');
      act(() => hook.result.current.setStateAt(1));
      expect(hook.result.current.state).toBe('b');
    });

    it('should cyclically travel through the right border', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => hook.result.current.setStateAt(5));
      expect(hook.result.current.state).toBe('c');
      act(() => hook.result.current.setStateAt(9));
      expect(hook.result.current.state).toBe('a');
      act(() => hook.result.current.setStateAt(10));
      expect(hook.result.current.state).toBe('b');
    });

    it('should cyclically travel through the left border', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => hook.result.current.setStateAt(-1));
      expect(hook.result.current.state).toBe('c');
      act(() => hook.result.current.setStateAt(-2));
      expect(hook.result.current.state).toBe('b');
      act(() => hook.result.current.setStateAt(-17));
      expect(hook.result.current.state).toBe('b');
    });
  });

  describe('next()', () => {
    it('should switch states forward and cause re-render', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => {
        hook.result.current.next();
      });
      expect(hook.result.current.state).toBe('b');

      act(() => {
        hook.result.current.next();
      });
      expect(hook.result.current.state).toBe('c');
    });

    it('on overflow should switch to first element (should be cycled)', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => {
        hook.result.current.next();
        hook.result.current.next();
        hook.result.current.next();
      });
      expect(hook.result.current.state).toBe('a');
    });
  });

  describe('prev()', () => {
    it('on overflow should switch to last element (should be cycled)', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => {
        hook.result.current.prev();
      });
      expect(hook.result.current.state).toBe('c');
    });

    it('should switch states backward and cause re-render', () => {
      const hook = getHook();

      expect(hook.result.current.state).toBe('a');

      act(() => {
        hook.result.current.prev();
      });
      expect(hook.result.current.state).toBe('c');

      act(() => {
        hook.result.current.prev();
      });
      expect(hook.result.current.state).toBe('b');

      act(() => {
        hook.result.current.prev();
      });
      expect(hook.result.current.state).toBe('a');
    });
  });

  describe('with empty states list', () => {
    it('should have `undefined` state', () => {
      expect(getHook([]).result.current.state).toBe(undefined);
    });

    it('should do nothing on next() call', () => {
      const hook = getHook([]);
      act(() => {
        hook.result.current.next();
      });

      expect(hook.result.current.state).toBe(undefined);
    });

    it('should do nothing on prev() call', () => {
      const hook = getHook([]);
      act(() => {
        hook.result.current.prev();
      });

      expect(hook.result.current.state).toBe(undefined);
    });
  });

  describe('on state list shrink', () => {
    it('should set last element as state if index was beyond new last element', () => {
      const hook = getHook();
      act(() => {
        hook.result.current.prev();
      });
      expect(hook.result.current.state).toBe('c');

      hook.rerender({ states: ['a', 'b'] });

      expect(hook.result.current.state).toBe('b');
    });

    it('should so nothing if current index within new range', () => {
      const hook = getHook();
      act(() => {
        hook.result.current.prev();
      });
      expect(hook.result.current.state).toBe('c');

      hook.rerender({ states: ['a', 'b', 'c', 'd'] });

      expect(hook.result.current.state).toBe('c');
    });
  });

  describe('ou unmounted component', () => {
    it('next() should not do anything', () => {
      const hook = getHook();
      const { next } = hook.result.current;

      hook.unmount();
      act(() => next());

      expect(hook.result.current.state).toBe('a');
    });

    it('prev() should not do anything', () => {
      const hook = getHook();
      const { prev } = hook.result.current;

      hook.unmount();
      act(() => prev());

      expect(hook.result.current.state).toBe('a');
    });
  });
});
