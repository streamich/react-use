import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import ShowDocs from './util/ShowDocs';
import { useRafEffect } from '../src';

const Demo = () => {
  const canvasRef = useRef();

  const [color1, setColor1] = useState('#f0f');
  const [color2, setColor2] = useState('#0f0');
  const [alpha, setAlpha] = useState('1');

  useRafEffect(
    (time) => {
      console.log('timestamp from window.requestAnimationFrame() start is ' + time);

      // Everything below is general canvas stuff and not specific to the hook
      const canvasContext = canvasRef.current.getContext('2d');

      // Canvas by default renders at 1x pixel ratio (blurry on retina 2x)
      const pixelRatio = window.devicePixelRatio || 1;
      canvasRef.current.setAttribute('width', 600 * pixelRatio);
      canvasRef.current.setAttribute('height', 600 * pixelRatio);
      canvasContext.scale(pixelRatio, pixelRatio);
      canvasRef.current.style.width = '600px';
      canvasRef.current.style.height = '600px';

      canvasContext.clearRect(0, 0, 600, 600);

      canvasContext.globalAlpha = alpha;

      canvasContext.fillStyle = color1;
      canvasContext.fillRect(300, 300, 300, 300);
      canvasContext.fillStyle = color2;
      canvasContext.fillRect(0, 0, 300, 300);
      canvasContext.fillStyle = '#000';
      canvasContext.font = '11px Helvetica';
      canvasContext.fillText('useRafEffect time argument: ' + time, 0, 590);

      return (time) => {
        // This is optional
        console.log('timestamp from window.requestAnimationFrame() cleanup is ' + time);
      };
    },
    [color1, color2, alpha]
  );

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="color1">First color</label>
        <input
          id="color1"
          value={color1}
          onChange={(e) => {
            setColor1(e.target.value);
          }}
          style={{ marginLeft: '10px', marginRight: '45px' }}
        />
        <label htmlFor="color2">Second color</label>
        <input
          id="color2"
          value={color2}
          onChange={(e) => {
            setColor2(e.target.value);
          }}
          style={{ marginLeft: '10px', marginRight: '45px' }}
        />
        <label htmlFor="alpha">Alpha</label>
        <input
          id="alpha"
          type="range"
          min="0"
          max="1"
          step="0.005"
          value={alpha}
          onChange={(e) => {
            setAlpha(e.target.value);
          }}
          style={{ marginLeft: '10px' }}
        />
      </div>
      <canvas ref={canvasRef} width={600} height={600}></canvas>
    </div>
  );
};

storiesOf('Animation|useRafEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useRafEffect.md')} />)
  .add('Demo', () => <Demo />);
