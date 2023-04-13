

interface pagenation {
    current: Number;
    pageSize: Number;
    total: Number;
    data: Array<any> | null;
    onChange: Function;
    run: Function;
}

export default class CreatePagenation {
    current: Number;
    pageSize: Number;
    total: Number;
    request: (params: any) => Promise<any>;
    options: any;
    updateFunc: Function;
    data: Array<any> | null;
    loading: Boolean;
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

    getData: Function = (params: any = {}) => {
        const { dataKey = 'data', currentKey = 'size', sizeKey = 'page', totalKey = 'total' } = this.options;
        const newParams: any = Object.assign(params, {
            [currentKey]: this.current,
            [sizeKey]: this.pageSize,
        });
        const updateFunc = this.updateFunc;
        const that = this;
        this.loading = true;
        this.request(newParams).then((res) => {
            const data = typeof dataKey === 'function' ? dataKey(res) : res[dataKey];
            const pageSize = res[currentKey] || this.pageSize;
            const current = res[sizeKey] || this.current;
            const total = (typeof totalKey === 'function' ? totalKey(res) : res[totalKey]) || this.total;
            that.data = data;
            that.pageSize = pageSize;
            that.current = current;
            that.total = total;
            that.loading = false;
            updateFunc();
        });
        updateFunc();
    }

    reset: Function = (): void => {
        const { defaultcurrent, defaultPageSize } = this.options;
        this.current = defaultcurrent || 1;
        this.pageSize = defaultPageSize || 20;
        this.total = 0;
        this.data = [];
        this.updateFunc();
    }

    onChange: Function = (current: Number, pageSize: Number) => {
        const isUpdate = this.current !== current || this.pageSize !== pageSize;
        this.current = current;
        this.pageSize = pageSize;
        if (isUpdate) {
            this.getData();
        }
    }
    getPagenation: Function = (): pagenation => {
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