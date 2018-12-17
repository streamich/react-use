import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useAdopt} from '..';
import {useState} from 'react';
import ShowDocs from '../util/ShowDocs';
import {Spring} from 'react-spring';

const FaCC = ({children}) => {
  return children('VALUE-FaCC');
};
const RenderProp = ({render}) => {
  return render('VALUE-RenderProp');
};

let values = [];
let cnt = 0;
const Spring2 = (props) => {
  if (cnt < 100) {
    props.children(...values);
    cnt++;
  }
  return <Spring {...props}>{(...res) => {
    values = res as any;
    return null;
  }}</Spring>
};

let cnt2 = 0;

const Spring3 = (props) => {
  const [state, set] = useState<any[]>([]);

  return (
    <Spring {...props}>{(...data) => {
      setTimeout(() => {
        set(data);
        props.children(...data);
      }, 1);
      return null;
    }}</Spring>
  );
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

const AnimationSpring = () => {
  const style = {
    width: 200,
    height: 200,
    borderRadius: '100px',
    left: 50,
    position: 'fixed',
    background: 'red',
  };

  return (
    <Spring3 from={{top: 0}} to={{top: 200}}>{(data) =>
      <div style={{...style, ...data} as any} />
    }</Spring3>
  );
};

const Animation = () => {
  const [fragments, res] = useAdopt({animation: <Spring3 from={{top: 0}} to={{top: 200}}/>});
  const style = {
    width: 200,
    height: 200,
    borderRadius: '100px',
    left: 50,
    position: 'fixed',
    background: 'red',
  };

  return (
    <>
      {fragments}
      <div style={{...style, ...res.animation[0]} as any} />
    </>
  );
};

storiesOf('State/useAdopt', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useAdopt.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
  .add('AnimationSpring', () =>
    <AnimationSpring/>
  )
  .add('Animation', () =>
    <Animation/>
  )
