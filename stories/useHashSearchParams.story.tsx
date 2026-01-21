import { storiesOf } from '@storybook/react';
import React, {useRef} from 'react';
import { useHash, useHashSearchParams, useMount } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [, setHash] = useHash();
  const [searchParams, setSearchParams] = useHashSearchParams()
  const keyRef = useRef<HTMLInputElement>()
  const valueRef = useRef<HTMLInputElement>()

  useMount(() => {
    setHash('#/path/to/page?id=1&name=jim');
  });

  return (
    <div>
      <div>window.location.hash:</div>
      <div>
        <pre>{window.location.hash}</pre>
      </div>
      <div>Edit hash: </div>
      <div>
        {Object.keys(searchParams).map(key => {
          const value = searchParams[key]
          return (
            <div>
              <label style={styles.label}>{key} </label>
              <input value={value} onChange={e => setSearchParams({ ...searchParams, [key]: e.target.value })} />
              <button onClick={() => {
                const cloneSearchParams = { ...searchParams }
                Reflect.deleteProperty(cloneSearchParams, key)
                setSearchParams(cloneSearchParams)
              }}>Delete</button>
            </div>
          )
        })}
        <input ref={keyRef} placeholder='input key' style={styles.labelInput} />{" "}
        <input ref={valueRef} placeholder='input value' />
        <button onClick={() => {
          const key = keyRef.current?.value
          const value = valueRef.current?.value
          if (!key) return
          keyRef.current.value = ''
          valueRef.current.value = ''
          setSearchParams({ ...searchParams, [key]: value })
        }}>Add</button>
      </div>
    </div>
  );
};

const styles = {
  label: {
    minWidth: 100,
    display: 'inline-block'
  },
  labelInput: {
    maxWidth: 100,
    boxSizing: 'border-box'
  }
}

storiesOf('Sensors|useHashSearchParams', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useHashSearchParams.md')} />)
  .add('Demo', () => <Demo />);
