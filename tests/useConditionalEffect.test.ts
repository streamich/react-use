import { renderHook } from '@testing-library/react-hooks';
import { useConditionalEffect } from '../src';

it('should run the effect when condition is true', () => {
  const effect = jest.fn();
  renderHook(({ condition }) => useConditionalEffect(condition, effect, []), {
    initialProps: { condition: true },
  });

  expect(effect.mock.calls.length).toEqual(1);
});

it('should not run the effect when condition is false', () => {
  const effect = jest.fn();
  renderHook(({ condition }) => useConditionalEffect(condition, effect, []), {
    initialProps: { condition: false },
  });

  expect(effect.mock.calls.length).toEqual(0);
});

it('should run the effect when dependencies change', () => {
  const effect = jest.fn();
  const component = renderHook(
    ({ condition, dependencies }) => useConditionalEffect(condition, effect, dependencies),
    {
      initialProps: { condition: true, dependencies: ['a'] },
    }
  );

  component.rerender({ condition: true, dependencies: ['b'] });

  expect(effect.mock.calls.length).toEqual(2);
});

it('should not run the effect when dependencies do not change', () => {
  const effect = jest.fn();
  const component = renderHook(
    ({ condition, dependencies }) => useConditionalEffect(condition, effect, dependencies),
    {
      initialProps: { condition: true, dependencies: ['a'] },
    }
  );

  component.rerender({ condition: true, dependencies: ['a'] });

  expect(effect.mock.calls.length).toEqual(1);
});

it('should not run the effect when dependencies change, but condition flips to false', () => {
  const effect = jest.fn();
  const component = renderHook(
    ({ condition, dependencies }) => useConditionalEffect(condition, effect, dependencies),
    {
      initialProps: { condition: true, dependencies: ['a'] },
    }
  );

  component.rerender({ condition: false, dependencies: ['b'] });

  expect(effect.mock.calls.length).toEqual(1);
});

it('should run the effect when dependencies do not change, but condition flips to true', () => {
  const effect = jest.fn();
  const component = renderHook(
    ({ condition, dependencies }) => useConditionalEffect(condition, effect, dependencies),
    {
      initialProps: { condition: false, dependencies: ['a'] },
    }
  );

  component.rerender({ condition: true, dependencies: ['a'] });

  expect(effect.mock.calls.length).toEqual(1);
});
