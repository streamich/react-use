import { renderHook } from '@testing-library/react-hooks';
import useEvent, { ListenerType1, ListenerType2 } from '../src/useEvent';

interface Props {
  name: string;
  handler: (...args: any[]) => void;
  target: ListenerType1 | ListenerType2;
  options: any;
}

const propsList1 = [
  {
    name: 'name1',
    handler: () => {},
    target: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    options: { a: 'opt1' },
  },
  {
    name: 'name2',
    handler: () => {},
    target: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    options: { a: 'opt2' },
  },
];

const propsList2 = [
  {
    ...propsList1[0],
    target: {
      on: jest.fn(),
      off: jest.fn(),
    },
  },
  {
    ...propsList1[1],
    target: {
      on: jest.fn(),
      off: jest.fn(),
    },
  },
];

it('should call addEventListener/removeEventListener on mount/unmount', () => {
  checkOnMountAndUnmount(propsList1[0], 'addEventListener', 'removeEventListener');
});

it('should call on/off on mount/unmount', () => {
  checkOnMountAndUnmount(propsList2[0], 'on', 'off');
});

it('should call addEventListener/removeEventListener on deps changes', () => {
  checkOnDepsChanges(propsList1[0], propsList1[1], 'addEventListener', 'removeEventListener');
});

it('should call on/off on deps changes', () => {
  checkOnDepsChanges(propsList2[0], propsList2[1], 'on', 'off');
});

const checkOnMountAndUnmount = (
  props: Props,
  addEventListenerName: string,
  removeEventListenerName: string
) => {
  const { unmount } = renderHook((p: Props) => useEvent(p.name, p.handler, p.target, p.options), {
    initialProps: props,
  });
  expect(props.target[addEventListenerName]).toHaveBeenCalledTimes(1);
  expect(props.target[addEventListenerName]).toHaveBeenLastCalledWith(
    props.name,
    props.handler,
    props.options
  );
  unmount();
  expect(props.target[removeEventListenerName]).toHaveBeenCalledTimes(1);
  expect(props.target[removeEventListenerName]).toHaveBeenLastCalledWith(
    props.name,
    props.handler,
    props.options
  );
};

const checkOnDepsChanges = (
  props1: Props,
  props2: Props,
  addEventListenerName: string,
  removeEventListenerName: string
) => {
  const { rerender } = renderHook((p: Props) => useEvent(p.name, p.handler, p.target, p.options), {
    initialProps: props1,
  });
  expect(props1.target[addEventListenerName]).toHaveBeenCalledTimes(1);
  expect(props1.target[addEventListenerName]).toHaveBeenLastCalledWith(
    props1.name,
    props1.handler,
    props1.options
  );

  // deps are same as previous
  rerender({
    name: props1.name,
    handler: props1.handler,
    target: props1.target,
    options: props1.options,
  });
  expect(props1.target[removeEventListenerName]).not.toHaveBeenCalled();

  // name is different from previous
  rerender({
    name: props2.name,
    handler: props1.handler,
    target: props1.target,
    options: props1.options,
  });
  expect(props1.target[removeEventListenerName]).toHaveBeenCalledTimes(1);
  expect(props1.target[removeEventListenerName]).toHaveBeenLastCalledWith(
    props1.name,
    props1.handler,
    props1.options
  );

  // handler is different from previous
  rerender({
    name: props2.name,
    handler: props2.handler,
    target: props1.target,
    options: props1.options,
  });
  expect(props1.target[removeEventListenerName]).toHaveBeenCalledTimes(2);
  expect(props1.target[removeEventListenerName]).toHaveBeenLastCalledWith(
    props2.name,
    props1.handler,
    props1.options
  );

  // options contents is same as previous
  rerender({
    name: props2.name,
    handler: props2.handler,
    target: props1.target,
    options: { a: 'opt1' },
  });
  expect(props1.target[removeEventListenerName]).toHaveBeenCalledTimes(2);

  // options is different from previous
  rerender({
    name: props2.name,
    handler: props2.handler,
    target: props1.target,
    options: props2.options,
  });
  expect(props1.target[removeEventListenerName]).toHaveBeenCalledTimes(3);
  expect(props1.target[removeEventListenerName]).toHaveBeenLastCalledWith(
    props2.name,
    props2.handler,
    props1.options
  );

  // target is different from previous
  rerender({
    name: props2.name,
    handler: props2.handler,
    target: props2.target,
    options: props2.options,
  });
  expect(props1.target[removeEventListenerName]).toHaveBeenCalledTimes(4);
  expect(props1.target[removeEventListenerName]).toHaveBeenLastCalledWith(
    props2.name,
    props2.handler,
    props2.options
  );

  expect(props2.target[addEventListenerName]).toHaveBeenCalledTimes(1);
  expect(props2.target[addEventListenerName]).toHaveBeenLastCalledWith(
    props2.name,
    props2.handler,
    props2.options
  );
};
