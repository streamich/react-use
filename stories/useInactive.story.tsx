import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useInactive } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo: React.FC<any> = () => {
  const timer = useInactive(8);
  if (timer == 0) {
    return <div>Logged Out</div>;
  }

  if (timer < 8) {
    return <div>In {timer} seconds you will be automatically logged out</div>;
  }
  return <div>Signed in</div>;
};

storiesOf('UI/useInactive', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useInactive.md')} />)
  .add('Demo', () => <Demo />);
