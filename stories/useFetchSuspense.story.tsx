import { storiesOf } from '@storybook/react';
import * as React from 'react';
import {useFetchSuspense} from '../src/useFetchSuspense';
import ShowDocs from './util/ShowDocs';

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

const Demo = () => {
    return (
        <React.Suspense fallback={<Preloader />}>
            <BostonRoutes />
        </React.Suspense>
    )
}

storiesOf('State|useFetchSuspense', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useFetchSuspense.md')} />)
  .add('Demo', () => <Demo />);
