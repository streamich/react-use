import {
  act,
  renderHook
} from '@testing-library/react-hooks';
import createBreakpoint from '../src/createBreakpoint'

const TestScreenSize = {
  '100': 100,
  '200': 200,
  '300': 300,
  '400': 400,
  '500': 500,
  '600': 600,
  '700': 700,
  '800': 800,
  '900': 900,
  '1000': 1000,
  '1100': 1100,
  '1200': 1200,
  '1300': 1300,
  '1400': 1400,
  '1500': 1500,
  '1600': 1600
}

const useBreakpointA = createBreakpoint();
const useBreakpointB = createBreakpoint({ mobileM: 350, laptop: 1024, tablet: 768 });

const orginInnerWidth = window.innerWidth;
const changeInnerWidth = value => Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value })
const revert = () => changeInnerWidth(orginInnerWidth);

describe('createBreakpoint', () => {
  test('should use default', () => {
    const { result } = renderHook(() => useBreakpointA());
    act(() => {
      changeInnerWidth(TestScreenSize['100']);
      window.dispatchEvent(new Event('resize'));
    })
    expect(result.current).toBe('tablet');

    act(() => {
      changeInnerWidth(TestScreenSize['200']);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('tablet');

    act(() => {
      changeInnerWidth(TestScreenSize['1100']);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('laptop');

    act(() => {
      changeInnerWidth(TestScreenSize['1500']);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('laptopL');

    act(() => {
      revert();
    })
  });

  test('should use custom', () => {
    const { result } = renderHook(() => useBreakpointB());
    act(() => {
      changeInnerWidth(TestScreenSize['100']);
      window.dispatchEvent(new Event('resize'));
    })
    expect(result.current).toBe('mobileM');


    act(() => {
      changeInnerWidth(TestScreenSize['200']);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('mobileM');

    act(() => {
      changeInnerWidth(TestScreenSize['800']);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('tablet');

    act(() => {
      changeInnerWidth(TestScreenSize['1100']);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('laptop');

    act(() => {
      revert();
    })
  });
});