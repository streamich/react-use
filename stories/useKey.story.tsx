import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useKey } from '../src';
import { CenterStory } from './util/CenterStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount((currentCount) => ++currentCount);
  const decrement = () => setCount((currentCount) => --currentCount);
  const reset = () => setCount(() => 0);

  useKey(']', increment);
  useKey('[', decrement);
  useKey('r', reset);

  return (
    <CenterStory>
      <style dangerouslySetInnerHTML={{ __html: `code {color: red}` }} />
      <p>
        Try pressing <code>[</code>, <code>]</code>, and <code>r</code> to see the count incremented
        and decremented.
      </p>
      <p>Count: {count}</p>
    </CenterStory>
  );
};

const CounterDemo = () => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((currentCount) => ++currentCount);
  useKey('ArrowUp', increment);

  return <div>Press arrow up: {count}</div>;
};

storiesOf('Sensors/useKey', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useKey.md')} />)
  .add('Demo', () => <Demo />)
  .add('Simple counter', () => <CounterDemo />);
