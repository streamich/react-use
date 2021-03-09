import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useHarmonicIntervalFn, useInterval, useTimeoutFn } from '../src';
import ShowDocs from './util/ShowDocs';

const Clock: React.FC<{ useInt: typeof useHarmonicIntervalFn }> = ({ useInt }) => {
  const [count, setCount] = React.useState(0);
  useInt(() => {
    setCount((cnt) => cnt + 1);
  }, 1000);

  let m: number | string = Math.floor(count / 60);
  let s: number | string = count % 60;

  m = m < 10 ? '0' + m : String(m);
  s = s < 10 ? '0' + s : String(s);

  const style: React.CSSProperties = {
    padding: '20px 5px',
    border: '1px solid #fafafa',
    float: 'left',
    fontFamily: 'monospace',
  };

  return <div style={style}>{m + ':' + s}</div>;
};

const Demo: React.FC<{ useInt: typeof useHarmonicIntervalFn }> = ({ useInt }) => {
  const [showSecondClock, setShowSecondClock] = React.useState(false);
  useTimeoutFn(() => {
    setShowSecondClock(true);
  }, 500);

  const headingStyle: React.CSSProperties = {
    fontFamily: 'sans',
    fontSize: '20px',
    padding: '0',
    lineHeight: '1.5em',
  };

  const rowStyle: React.CSSProperties = {
    width: '100%',
    clear: 'both',
  };

  return (
    <>
      <div style={rowStyle}>
        <h2 style={headingStyle}>{useInt.name}</h2>
        <Clock useInt={useInt} />
        {showSecondClock ? <Clock useInt={useInt} /> : null}
      </div>
    </>
  );
};

storiesOf('Animation/useHarmonicIntervalFn', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useHarmonicIntervalFn.md')} />)
  .add('Demo', () => (
    <>
      <Demo useInt={useInterval} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Demo useInt={useHarmonicIntervalFn} />
    </>
  ));
