# `useEnsuredForwardedRef`

React hook to use a ForwardedRef safely.

In some scenarios, you may need to use a _ref_ from inside and outside a component. If that's the case, you should use `React.forwardRef` to pass it through the child component. This is useful when you only want to forward that _ref_ and expose an internal `HTMLelement` to a parent component, for example. However, if you need to manipulate that reference inside a child's lifecycle hook... things get complicated, since you can't always ensure that the _ref_ is being sent by the parent component and if it is not, you will get `undefined` instead of a valid _ref_.

This hook is useful in this specific case, it will __ensure__ that you get a valid reference on the other side.

## Usage

```jsx
import {ensuredForwardRef} from 'react-use';

const Demo = () => {
  return (
    <Child />
  );
};

const Child = ensuredForwardRef((props, ref) => {
  useEffect(() => {
    console.log(ref.current.getBoundingClientRect())
  }, [])

  return (
    <div ref={ref} />
  );
});
```

## Alternative usage

```jsx
import {useEnsuredForwardedRef} from 'react-use';

const Demo = () => {
  return (
    <Child />
  );
};

const Child = React.forwardRef((props, ref) => {
  // Here `ref` is undefined
  const ensuredForwardRef = useEnsuredForwardedRef(ref);
  // ensuredForwardRef will always be a valid reference.

  useEffect(() => {
    console.log(ensuredForwardRef.current.getBoundingClientRect())
  }, [])

  return (
    <div ref={ensuredForwardRef} />
  );
});
```

## Reference

```ts
ensuredForwardRef<T, P = {}>(Component: RefForwardingComponent<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

useEnsuredForwardedRef<T>(ref: React.MutableRefObject<T>): React.MutableRefObject<T>;
```
