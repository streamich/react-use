import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRafState, useMount } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, setState] = useRafState({ x: 0, y: 0 });

  useMount(() => {
    const onMouseMove = (event: MouseEvent) => {
      setState({ x: event.clientX, y: event.clientY });
    };
    const onTouchMove = (event: TouchEvent) => {
      setState({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
    };
  });

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

storiesOf('State/useRafState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useRafState.md')} />)
  .add('Demo', () => <Demo />);
