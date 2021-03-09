import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BehaviorSubject } from 'rxjs';
import { useObservable } from '../src';
import ShowDocs from './util/ShowDocs';

const counter$ = new BehaviorSubject(0);
const Demo = () => {
  const value = useObservable(counter$, 0);

  return <button onClick={() => counter$.next(value! + 1)}>Clicked {value} times</button>;
};

storiesOf('State/useObservable', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useObservable.md')} />)
  .add('Demo', () => <Demo />);
