import useList, { Actions as ListActions } from './useList';

export interface Actions<T> extends ListActions<T> {
  upsert: (item: T) => void;
}

const useUpsert = <T>(
  comparisonFunction: (upsertedItem: T, existingItem: T) => boolean,
  initialList: T[] = []
): [T[], Actions<T>] => {
  const [items, actions] = useList(initialList);

  const upsert = (upsertedItem: T) => {
    let itemWasFound = false;
    for (let i = 0; i < items.length; i++) {
      const existingItem = items[i];

      const shouldUpdate = comparisonFunction(existingItem, upsertedItem);
      if (shouldUpdate) {
        actions.updateAt(i, upsertedItem);
        itemWasFound = true;
        break;
      }
    }
    if (!itemWasFound) {
      actions.push(upsertedItem);
    }
  };

  return [
    items,
    {
      ...actions,
      upsert,
    },
  ];
};

export default useUpsert;
