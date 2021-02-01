import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useIntersection } from '../src';
import ShowDocs from './util/ShowDocs';

const Spacer = () => (
  <div
    style={{
      width: '200px',
      height: '300px',
      backgroundColor: 'whitesmoke',
    }}
  />
);

const Demo = () => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        backgroundColor: 'whitesmoke',
        overflow: 'scroll',
      }}>
      Scroll me
      <Spacer />
      <div
        ref={intersectionRef}
        style={{
          width: '100px',
          height: '100px',
          padding: '20px',
          backgroundColor: 'palegreen',
        }}>
        {intersection && intersection.intersectionRatio < 1 ? 'Obscured' : 'Fully in view'}
      </div>
      <Spacer />
    </div>
  );
};

storiesOf('Sensors/useIntersection', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useIntersection.md')} />)
  .add('Demo', () => <Demo />);
