import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useRenderProp} from '..';
import ShowDocs from '../util/ShowDocs';

const FaCC = ({children}) => {
  return children('VALUE-FaCC');
};
const RenderProp = ({render}) => {
  return render('VALUE-RenderProp');
};

const Demo = () => {
  const [fragment1, [value1]] = useRenderProp(<FaCC />);
  const [fragment2, [value2]] = useRenderProp(<RenderProp />);

  return (
    <>
      {fragment1}
      {fragment2}
      <div>FaCC: {value1}</div>
      <div>Render prop: {value2}</div>
    </>
  );
};

storiesOf('State/useRenderProp', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useRenderProp.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
