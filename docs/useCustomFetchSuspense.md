## useCustomFetchSuspense

- This hooks is also published to [npm](https://www.npmjs.com/package/use-custom-fetch-suspense)

- That hassle free hook which takes care of all that loading/loaded state hack we have to do while making ajax calls in React.JS.

- useCustomFetchSuspense plays along with React Suspense and under the hood with cache management packages

```js
lru-cache, immer, md5 etc.
```

- Until the data is fetched, the suspense will catch the promise thrown by useCustomFetchSuspense and will render fallback, which can by any Loading component of your choice. After the promise is resolved, suspense will then render the component.
Also, it has been made sure that it doesn't make the same ajax call request again and again. For this, data is stored in cache.

### Usage

```js

// Ajax call without any useEffect or unecessary loading/loaded state handling thing.
import { useFetchSuspense } from 'react-use';

const SomeThang = () => {

    const res = useFetchSuspense(`https://some-api.com`);
    console.log(res)   // our data

    return (
        <div className='container'>
        <h1>useCustomFetchSuspense demo</h1>
            <ol className='collection'>
                { res.data.map(data => <li className='collection-item' key={data.id}>
                    { data.title }
                </li>) }
            </ol>
        </div>
    )
}

const Preloader = () => {
    return (
        <p>Loading...</p>
    )
}

// Loading our component with React Suspense
const Demo = () => {
    return (
        // Preloader will be rendered until our data is fetched
        <React.Suspense fallback={<Preloader />}>
            <SomeThang />
        </React.Suspense>
    )
}
```

