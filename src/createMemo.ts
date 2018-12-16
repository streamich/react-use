import {useMemo} from 'react';

const createMemo = fn => (...args) => useMemo(() => fn(...args), args);

export default createMemo;
