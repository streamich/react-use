import { renderHook, act } from '@testing-library/react-hooks';
import useMaxlength from '../src/useMaxlength';

describe('useMaxlength', () => {
  it('should throw error when maxLength is negative', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: -1 }));

    expect(result.error).toEqual(Error('maxLength must be a positive number'));
  });

  it('should throw error when counterThreshold is negative', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 1, counterThreshold: -1 }));

    expect(result.error).toEqual(
      Error('counterThreshold must be a positive number and less than maxLength')
    );
  });

  it('should throw error when warningThreshold is negative', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 1, warningThreshold: -1 }));

    expect(result.error).toEqual(
      Error('warningThreshold must be a positive number and less than maxLength')
    );
  });

  it('should count characters in utf8 mode', () => {
    const { result } = renderHook(() =>
      useMaxlength({ maxLength: 10, utf8: true, initialValue: 'test£' })
    );

    expect(result.current.counter).toBe(6);
  });

  it('should count characters in non-utf8 mode', () => {
    const { result } = renderHook(() =>
      useMaxlength({ maxLength: 10, utf8: false, initialValue: 'test' })
    );

    expect(result.current.counter).toBe(4);
  });

  it('should truncate value when maxLength is exceeded', () => {
    const { result } = renderHook(() =>
      useMaxlength({ maxLength: 4, validate: true, initialValue: 'testing' })
    );

    act(() => {
      result.current.onChange('new testing value');
    });

    expect(result.current.currentValue).toBe('new ');
  });

  it('should calculate characters left correctly', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 10, initialValue: 'test' }));

    expect(result.current.charactersLeft).toBe(6);
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 10 }));
    expect(result.current.counter).toBe(0);
    expect(result.current.isWarning).toBeFalsy();
    expect(result.current.isLimitReached).toBeFalsy();
    expect(result.current.isLimitExceeded).toBeFalsy();
    expect(result.current.isShowCounter).toBeTruthy();
    expect(result.current.maxLength).toBe(10);
    expect(result.current.charactersLeft).toBe(10);
    expect(result.current.currentValue).toBe('');
  });

  it('should increase counter when a key is pressed', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 10 }));
    act(() => {
      result.current.onChange('a');
    });

    expect(result.current.counter).toBe(1);
  });

  it('should set isWarning when counter reaches the threshold', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 10, warningThreshold: 5 }));
    act(() => {
      result.current.onChange('12345');
    });
    expect(result.current.isWarning).toBeTruthy();
  });

  it('should set isLimitReached when counter reaches the maxLength', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 3 }));
    act(() => {
      result.current.onChange('123');
    });
    expect(result.current.isLimitReached).toBeTruthy();
  });

  it('should set isLimitExceeded when counter exceeds the maxLength', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 3 }));
    act(() => {
      result.current.onChange('1234');
    });
    expect(result.current.isLimitExceeded).toBeTruthy();
  });

  it('should set isShowCounter when a key is pressed', () => {
    const { result } = renderHook(() => useMaxlength({ maxLength: 3 }));
    act(() => {
      result.current.onChange('a');
    });
    expect(result.current.isShowCounter).toBeTruthy();
  });
});
