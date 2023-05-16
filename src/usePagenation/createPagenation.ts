

interface Pagenation {
    current: number;
    pageSize: number;
    total: number;
    data: any[] | null;
    onChange: any;
    run: any;
}

export default class CreatePagenation {
    current: number;
    pageSize: number;
    total: number;
    request: (params: any) => Promise<any>;
    options: any;
    updateFunc: any;
    data: any[] | null;
    loading: boolean;
    constructor({ request, options = {}, updateFunc }: any) {
        this.current = options.defaultcurrent || 1;
        this.pageSize = options.defaultPageSize || 20;
        this.total = 0;
        this.request = request;
        this.options = options;
        this.updateFunc = updateFunc;
        this.data = [];
        this.loading = false;
    }

    getData = (params: any = {}) => {
        const { dataKey = 'data', currentKey = 'size', sizeKey = 'page', totalKey = 'total' } = this.options;
        const newParams: any = Object.assign(params, {
            [currentKey]: this.current,
            [sizeKey]: this.pageSize,
        });
        const updateFunc = this.updateFunc;
        // const that = this;
        this.loading = true;
        
        const thenFunc = (res: any): void => {
            const data = typeof dataKey === 'function' ? dataKey(res) : res[dataKey];
            const pageSize = res[currentKey] || this.pageSize;
            const current = res[sizeKey] || this.current;
            const total = (typeof totalKey === 'function' ? totalKey(res) : res[totalKey]) || this.total;
            this.data = data;
            this.pageSize = pageSize;
            this.current = current;
            this.total = total;
            this.loading = false;
            updateFunc();
        }
        this.request(newParams).then(thenFunc);
        updateFunc();
    }

    reset = (): void => {
        const { defaultcurrent, defaultPageSize } = this.options;
        this.current = defaultcurrent || 1;
        this.pageSize = defaultPageSize || 20;
        this.total = 0;
        this.data = [];
        this.updateFunc();
    }

    onChange = (current: number, pageSize: number) => {
        const isUpdate = this.current !== current || this.pageSize !== pageSize;
        this.current = current;
        this.pageSize = pageSize;
        if (isUpdate) {
            this.getData();
        }
    }
    getPagenation = (): Pagenation => {
        const pagenation = {
            current: this.current,
            pageSize: this.pageSize,
            total: this.total,
            data: this.data,
            onChange: this.onChange,
            run: this.getData,
            loading: this.loading,
        };
        return pagenation;
    }
}