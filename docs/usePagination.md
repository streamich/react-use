# `usePagination`

## pagination

```jsx
import {usePagination} from 'react-use';

const Demo = () => {
 const pagination = usePagination(async (params: any) => {
        console.log(params); // curent 1, pageSize 20,
        const res = await queryData(params);

        return res;
    }, {});
};
```

```jsx
import {usePagination} from 'react-use';
const data = [
    {
        name: '小明',
        age: 18,
        sex: '男',
    },
    {
        name: '小红',
        age: 18,
        sex: '女',
    },
];

const Demo = () => {
    const pagination = usePagination(queryData, {});
    function queryData() {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000, {total: 2, data});
        });
    }
    function change() {
        pagination.onChange(2, 40);
    }
    return <div>
        <Button onClick={() => pagination.run()}>click</Button>
        <Button onClick={change}>change</Button>
        {pagination.loading === true ? <div>loading....</div> : null}
        <span>current: {pagination.current}</span>
        <span>pageSize: {pagination.pageSize}</span>
    </div>
};

```
