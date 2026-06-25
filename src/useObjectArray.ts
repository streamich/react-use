import { useState } from "react";

export type ObjectType = Record<string, unknown>;

export type useObjectArrayReturn<T extends ObjectType> = [
  array: T[],
  set: React.Dispatch<React.SetStateAction<T[]>>,
  addItem: (item: T) => void,
  removeItem: (index: number) => void,
  updatePropertyValue: <K extends keyof T>(index: number, propertyName: K, newValue: T[K]) => void,
  clear: () => void
];

const useObjectArray = <T extends ObjectType>(initialArray: T[]): useObjectArrayReturn<T> => {
  const [array, setArray] = useState<T[]>(initialArray);

  const removeItem = (index: number) =>
    setArray((prevValue) => prevValue.filter((_, i) => i !== index));
  const addItem = (item: T) => setArray((prevValue) => prevValue.concat(item));
  const updatePropertyValue = (index: number, propertyName: keyof T, newValue: T[keyof T]) =>
    setArray((prevValue) =>
      prevValue.map((item, i) => (i === index ? { ...item, [propertyName]: newValue } : item))
    );

  const clear = () => setArray([]);

  return [array, setArray, addItem, removeItem, updatePropertyValue, clear];
};

export default useObjectArray;
