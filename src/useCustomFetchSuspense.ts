import produce from 'immer';
import lru from 'lru-cache';
import md5 from 'md5';

const fetchData = (url: RequestInfo, options: RequestInit | undefined = {}) => {
    return fetch(url, options).then(res => res.json());
}

const cache = new lru(50);

export const useCustomFetchSuspense = (url: RequestInfo, options: RequestInit | undefined = {}) => {
    const key = `${url}.${md5(JSON.stringify(options))}`;

    const value: any = cache.get(key) || { status: 'new', data: null }

    if(value.status === 'resolved'){
        return value.data;
    }

    const promise = fetchData(url, options);

    promise.then(data => {
        cache.set(key, produce(value, (draft: any) => {
            draft.status = 'resolved';
            draft.data = data;
        }));
    })

    throw promise; // will be caught by suspense
}