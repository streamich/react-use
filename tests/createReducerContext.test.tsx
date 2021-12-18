import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import createReducerContext from '../src/factory/createReducerContext';

type Action = 'increment' | 'decrement';

const reducer = (state: number, action: Action) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error();
  }
};

it('should create a hook and a provider', () => {
  const [useSharedNumber, SharedNumberProvider] = createReducerContext(reducer, 0);
  expect(useSharedNumber).toBeInstanceOf(Function);
  expect(SharedNumberProvider).toBeInstanceOf(Function);
});

describe('when using created hook', () => {
  it('should throw out of a provider', () => {
    const [useSharedNumber] = createReducerContext(reducer, 0);
    const { result } = renderHook(() => useSharedNumber());
    expect(result.error).toEqual(
      new Error('useReducerContext must be used inside a ReducerProvider.')
    );
  });

  const setUp = () => {
    const [useSharedNumber, SharedNumberProvider] = createReducerContext(reducer, 0);
    const wrapper: React.FC = ({ children }) => (
      <SharedNumberProvider>{children}</SharedNumberProvider>
    );
    return renderHook(() => useSharedNumber(), { wrapper });
  };

  it('should init state and updater', () => {
    const { result } = setUp();
    const [sharedNumber, updateSharedNumber] = result.current;

    expect(sharedNumber).toEqual(0);
    expect(updateSharedNumber).toBeInstanceOf(Function);
  });

  it('should update the state', () => {
    const { result } = setUp();
    const [, updateSharedNumber] = result.current;

    act(() => updateSharedNumber('increment'));

    const [sharedNumber] = result.current;

    expect(sharedNumber).toEqual(1);
  });
});

describe('when using among multiple components', () => {
  const [useSharedNumber, SharedNumberProvider] = createReducerContext(reducer, 0);

  const DisplayComponent = () => {
    const [sharedNumber] = useSharedNumber();
    return <p>{sharedNumber}</p>;
  };

  const UpdateComponent = () => {
    const [, updateSharedNumber] = useSharedNumber();
    return (
      <button type="button" onClick={() => updateSharedNumber('increment')}>
        INCREMENT
      </button>
    );
  };

  it('should be in sync when under the same provider', () => {
    const { baseElement, getByText } = render(
      <SharedNumberProvider>
        <DisplayComponent />
        <DisplayComponent />
        <UpdateComponent />
      </SharedNumberProvider>
    );

    expect(baseElement.innerHTML).toBe(
      '<div><p>0</p><p>0</p><button type="button">INCREMENT</button></div>'
    );

    fireEvent.click(getByText('INCREMENT'));

    expect(baseElement.innerHTML).toBe(
      '<div><p>1</p><p>1</p><button type="button">INCREMENT</button></div>'
    );
  });

  it('should be in update independently when under different providers', () => {
    const { baseElement, getByText } = render(
      <>
        <SharedNumberProvider>
          <DisplayComponent />
        </SharedNumberProvider>
        <SharedNumberProvider>
          <DisplayComponent />
          <UpdateComponent />
        </SharedNumberProvider>
      </>
    );

    expect(baseElement.innerHTML).toBe(
      '<div><p>0</p><p>0</p><button type="button">INCREMENT</button></div>'
    );

    fireEvent.click(getByText('INCREMENT'));

    expect(baseElement.innerHTML).toBe(
      '<div><p>0</p><p>1</p><button type="button">INCREMENT</button></div>'
    );
  });

  it('should not update component that do not use the state context', () => {
    let renderCount = 0;
    const StaticComponent = () => {
      renderCount++;
      return <p>static</p>;
    };

    const { baseElement, getByText } = render(
      <>
        <SharedNumberProvider>
          <StaticComponent />
          <DisplayComponent />
          <UpdateComponent />
        </SharedNumberProvider>
      </>
    );

    expect(baseElement.innerHTML).toBe(
      '<div><p>static</p><p>0</p><button type="button">INCREMENT</button></div>'
    );

    fireEvent.click(getByText('INCREMENT'));

    expect(baseElement.innerHTML).toBe(
      '<div><p>static</p><p>1</p><button type="button">INCREMENT</button></div>'
    );

    expect(renderCount).toBe(1);
  });

  it('should override initialValue', () => {
    const { baseElement } = render(
      <>
        <SharedNumberProvider>
          <DisplayComponent />
        </SharedNumberProvider>
        <SharedNumberProvider initialState={15}>
          <DisplayComponent />
        </SharedNumberProvider>
      </>
    );

    expect(baseElement.innerHTML).toBe('<div><p>0</p><p>15</p></div>');
  });
});
