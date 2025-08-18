import { useEffect, useState } from 'react';

const useArrayMemo = (obj, fn) => {
  const [prevObj, setPrevObj] = useState(obj);
  const [memoObj, setMemoObj] = useState(() => {
    return obj.map((v, i) => fn(v, i));
  });

  useEffect(() => {
    if (obj === prevObj) return;
    setPrevObj(obj);

    setMemoObj((memoObj) => {
      return obj.map((v, i) => {
        const index = prevObj.findIndex((pv) => pv === v);
        if (index >= 0) return memoObj[index];
        return fn(v, i);
      });
    });
  }, [fn, obj, prevObj, setMemoObj, setPrevObj]);

  return memoObj;
};

export default useArrayMemo;
