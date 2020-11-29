import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useSpring from '../src/useSpring';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [target, setTarget] = (React as any).useState(50);
  const value = useSpring(target);

  return (
    <div>
      {value}
      <br />
      <button onClick={() => setTarget(0)}>Set 0</button>
      <button onClick={() => setTarget(100)}>Set 100</button>
    </div>
  );
};

storiesOf('Animation/useSpring', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSpring.md')} />)
  .add('Demo', () => <Demo />);
