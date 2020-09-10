import { DependencyList } from 'react';
import { renderHook, } from '@testing-library/react-hooks';
import useListProperties from '../src/useListProperties';

const setUp = <T, C>(
  creator: (item: T, index: number, items: T[]) => C,
  items: T[],
  deps: DependencyList
) => renderHook(
  ({ items, deps }) => useListProperties(creator, items, deps),
  {
    initialProps: {
      items,
      deps
    }
  }
);

const DUMB_ITEMS = [1, 2, 3];

describe('useListProperties', () => {

  it(`should return an array that as same size as items`, () => {
    const { result } = setUp(() => null, DUMB_ITEMS, []);
    expect(result.current).toHaveLength(DUMB_ITEMS.length);
  });

  it(`should return an array of value returned by creator`, () => {
    const value = 1;
    const { result } = setUp(() => value, DUMB_ITEMS, []);
    expect(result.current).toEqual(
      Array.from(Array(DUMB_ITEMS.length)).map(() => value)
    );
  });

  describe('after an update', () => {

    it(`should return an array with the same size as items when its length changed`, () => {
      const { result, rerender } = setUp(() => null, DUMB_ITEMS, []);
      const nextItems = [...DUMB_ITEMS, 4, 5];
      rerender({ items: nextItems, deps: [] });
      expect(result.current).toHaveLength(nextItems.length);
    });

    it(`should return an array with the same references when deps and items doesn't has changed`, () => {
      const { result, rerender } = setUp(value => ({ value }), DUMB_ITEMS, []);
      const firstResult = [...result.current];
      const nextItems = [...DUMB_ITEMS];
      rerender({ items: nextItems, deps: [] });
      expect(result.current).toEqual(firstResult);
    });

    it(`should return an array with new references when deps has changed`, () => {
      const { result, rerender } = setUp(value => ({ value }), DUMB_ITEMS, [1]);
      const firstResult = [...result.current];
      rerender({ items: DUMB_ITEMS, deps: [2] });
      expect(
        result.current.every((dependency, index) => dependency !== firstResult[index])
      ).toBe(true);
    });

    it(`should return an array with updated references index matching items changes and deps doesn't`, () => {
      const initialItems = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
      const { result, rerender } = setUp(item => item, initialItems, [1]);
      const firstResult = [...result.current];
      const changingIndex = 1;
      const nextItems = initialItems.map((item, index) => index === changingIndex ? { name: 'john' } : item);
      rerender({ items: nextItems, deps: [1] });
      expect(
        result.current.every((dependency, index) =>
          (index === changingIndex) === (dependency !== firstResult[index])
        )
      ).toBe(true);
    });

  });

});
