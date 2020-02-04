import { renderHook, act } from '@testing-library/react-hooks';
import { useError } from '../src';

const setup = () => renderHook(() => useError());

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

it('should throw an error on error dispatch', () => {
  const errorStr = 'some_error';

  try {
    const { result } = setup();

    act(() => {
      result.current(new Error(errorStr));
    });
  } catch (err) {
    expect(err.message).toEqual(errorStr);
  }
});
