import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useTween } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const t = useTween();

  return <div>Tween: {t}</div>;
};

storiesOf('Animation/useTween', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useTween.md')} />)
  .add('Demo', () => <Demo />);
