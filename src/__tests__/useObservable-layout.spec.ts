import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Subject } from 'rxjs';
import { useObservable } from '..';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

jest.mock('../useIsomorphicLayoutEffect');

test('uses layout effect (to subscribe synchronously)', async () => {
  const subject = new Subject();
  const container = document.createElement('div');

  const Demo = ({ obs }) => {
    const value = useObservable(obs);
    return React.createElement(React.Fragment, {}, value);
  };

  expect(useIsomorphicLayoutEffect).toHaveBeenCalledTimes(0);
  ReactDOM.render(React.createElement(Demo, { obs: subject }), container);
  expect(useIsomorphicLayoutEffect).toHaveBeenCalledTimes(1);
});
