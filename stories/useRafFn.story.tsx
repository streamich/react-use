import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useRafFn from '../src/useRafFn';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [elapsed, rafProps] = useRafFn(5000);

  rafProps.useOnComplete(() => {
    console.log('animate completed');
  })

  return (
    <div>
      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#3cf',
          transform: `translateX(${elapsed * 500}px)`
        }} />
      <ul>
        <li>elapsed: {elapsed}</li>
        <li>paused: {rafProps.paused.toString()}</li>
        <li>completed: {rafProps.completed.toString()}</li>
      </ul>
      <div>
        <input
          type="range"
          min={0} max={1} step={0.01}
          value={elapsed}
          onChange={e => rafProps.seek(+e.target.value)}
        />
      </div>
      <button onClick={rafProps.play}>play</button>
      <button onClick={rafProps.pause}>pause</button>
      <button onClick={rafProps.stop}>stop</button>
      <button onClick={rafProps.restart}>restart</button>
      <button onClick={rafProps.reverse}>reverse</button>
    </div>
  );
};

storiesOf('Animation|useRafFn', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useRafFn.md')} />)
  .add('Demo', () => <Demo />);
