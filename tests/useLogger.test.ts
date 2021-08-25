import { renderHook } from '@testing-library/react-hooks';
import useLogger from '../src/useLogger';

const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

describe('useLogger', () => {
  it('should be defined', () => {
    expect(useLogger).toBeDefined();
  });

  it('should log the provided props on mount', () => {
    const props = { question: 'What is the meaning?', answer: 42 };
    renderHook(() => useLogger('Test', props));

    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toHaveBeenLastCalledWith('Test mounted', props);
  });

  it('should log when the component has unmounted', () => {
    const props = { question: 'What is the meaning?', answer: 42 };
    const { unmount } = renderHook(() => useLogger('Test', props));

    unmount();

    expect(logSpy).toHaveBeenLastCalledWith('Test unmounted');
  });

  it('should log updates as props change', () => {
    const { rerender } = renderHook(
      ({ componentName, props }: { componentName: string; props: any }) =>
        useLogger(componentName, props),
      {
        initialProps: { componentName: 'Test', props: { one: 1 } },
      }
    );

    const newProps = { one: 1, two: 2 };
    rerender({ componentName: 'Test', props: newProps });

    expect(logSpy).toHaveBeenLastCalledWith('Test updated', newProps);
  });
});
