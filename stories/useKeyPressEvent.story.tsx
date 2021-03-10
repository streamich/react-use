import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useKeyboardJs, useKeyPressEvent } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    console.log('INCREMENT');
    setCount((currentCount) => ++currentCount);
  };
  const decrement = () => {
    console.log('DECREMENT');
    setCount((currentCount) => --currentCount);
  };
  const reset = () => setCount(() => 0);

  useKeyPressEvent(']', increment);
  useKeyPressEvent('[', decrement);
  useKeyPressEvent('r', reset);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `code {color: red}` }} />
      <p>
        Try pressing <code>[</code>, <code>]</code>, and <code>r</code> to see the count incremented
        and decremented.
      </p>
      <p>Count: {count}</p>
    </div>
  );
};

const DemoKeyboardJs = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    console.log('INCREMENT');
    setCount((currentCount) => ++currentCount);
  };
  const decrement = () => {
    console.log('DECREMENT');
    setCount((currentCount) => --currentCount);
  };
  const reset = () => setCount(() => 0);

  useKeyPressEvent('q + ]', increment, increment, useKeyboardJs as any);
  useKeyPressEvent('q + [', decrement, decrement, useKeyboardJs as any);
  useKeyPressEvent('q + r', reset, null, useKeyboardJs as any);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `code {color: red}` }} />
      <p>
        Try pressing <code>q + [</code>, <code>q + ]</code>, and <code>q + r</code> to see the count
        incremented and decremented.
      </p>
      <p>Count: {count}</p>
    </div>
  );
};

storiesOf('Sensors/useKeyPressEvent', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useKeyPressEvent.md')} />)
  .add('Demo', () => <Demo />)
  .add('KeyboardJs', () => <DemoKeyboardJs />);
