import { storiesOf } from '@storybook/react';
import React from 'react';
import { useScript } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { ready, failed } = useScript('https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.1.js', {
    onload: () => console.log('load success'),
    onerror: (...args) => console.log(args),
    id: `jquery`
  })

  const w: Window & { $?: any } = window;
  const hasJquery = !!(w.$);
  return (
    <div>
      <span>sript ready: {ready.toString()}</span>
      <br />
      <span>script load failed: {failed.toString()}</span>
      <br />
      <span>juqery $ mounted: {hasJquery.toString()}</span>
    </div>
  );
};

storiesOf('State|useScript', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScript.md')} />)
  .add('Demo', () => <Demo />);
