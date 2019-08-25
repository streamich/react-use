import { renderHook, act } from '@testing-library/react-hooks';
import useStateList from '../useStateList';

const callNext = hook => {
  act(() => {
    const { next } = hook.result.current;
    next();
  });
};

const callPrev = hook => {
  act(() => {
    const { prev } = hook.result.current;
    prev();
  });
};

describe('happy flow', () => {
  const hook = renderHook(({ stateSet }) => useStateList(stateSet), {
    initialProps: {
      stateSet: ['a', 'b', 'c'],
    },
  });

  it('should return the first state on initial render', () => {
    const { state } = hook.result.current;
    expect(state).toBe('a');
  });

  it('should return the second state after calling the "next" function', () => {
    callNext(hook);

    const { state } = hook.result.current;
    expect(state).toBe('b');
  });

  it('should return the first state again after calling the "next" function "stateSet.length" times', () => {
    callNext(hook);
    callNext(hook);

    const { state } = hook.result.current;
    expect(state).toBe('a');
  });

  it('should return the last state again after calling the "prev" function', () => {
    callPrev(hook);

    const { state } = hook.result.current;
    expect(state).toBe('c');
  });

  it('should return the previous state after calling the "prev" function', () => {
    callPrev(hook);

    const { state } = hook.result.current;
    expect(state).toBe('b');
  });
});

describe('with empty state set', () => {
  const hook = renderHook(({ stateSet }) => useStateList(stateSet), {
    initialProps: {
      stateSet: [],
    },
  });

  it('should return undefined on initial render', () => {
    const { state } = hook.result.current;
    expect(state).toBe(undefined);
  });

  it('should always return undefined (calling next)', () => {
    callNext(hook);

    const { state } = hook.result.current;
    expect(state).toBe(undefined);
  });

  it('should always return undefined (calling prev)', () => {
    callPrev(hook);

    const { state } = hook.result.current;
    expect(state).toBe(undefined);
  });
});

describe('with a single state set', () => {
  const hook = renderHook(({ stateSet }) => useStateList(stateSet), {
    initialProps: {
      stateSet: ['a'],
    },
  });

  it('should return "a" on initial render', () => {
    const { state } = hook.result.current;
    expect(state).toBe('a');
  });

  it('should always return "a" (calling next)', () => {
    callNext(hook);

    const { state } = hook.result.current;
    expect(state).toBe('a');
  });

  it('should always return "a" (calling prev)', () => {
    callPrev(hook);

    const { state } = hook.result.current;
    expect(state).toBe('a');
  });
});

describe('with stateSet updates', () => {
  const hook = renderHook(({ stateSet }) => useStateList(stateSet), {
    initialProps: {
      stateSet: ['a', 'c', 'b', 'f', 'g'],
    },
  });

  it('should return the last element after updating with a shorter state set', () => {
    // Go to the 4th state
    callNext(hook); // c
    callNext(hook); // b
    callNext(hook); // f

    // Update the state set with less elements
    hook.rerender({
      stateSet: ['a', 'c'],
    });

    const { state } = hook.result.current;
    expect(state).toBe('c');
  });

  it('should return the element in the same position after updating with a larger state set', () => {
    hook.rerender({
      stateSet: ['a', 'f', 'l'],
    });

    const { state } = hook.result.current;
    expect(state).toBe('f');
  });
});
