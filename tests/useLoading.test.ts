import { act, renderHook } from '@testing-library/react-hooks';
import {useLoading} from '../src/useLoading';

const setUp = (initialValue: string[] | Record<string, boolean> | string) => renderHook(() => useLoading(initialValue));
const stringInitialValue = "page";
const arrayInitialValue = ["page", "submit"];
const objectInitialValue = {page: true, submit: false};

it('should init loading single state false', () => {
    const { result } = setUp(stringInitialValue);
  
    expect(result.current[0]['page']).toBe(false);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
});

it('should init loading state false', () => {
    const { result } = setUp(arrayInitialValue);
  
    expect(result.current[0]['page']).toBe(false);
    expect(result.current[0]['submit']).toBe(false);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
});

it('should init loading state "page" true and "submit" false', () => {
    const { result } = setUp(objectInitialValue);

    expect(result.current[0]['page']).toBe(true);
    expect(result.current[0]['submit']).toBe(false);
});


it('should start loading "page"', () => {
  const { result } = setUp(arrayInitialValue);
  const [, startLoading] = result.current;

    expect(result.current[0]['page']).toBe(false);
    expect(result.current[0]['submit']).toBe(false);

    act(() => {
        startLoading('page');
    });

    expect(result.current[0]['page']).toBe(true);
    expect(result.current[0]['submit']).toBe(false);
});

it('should start and stop loading "page"', () => {
    const { result } = setUp(arrayInitialValue);
    const [, startLoading, stopLoading] = result.current;
  
    expect(result.current[0]['page']).toBe(false);
  
    act(() => {
        startLoading('page');
    });
    
    expect(result.current[0]['page']).toBe(true);

    act(() => {
        stopLoading('page');
    });

    expect(result.current[0]['page']).toBe(false);
});


