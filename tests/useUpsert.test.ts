import { act, renderHook } from '@testing-library/react-hooks';
import useUpsert from '../src/useUpsert';

interface TestItem {
  id: string;
  text: string;
}

const testItems: TestItem[] = [
  { id: '1', text: '1' },
  { id: '2', text: '2' },
];

const itemsAreEqual = (a: TestItem, b: TestItem) => {
  return a.id === b.id;
};

const setUp = (initialList: TestItem[] = []) =>
  renderHook(() => useUpsert<TestItem>(itemsAreEqual, initialList));

describe('useUpsert', () => {
  describe('initialization', () => {
    const { result } = setUp(testItems);
    const [list, utils] = result.current;

    it('properly initiates the list content', () => {
      expect(list).toEqual(testItems);
    });

    it('returns an upsert function', () => {
      expect(utils.upsert).toBeInstanceOf(Function);
    });
  });

  describe('upserting a new item', () => {
    const { result } = setUp(testItems);
    const [, utils] = result.current;

    const newItem: TestItem = {
      id: '3',
      text: '3',
    };
    act(() => {
      utils.upsert(newItem);
    });

    it('inserts a new item', () => {
      expect(result.current[0]).toContain(newItem);
    });
    it('works immutably', () => {
      expect(result.current[0]).not.toBe(testItems);
    });
  });

  describe('upserting an existing item', () => {
    const { result } = setUp(testItems);
    const [, utils] = result.current;

    const newItem: TestItem = {
      id: '2',
      text: '4',
    };
    act(() => {
      utils.upsert(newItem);
    });
    const updatedList = result.current[0];

    it('has the same length', () => {
      expect(updatedList).toHaveLength(testItems.length);
    });
    it('updates the item', () => {
      expect(updatedList).toContain(newItem);
    });
    it('works immutably', () => {
      expect(updatedList).not.toBe(testItems);
    });
  });
});
