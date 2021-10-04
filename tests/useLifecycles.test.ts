import { renderHook, cleanup } from '@testing-library/react-hooks';
import { useLifecycles } from '../src';

it('should call mount and unmount with mount() result', () => {
  const mockCallback = jest.fn();
  const obj = { foo: 'bar' };

  const mount = () => {
    return obj;
  };

  const unmount = (objParam) => {
    mockCallback(objParam);
  };

  renderHook(() => useLifecycles(mount, unmount));

  cleanup();

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback).toHaveBeenCalledWith(obj);
});
