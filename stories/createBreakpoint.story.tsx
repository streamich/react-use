import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { createBreakpoint } from '../src';
import ShowDocs from './util/ShowDocs';

const useBreakpointA = createBreakpoint();
const useBreakpointB = createBreakpoint({ mobileM: 350, laptop: 1024, tablet: 768 });

const Demo = () => {
  const breakpointA = useBreakpointA();
  const breakpointB = useBreakpointB();
  return (
    <div>
      <p>{'try resize your window'}</p>
      <p>{'createBreakpoint() #default : { laptopL: 1440, laptop: 1024, tablet: 768 }'}</p>
      <p>{breakpointA}</p>
      <p>{'createBreakpoint({ mobileM: 350, laptop: 1024, tablet: 768 })'}</p>
      <p>{breakpointB}</p>
    </div>
  );
};

storiesOf('sensors/createBreakpoint', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../docs/createBreakpoint.md')} />)
  .add('Demo', () => {
    return <Demo />;
  });
