import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean} from '@storybook/addon-knobs';
import * as React from 'react';
import {useCounter} from '..';
import {useLogger} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = (props) => {
  const [state, {inc}] = useCounter(0);

  useLogger('Demo', props, state);

  return (
    <>
      <p style={{fontWeight: props.bold ? 'bold' : 'normal'}}>
        {props.title}
      </p>
      <button onClick={() => inc()}>
        Update state ({state})
      </button>
    </>
  );
};

storiesOf('Lifecycles|useLogger', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../../docs/useLogger.md')} />)
  .add('Demo', () => {
    const props = {
      title: text('title', 'Open the developer console to see logs'),
      bold: boolean('bold', false),
    }

    return <Demo {...props} />
  })
