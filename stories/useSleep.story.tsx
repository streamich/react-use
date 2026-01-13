import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSleep } from '../src';
import ShowDocs from './util/ShowDocs';

function TestComponent() {
  const [isReady, setReady] = React.useState(true);
  const sleep = useSleep();

  return (
    <div>
      {isReady && (
        <button
          onClick={async () => {
            setReady(false);
            await sleep(3000);
            setReady(true);
          }}>
          Please, click me!
        </button>
      )}
      {!isReady && <span>Thanks!</span>}
    </div>
  );
}

const Demo = () => {
  return (
    <div>
      <TestComponent />
    </div>
  );
};

storiesOf('Side effects/useSleep', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSleep.md')} />)
  .add('Demo', () => {
    return <Demo />;
  });
