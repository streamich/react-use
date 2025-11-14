import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useWillMount } from '../src';
import ReactDOMServer from 'react-dom/server';

const mockCallback = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});

it('should call provided callback on will mount', () => {
  const TestComponent = () => {
    useWillMount(mockCallback);
    return null;
  };

  const container = document.createElement('div');
  const markup = ReactDOMServer.renderToString(<TestComponent />);
  container.innerHTML = markup;

  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('should not call provided callback on unmount', () => {
  const { unmount } = renderHook(() => useWillMount(mockCallback));
  expect(mockCallback).toHaveBeenCalledTimes(1);

  unmount();

  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('should not call provided callback on rerender', () => {
  const { rerender } = renderHook(() => useWillMount(mockCallback));
  expect(mockCallback).toHaveBeenCalledTimes(1);

  rerender();

  expect(mockCallback).toHaveBeenCalledTimes(1);
});
