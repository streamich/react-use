import combineRefs from '../src/combineRefs';
import { MutableRefObject } from 'react';

describe('combineRefs', () => {
  it('should be defined', () => {
    expect(combineRefs).toBeDefined();
  });

  it('should combine a variety of refs', () => {
    const aNullRef: null = null;
    const aRefObject: MutableRefObject<string | null> = { current: null };
    const aCallbackRef = jest.fn((instance: string | null) => instance);

    const refs = [aNullRef, aRefObject, aCallbackRef] as const

    const ref = combineRefs(...refs);

    ref('hello world')

    expect(aNullRef).toBeNull();
    expect(aRefObject.current).toEqual('hello world');
    expect(aCallbackRef.mock.calls.length).toBe(1);
    expect(aCallbackRef.mock.calls[0][0]).toBe('hello world');
  });
})