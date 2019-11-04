import { act, renderHook } from '@testing-library/react-hooks';
import useStateList from '../useStateList';

describe('useStateList', () => {
  it('should be defined', () => {
    expect(useStateList).toBeDefined();
  });

  function getHook(list: any[] = ['a', 'b', 'c']) {
    return renderHook(({ states }) => useStateList(states), { initialProps: { states: list } });
  }

  it('should return an object containing `state`, `next` and `prev`', () => {
    const res = getHook().result.current;

    expect(typeof res).toBe('object');
    expect(typeof res.state).toBe('string');
    expect(typeof res.prev).toBe('function');
    expect(typeof res.next).toBe('function');
  });

  it('should return the first state on init', () => {
    expect(getHook().result.current.state).toBe('a');
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

    it('should on overflow should switch to first element (should be cycled)', () => {
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
    it('should on overflow should switch to last element (should be cycled)', () => {
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
