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
    const itemAlreadyExists = items.find(item => comparisonFunction(upsertedItem, item));
    if (itemAlreadyExists) {
      return actions.set(
        items.map(existingItem => {
          if (comparisonFunction(upsertedItem, existingItem)) {
            return upsertedItem;
          }
          return existingItem;
        })
      );
    }
    return actions.push(upsertedItem);
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
