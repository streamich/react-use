import { storiesOf } from '@storybook/react';
import React, { Suspense } from 'react';
import { useCustomFetchSuspense } from '../src';
import ShowDocs from './util/ShowDocs';

const BostonRoutes = () => {

    const res = useCustomFetchSuspense(`https://api-v3.mbta.com/routes`);

    return (
        <div className='container'>
            <ul className='collection'>
                { res.data.map(data => <li className='collection-item' key={data.id}>
                    { data.attributes.long_name }
                </li>) }
            </ul>
        </div>
    )
}

const Preloader = () => <h2>Loading...</h2>

const Demo = () => {

  return (
      <Suspense fallback={<Preloader />}>
          <BostonRoutes />
      </Suspense>
  );
};

storiesOf('Supense|useCustomFetchSuspense', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCustomFetchSuspense.md')} />)
  .add('Demo', () => {
    return <Demo />;
  });
