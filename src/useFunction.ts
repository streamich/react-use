import produce from 'immer'
import lru from 'lru-cache'
import md5 from 'md5'
import workerpool from 'workerpool'

const cache = new lru(50);
const pool = new workerpool.pool();

export const useFunction = (func, args) => {
    const key = `${func.name}.${md5(JSON.stringify(args))}`;

    const value = cache.get(key) || { status: 'new', data: null }

    if(value.status === 'resolved'){
        return value.data;
    }

    cache.set(key, value);

    const promise = pool.exec(func, args);

    promise.then(data => {
        cache.set(key, produce(value, draft => {
            draft.status = 'resolved';
            draft.data = data;
        }));
    })

    throw promise; // will be caught by suspense
}