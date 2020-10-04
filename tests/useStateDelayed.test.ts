import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useStateDelayed from '../src/useStateDelayed';

const DEFAULT_STATE = 'default state';
const INITIAL_STATE = 'initial state';

interface HookInitialValues {
  initialState: any;
  watchInput: Boolean;
  defaultState: any;
}

function getHook(initialValues?: HookInitialValues): RenderHookResult<HookInitialValues, [any, Function]> {
  return renderHook(
    ({ initialState, watchInput, defaultState }) => useStateDelayed(initialState, watchInput, defaultState),
    {
      initialProps: {
        initialState: initialValues?.initialState ?? INITIAL_STATE,
        watchInput: initialValues?.watchInput ?? false,
        defaultState: initialValues?.defaultState ?? DEFAULT_STATE,
      },
    }
  );
}

describe('useStateDelayed', () => {
  it('should be defined', () => {
    expect(useStateDelayed).toBeDefined();
  });

  it('should return an array of [state, setState]', () => {
    const { result } = getHook();

    expect(result.current).toStrictEqual([expect.anything(), expect.any(Function)]);
  });

  it('should return the defaultState on init when watchInput is set to false', () => {
    const { result } = getHook();

    expect(result.current).toStrictEqual([DEFAULT_STATE, expect.any(Function)]);
  });

  it('should update the state with initialState when watchInput has changed to true', () => {
    const { result, rerender } = getHook();
    expect(result.current[0]).toStrictEqual(DEFAULT_STATE);

    rerender({ watchInput: true, defaultState: DEFAULT_STATE, initialState: INITIAL_STATE });

    expect(result.current[0]).toStrictEqual(INITIAL_STATE);
  });

  it('should update state with initialState only once', () => {
    const { result, rerender } = getHook();

    expect(result.current[0]).toStrictEqual(DEFAULT_STATE);
    rerender({ watchInput: true, initialState: INITIAL_STATE, defaultState: DEFAULT_STATE });
    rerender({ watchInput: false, initialState: 'other initial state', defaultState: DEFAULT_STATE });
    rerender({ watchInput: true, initialState: 'other initial state', defaultState: DEFAULT_STATE });
    expect(result.current[0]).toStrictEqual(INITIAL_STATE);
  });

  it('should ignore changes to defaultState', () => {
    const { result, rerender } = getHook();
    const [state] = result.current;

    rerender({ watchInput: true, initialState: INITIAL_STATE, defaultState: DEFAULT_STATE });
    rerender({ watchInput: true, initialState: INITIAL_STATE, defaultState: 'other default state' });
    expect(state).toStrictEqual(DEFAULT_STATE);
  });
});
