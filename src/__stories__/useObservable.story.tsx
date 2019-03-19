import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useObservable} from '..';
import ShowDocs from '../util/ShowDocs';
import {BehaviorSubject} from 'rxjs';

const counter$ = new BehaviorSubject(0);
const Demo = () => {
  const value = useObservable(counter$, 0);

  return (
    <button onClick={() => counter$.next(value! + 1)}>
      Clicked {value} times
    </button>
  );
};

storiesOf('State|useObservable', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useObservable.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
