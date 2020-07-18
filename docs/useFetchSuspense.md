## useFetchSuspense

That hassle free hook which takes care of all that loading/loaded state hack we have to do while making ajax calls in React.JS.

useFetchSuspense fetches third party API data via ajax calls using React Suspense.

Until the data is fetched, the suspense will catch the promise thrown by useFetchSuspense and will render fallback, which can by any Loading component of your choice. After the promise is resolved, suspense will then render the component.
Also, it has been made sure that it doesn't make the same ajax call request again and again. For this, data is stored in cache.

### Usage

```js

// Ajax call without any useEffect or  unecessary loading/loaded state handling thing.
const BostonRoutes = () => {

    const res = useFetchSuspense(`https://api-v3.mbta.com/routes`);

    return (
        <div className='container'>
        <h1>Boston Routes</h1>
            <ol className='collection'>
                { res.data.map(data => <li className='collection-item' key={data.id}>
                    { data.attributes.long_name }
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
        <React.Suspense fallback={<Preloader />}>
            <BostonRoutes />
        </React.Suspense>
    )
}
```