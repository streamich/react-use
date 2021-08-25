import { act, renderHook } from '@testing-library/react-hooks';
import useDefault from '../src/useDefault';

const setUp = (defaultValue: any, initialValue: any) =>
  renderHook(() => useDefault(defaultValue, initialValue));

describe.each`
  valueType    | defaultValue | initialValue            | anotherValue
  ${'number'}  | ${0}         | ${5}                    | ${77}
  ${'object'}  | ${{}}        | ${{ name: 'John Doe' }} | ${{ name: 'Solid Snake' }}
  ${'boolean'} | ${false}     | ${false}                | ${true}
  ${'string'}  | ${''}        | ${'foo'}                | ${'bar'}
`('when value type is $valueType', ({ defaultValue, initialValue, anotherValue }) => {
  it('should init state with initial value', () => {
    const { result } = setUp(defaultValue, initialValue);
    const [value, setValue] = result.current;

    expect(value).toBe(initialValue);
    expect(setValue).toBeInstanceOf(Function);
  });

  it('should set state to another value', () => {
    const { result } = setUp(defaultValue, initialValue);
    const [, setValue] = result.current;

    act(() => setValue(anotherValue));

    expect(result.current[0]).toBe(anotherValue);
  });

  it('should return default value if state set to null', () => {
    const { result } = setUp(defaultValue, initialValue);
    const [, setValue] = result.current;

    act(() => setValue(null));

    expect(result.current[0]).toBe(defaultValue);
  });

  it('should return default value if state set to undefined', () => {
    const { result } = setUp(defaultValue, initialValue);
    const [, setValue] = result.current;

    act(() => setValue(undefined));

    expect(result.current[0]).toBe(defaultValue);
  });

  it('should handle state properly after being set to nil and then to another value', () => {
    const { result } = setUp(defaultValue, initialValue);
    const [, setValue] = result.current;

    act(() => setValue(undefined));
    expect(result.current[0]).toBe(defaultValue);

    act(() => setValue(null));
    expect(result.current[0]).toBe(defaultValue);

    act(() => setValue(anotherValue));
    expect(result.current[0]).toBe(anotherValue);
  });
});
