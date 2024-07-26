import { act, renderHook } from '@testing-library/react-hooks';
import useConverter from '../src/useConverter';

const setUp = (converter, initialInput) => renderHook(() => useConverter(converter, initialInput));

it('should return input value, set input function, output value (base64)', () => {
  const { result } = setUp((data) => btoa(data), 'Hello World');

  expect(result.current[0]).toBe('Hello World');
  expect(typeof result.current[1]).toBe('function');
  expect(result.current[2]).toBe('SGVsbG8gV29ybGQ=');
});

it('should change state and return input value, set input function, output value (html)', () => {
  const { result } = setUp((data) => '<p>' + data + '</p>', 'Hello World');
  const [, setInput] = result.current;

  act(() => {
    setInput("It's me");
  });

  expect(result.current[0]).toBe("It's me");
  expect(typeof result.current[1]).toBe('function');
  expect(result.current[2]).toBe("<p>It's me</p>");
});
