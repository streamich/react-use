import { storiesOf } from '@storybook/react';
import React, { forwardRef, useRef, useState, useEffect, MutableRefObject } from 'react';
import { useEnsuredForwardedRef } from '../src';
import ShowDocs from './util/ShowDocs';

import { boolean, withKnobs } from '@storybook/addon-knobs';

const INITIAL_SIZE = {
  width: null,
  height: null,
};

const Demo = ({ activeForwardRef }) => {
  const ref = useRef(null);

  const [size, setSize] = useState(INITIAL_SIZE);

  useEffect(() => {
    handleClick();
  }, [activeForwardRef]);

  const handleClick = () => {
    if (activeForwardRef) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({
        width,
        height,
      });
    } else {
      setSize(INITIAL_SIZE);
    }
  };

  return (
    <>
      <button onClick={handleClick} disabled={!activeForwardRef}>
        {activeForwardRef ? 'Update parent component' : 'forwardRef value is undefined'}
      </button>
      <div>Parent component using external ref: (textarea size)</div>
      <pre>{JSON.stringify(size, null, 2)}</pre>
      <Child ref={activeForwardRef ? ref : undefined} />
    </>
  );
};

const Child = forwardRef(({}, ref: MutableRefObject<HTMLTextAreaElement>) => {
  const ensuredForwardRef = useEnsuredForwardedRef(ref);

  const [size, setSize] = useState(INITIAL_SIZE);

  useEffect(() => {
    handleMouseUp();
  }, []);

  const handleMouseUp = () => {
    const { width, height } = ensuredForwardRef.current.getBoundingClientRect();
    setSize({
      width,
      height,
    });
  };

  return (
    <>
      <div>Child forwardRef component using forwardRef: (textarea size)</div>
      <pre>{JSON.stringify(size, null, 2)}</pre>
      <div>You can resize this textarea:</div>
      <textarea ref={ensuredForwardRef} onMouseUp={handleMouseUp} />
    </>
  );
});

storiesOf('Miscellaneous/useEnsuredForwardedRef', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../docs/useEnsuredForwardedRef.md')} />)
  .add('Demo', () => {
    const activeForwardRef = boolean('activeForwardRef', true);
    return <Demo activeForwardRef={activeForwardRef} />;
  });
