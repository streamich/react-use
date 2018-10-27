import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useHover} from '..';

const Demo = () => {
  const element = (hovered: boolean) =>
    <div>
      Hover me! {hovered && 'Thanks!'}
    </div>;
  const [hoverable, hovered] = useHover(element);

  return (
    <div>
      {hoverable}
      <div>{hovered ? 'HOVERED' : ''}</div>
    </div>
  );
};

storiesOf('useHover', module)
  .add('Example', () =>
    <Demo/>
  )
