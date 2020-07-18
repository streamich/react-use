## useFetchSuspense

That hassle free hook which takes care of all that loading/loaded state hack we have to do while doing intensive cpu calculations, recursion for eg.

useFunction takes the function to be executed as an argument and returns either a promise if function is not finished executing which is caught by React Suspense which renders fallback, or the result of the function.

Until the function is done executing, the suspense will catch the promise thrown by useFunction and will render fallback, which can by any Loading component of your choice. After the promise is resolved, suspense will then render the component with the data provied by the calling function.
Also, it has been made sure that it doesn't make the same function call  again and again. For this, data is stored in cache.

### Usage

```js
export function fib(num){
    if(num <= 1){
        return num;
    }
    return fib(num - 1) + fib(num - 2);
}


const Fibonacci = ({ num }) => {

    const result = useFunction(fib, [num]);

    return (
        <div>
            <h4>
            Fibonacci For {num} = {'    '} 
             <strong className='red-text'>{result}</strong>
            </h4>
        </div>
    )
}

const Preloader = () => {
    return (
        <p>Loading...</p>
    )
}

const Demo = () => {
    return (
        <React.Fragment>

        <React.Suspense fallback={<Preloader />}>
            <Fibonacci num={5} />
        </React.Suspense>
        <React.Suspense fallback={<Preloader />}>
            <Fibonacci num={10} />
        </React.Suspense>

        </React.Fragment>
    )
}

```