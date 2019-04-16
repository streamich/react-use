import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { useRef } from 'react'
import { useResizeObserver } from '..'
import ShowDocs from './util/ShowDocs'

const Demo = () => {
  const ref = useRef(null)
  const { width, height } = useResizeObserver(ref)

  return (
    <div>
      <div style={{ border: '1px solid red' }} ref={ref}>
        Size me up! ({width}px)
      </div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  )
}

storiesOf('Sensors|useSize', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useResizeObserver.md')} />)
  .add('Demo', () => <Demo />)
