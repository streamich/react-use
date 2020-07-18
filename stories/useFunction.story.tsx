import { storiesOf } from '@storybook/react';
import * as React from 'react';
import {useFunction} from '../src/useFunction';
import ShowDocs from './util/ShowDocs';

function fib(num){
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

storiesOf('State|useFunction', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useFunction.md')} />)
  .add('Demo', () => <Demo />);

