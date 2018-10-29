import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useAdopt} from '..';
import ShowDocs from '../util/ShowDocs';

const FaCC = ({children}) => {
  return children('VALUE-FaCC');
};
const RenderProp = ({render}) => {
  return render('VALUE-RenderProp');
};

const Demo = () => {
  const [fragment, result] = useAdopt({
    facc: <FaCC/>,
    renderProp: <RenderProp/>,
  });

  return (
    <>
      {fragment}
      <div>FaCC: {result.facc[0]}</div>
      <div>Render prop: {result.renderProp[0]}</div>
    </>
  );
};

storiesOf('useAdopt', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAdopt.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
