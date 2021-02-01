import { act, renderHook } from '@testing-library/react-hooks';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createReducer from '../src/factory/createReducer';

it('should init reducer hook function', () => {
  const useSomeReducer = createReducer();
  expect(useSomeReducer).toBeInstanceOf(Function);
});

/**
 * This test suite implements the special demo in storybook that creates a
 * reducer with thunk and logger for using a simple counter
 */
describe('when using created reducer hook', () => {
  const initialCount = 1;
  let originalLog;
  let originalGroup;
  const mockLog = jest.fn();
  const mockGroup = jest.fn();

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      case 'reset':
        return { count: action.payload };
      default:
        throw new Error();
    }
  }

  // Action creator to increment count, wait a second and then reset
  const addAndReset = () => {
    return (dispatch) => {
      dispatch({ type: 'increment' });

      setTimeout(() => {
        dispatch({ type: 'reset', payload: initialCount });
      }, 1000);
    };
  };

  const setUp = () => {
    const useThunkReducer = createReducer(thunk, logger);
    return renderHook(() => useThunkReducer(reducer, { count: initialCount }));
  };

  beforeAll(() => {
    originalLog = console.log;
    originalGroup = console.group;
    console.log = mockLog;
    console.group = mockGroup;
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    console.log = originalLog;
    console.group = originalGroup;
  });

  it('should init state and dispatcher', () => {
    const { result } = setUp();
    const [state, dispatch] = result.current;

    expect(state).toEqual({ count: 1 });
    expect(dispatch).toBeInstanceOf(Function);
  });

  it.each`
    actionType     | expectedCount | payload
    ${'increment'} | ${2}          | ${undefined}
    ${'decrement'} | ${0}          | ${undefined}
    ${'reset'}     | ${1}          | ${1}
  `('should handle "$actionType" action', ({ actionType, expectedCount, payload }) => {
    const { result } = setUp();
    const [, dispatch] = result.current;
    expect(mockLog).not.toHaveBeenCalled();

    act(() => {
      dispatch({ type: actionType, payload });
    });

    expect(result.current[0]).toEqual({ count: expectedCount });
    expect(mockLog).toHaveBeenCalled();
  });

  it('should handle async action with several middlewares', () => {
    const { result } = setUp();
    const [, dispatch] = result.current;
    expect(mockLog).not.toHaveBeenCalled();

    act(() => {
      dispatch(addAndReset());
    });

    expect(result.current[0]).toEqual({ count: 2 });
    expect(mockLog).toHaveBeenCalled();

    // fast-forward until all timers have been executed
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current[0]).toEqual({ count: 1 });
  });
});
