import { useState } from 'react';

interface Options {
    dataKey?: string | ((res: any) => void);
    currentKey?: string;
    sizeKey?: string;
    totalKey?: string | ((res: any) => void);
    defaultCurrent?: number;
    defaultPageSize?: number;
    defaultTotal?: number;
    isAutostart?: boolean;
}

interface Pagination {
    current: number;
    pageSize: number;
    total: number;
    data: any[];
    onChange: (current: number, pageSize: number) => void;
    run: (params?: any) => void;
    reset: () => void,
    loading: boolean,
}


export default function usePagination(request: (params: any) => Promise<any>, opts: Options): Pagination {
    const {
        defaultCurrent,
        defaultPageSize,
        defaultTotal,
        dataKey = 'data', 
        currentKey = 'size', 
        sizeKey = 'page', 
        totalKey = 'total',
    }: Options = opts;
    const [pagination, setPagination] = useState({
        current: defaultCurrent || 1,
        pageSize: defaultPageSize || 20,
        total: defaultTotal || 0,
    });
    const [loading, setLoading]= useState(false);
    const [data, setData]: any = useState([]);

    function queryData(params: any = {}) {
        const newParams: any = Object.assign(params, {
            [currentKey]: params.current || pagination.current,
            [sizeKey]: params.pageSize || pagination.pageSize,
        });
      
        setLoading(true);
        request(newParams).then((res: any): void => {
            const data: any[] = typeof dataKey === 'function' ? dataKey(res) : res[dataKey];
            const pageSize = res[currentKey] || pagination.pageSize;
            const current = res[sizeKey] || pagination.current;
            const total = (typeof totalKey === 'function' ? totalKey(res) : res[totalKey]) || pagination.total;
            pagination.pageSize = pageSize;
            pagination.current = current;
            pagination.total = total;

            setPagination({...pagination});
            setData(data)
            setLoading(false);
        });
    }

    function reset(): void {
        pagination.current = defaultCurrent || 1;
        pagination.pageSize = defaultPageSize || 20;
        pagination.total = 0;

        setPagination({...pagination});
        setData([]);
    }

    function onChange(current: number, pageSize: number) {
        const isUpdate = pagination.current !== current || pagination.pageSize !== pageSize;
        pagination.current = current;
        pagination.pageSize = pageSize;
        if (isUpdate) {
            queryData(pagination);
        }
    }
    return {
        ...pagination,
        data,
        onChange,
        reset,
        loading,
        run: queryData,
    };
}
