import {render} from './util';

render(({React, demo, lib}) => {
  const {useToggle} = lib;

  console.log('use', useToggle);
  const Demo = () => {
    const [on, toggle] = lib.useToggle(true);

    return (
      <div>
        <div>{on ? 'ON' : 'OFF'}</div>
        <button onClick={toggle}>Toggle</button>
      </div>
    );
  };

  demo(<Demo />);
});
