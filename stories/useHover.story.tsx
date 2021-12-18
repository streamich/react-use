import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useHover } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const element = (hasHovered: boolean) => <div>Hover me! {hasHovered && 'Thanks!'}</div>;
  const [hoverable, hovered] = useHover(element);

  return (
    <div>
      {hoverable}
      <div>{hovered ? 'HOVERED' : ''}</div>
    </div>
  );
};

storiesOf('Sensors/useHover', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useHover.md')} />)
  .add('Demo', () => <Demo />);
