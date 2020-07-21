import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCustomFetchSuspense } from '../src';
import ShowDocs from './util/ShowDocs';

const BostonRoutes = () => {

  const res = useCustomFetchSuspense(`https://api-v3.mbta.com/routes`);

  return (
      <div className='container'>
      <h1>useCustomFetchSuspense</h1>
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

storiesOf('Suspense|useCustomFetchSuspense', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCustomFetchSuspense.md')} />)
  .add('Demo', () => <Demo />);
