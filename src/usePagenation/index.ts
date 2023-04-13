import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import CreatePagenation from './createPagenation';

interface options {
    dataKey?: String;
    currentKey?: String;
    sizeKey?: String;
    totalKey?: String;
    defaultCurrent?: String;
    defaultPageSize?: String;
    isAutostart?: Boolean;
}



export default function usePagenation(request: (params: any) => Promise<any>, opts: options) {
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
