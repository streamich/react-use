# `usePagenation`

## pagenation

```jsx
import {usePagenation} from 'react-use';

const Demo = () => {
 const pagenation = usePagenation(async (params: any) => {
        console.log(params); // curent 1, pageSize 20,
        const res = await queryData(params);

        return res;
    }, {});
};
```

```jsx
import {usePagenation} from 'react-use';
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
    const pagenation = usePagenation(queryData, {});
    function queryData() {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000, {total: 2, data});
        });
    }
    function change() {
        pagenation.onChange(2, 40);
    }
    return <div>
        <Button onClick={() => pagenation.run()}>click</Button>
        <Button onClick={change}>change</Button>
        {pagenation.loading === true ? <div>loading....</div> : null}
        <span>current: {pagenation.current}</span>
        <span>pageSize: {pagenation.pageSize}</span>
    </div>
};

```
