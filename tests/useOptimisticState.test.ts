import { renderHook } from "@testing-library/react-hooks";
import { useOptimisticState } from "../src";
import { TOptions } from "../src/useOptimisticState";

type State = { isLoading: boolean };
type Action = State;
type Response = State;

describe("useOptimisticState", () => {
  it("1 should return isLoading as true initially", () => {
    const reducer = (prevState: State) => {
      return prevState;
    };
    const options: TOptions<State, Response> = {
      verifyCallback: (newState) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(newState), 100);
        }),
    };
    const initialState = { isLoading: false };
    const { result } = renderHook(() =>
      useOptimisticState<Response, State, Action>(initialState, reducer, options)
    );
    const [state, dispatch] = result.current;
    expect(state.isLoading).toBeFalsy();
    dispatch({ isLoading: true });
    // expect(state.isLoading).toBeTruthy();
    setTimeout(() => {
      expect(state.isLoading).toBeTruthy();
    }, 200);
  });

  it("2 should return isLoading as true initially", () => {
    const reducer = (prevState: State) => {
      return prevState;
    };
    const options: TOptions<State, Response> = {
      verifyCallback: () =>
        new Promise((_, reject) => {
          setTimeout(() => reject("verify failed"), 100);
        }),
    };
    const initialState = { isLoading: false };
    const { result } = renderHook(() =>
      useOptimisticState<Response, State, Action>(initialState, reducer, options)
    );
    const [state, dispatch] = result.current;
    expect(state.isLoading).toBeFalsy();
    dispatch({ isLoading: true });
    // expect(state.isLoading).toBeTruthy();
    setTimeout(() => {
      expect(state.isLoading).toBeFalsy();
    }, 200);
  });

  it("3 should return isLoading as true initially", () => {
    const reducer = (prevState: State) => {
      return prevState;
    };
    const options: TOptions<State, Response> = {
      verifyCallback: (newState) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(newState), 100);
        }),
      shouldResetState(response) {
        return !response.isLoading;
      },
    };
    const initialState = { isLoading: true };
    const { result } = renderHook(() =>
      useOptimisticState<Response, State, Action>(initialState, reducer, options)
    );
    const [state, dispatch] = result.current;
    expect(state.isLoading).toBeTruthy();
    dispatch({ isLoading: false });
    // expect(state.isLoading).toBeFalsy();
    setTimeout(() => {
      expect(state.isLoading).toBeTruthy();
    }, 200);
  });
});
