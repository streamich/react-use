import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useScrollbarWidth } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const sbw = useScrollbarWidth();

  return (
    <div>
      {sbw === undefined
        ? `DOM is not ready yet, SBW detection delayed`
        : `Browser's scrollbar width is ${sbw}px`}
    </div>
  );
};

storiesOf('Sensors/useScrollbarWidth', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScroll.md')} />)
  .add('Demo', () => <Demo />);
