import { renderHook } from '@testing-library/react-hooks';
import usePrevious from '../usePreviousDistinct';

describe('usePrevious with default compare', () => {
  const hook = renderHook(props => usePrevious(props), { initialProps: 0 });

  it('should return undefined on initial render', () => {
    expect(hook.result.current).toBe(undefined);
  });

  it('should return previous state only after a different value is rendered', () => {
    expect(hook.result.current).toBeUndefined();
    hook.rerender(1);
    expect(hook.result.current).toBe(0);
    hook.rerender(2);
    hook.rerender(2);
    expect(hook.result.current).toBe(1);

    hook.rerender(3);
    expect(hook.result.current).toBe(2);
  });
});

describe('usePrevious with complex comparison', () => {
  const exampleObjects = [
    {
      id: 'something-unique',
      name: 'Nancy',
    },
    {
      id: 'something-unique2',
      name: 'Fred',
    },
    {
      id: 'something-unique3',
      name: 'Bill',
    },
    {
      id: 'something-unique4',
      name: 'Alice',
    },
  ];
  const hook = renderHook(props => usePrevious(props, (prev, next) => (prev && prev.id) === (next && next.id)), {
    initialProps: exampleObjects[0],
  });

  it('should return undefined on initial render', () => {
    expect(hook.result.current).toBe(undefined);
  });

  it('should return previous state only after a different value is rendered', () => {
    expect(hook.result.current).toBeUndefined();
    hook.rerender(exampleObjects[1]);
    expect(hook.result.current).toMatchObject(exampleObjects[0]);
    hook.rerender(exampleObjects[2]);
    hook.rerender(exampleObjects[2]);
    expect(hook.result.current).toMatchObject(exampleObjects[1]);

    hook.rerender(exampleObjects[3]);
    expect(hook.result.current).toMatchObject(exampleObjects[2]);
  });
});
