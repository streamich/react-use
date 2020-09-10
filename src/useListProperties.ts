import { useRef, DependencyList } from 'react'

export default function useListProperties<T, C>(
  creator: (item: T, index: number, items: T[]) => C,
  items: T[],
  deps: DependencyList
) {
	const properties = useRef(items.map(creator));
  const lastItems = useRef(items);
  const lastDeps = useRef(deps);
  
  const hasDepsChanged = lastDeps.current.some((arg, index) => deps[index] !== arg);

  if (hasDepsChanged) {
  	properties.current = items.map(creator);
		return properties.current;
  }
  
  if (items === lastItems.current) {
  	return properties.current;
  }
  
  properties.current = items.map((item, index, items) => {
  	if (lastItems.current[index] === item) {
    	return properties.current[index];
    }
    return creator(item, index, items);
  });
  
  lastItems.current = items;

  return properties.current;
}
