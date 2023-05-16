import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import CreatePagenation from './createPagenation';

interface Options {
    dataKey?: string;
    currentKey?: string;
    sizeKey?: string;
    totalKey?: string;
    defaultCurrent?: string;
    defaultPageSize?: string;
    isAutostart?: boolean;
}



export default function usePagenation(request: (params: any) => Promise<any>, opts: Options) {
    const pagenation: null | any = useRef(null);
    const [, update] = useState(0);

    const updateFunc = useCallback(() => {
        return update((count) => ++count);
    }, []);

    useLayoutEffect(() => {
        const {isAutostart=true} = opts;
        if(isAutostart) {
            pagenation.current.getPagenation().run();
        }
    }, []);

    if (pagenation.current === null) {
        pagenation.current = new CreatePagenation({ request, opts, updateFunc })
    }

    return pagenation.current ? pagenation.current.getPagenation() : {};
}
