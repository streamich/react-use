import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { usePinchZoom } from '../src';
import { ZoomState } from '../src/usePinchZoom';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [scale, setState] = useState(1);
  const scaleRef = useRef();
  const { zoomingState, pinchState } = usePinchZoom(scaleRef);

  useEffect(() => {
    if (zoomingState === ZoomState.ZOOMING_IN) {
      // perform zoom in scaling
      setState(scale + 0.1);
    } else if (zoomingState === ZoomState.ZOOMING_OUT) {
      // perform zoom out in scaling
      setState(scale - 0.1);
    }
  }, [zoomingState, pinchState]);

  return (
    <div ref={scaleRef}>
      <img
        src="https://www.olympus-imaging.co.in/content/000107506.jpg"
        style={{
          zoom: scale,
        }}
        alt="scale img"
      />
    </div>
  );
};

storiesOf('Sensors/usePinchZoom', module)
  .add('Docs', () => <ShowDocs md={require('../docs/usePinchZoom.md')} />)
  .add('Default', () => <Demo />);
