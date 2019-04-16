import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { useForceUpdate } from '..'
import ShowDocs from './util/ShowDocs'

const Demo = () => {
  const forceUpdate = useForceUpdate()

  return (
    <div>
      {Math.random()}
      <button onClick={forceUpdate}>Force update</button>
    </div>
  )
}

storiesOf('Sensors|useSize', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useForceUpdate.md')} />)
  .add('Demo', () => <Demo />)
