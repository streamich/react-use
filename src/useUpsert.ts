import useList, { ListActions } from './useList';
import { IHookStateInitAction } from './misc/hookState';

export interface UpsertListActions<T> extends Omit<ListActions<T>, 'upsert'> {
  upsert: (newItem: T) => void;
}

/**
 * @deprecated Use `useList` hook's upsert action instead
 */
export default function useUpsert<T>(
  predicate: (a: T, b: T) => boolean,
  initialList: IHookStateInitAction<T[]> = []
): [T[], UpsertListActions<T>] {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'useUpsert is deprecated and will be removed in a future version. ' +
      'Use useList hook\'s upsert action instead. ' +
      'See: https://github.com/streamich/react-use/blob/master/docs/useUpsert.md'
    );
  }
  const [list, listActions] = useList(initialList);

  return [
    list,
    {
      ...listActions,
      upsert: (newItem: T) => {
        listActions.upsert(predicate, newItem);
      },
    } as UpsertListActions<T>,
  ];
}
