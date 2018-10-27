<div align="center">
  <h1>
    <br/>
    <br/>
    👍
    <br />
    react-use
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <br />
    Collection of essential <a href="https://reactjs.org/docs/hooks-intro.html">React Hooks</a>.</em>
    <br />
    <em>This is mostly port of</em> <a href="https://github.com/streamich/libreact"><code>libreact</code></a> <em>to React Hooks.</em>
  </sup>
  <br />
  <br />
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/react-use">react-use</a></pre>
  <br />
  <br />
</div>


## Reference

- [__Sensors__](./docs/Sensors.md)
   - [`useBattery`](./docs/useBattery.md) &mdash; tracks device battery state.
   - [`useGeolocation`](./docs/useGeolocation.md) &mdash; tracks geo location state of user's device.
   - [`useHover`](./docs/useHover.md) &mdash; tracks mouse hover state of some element.
   - [`useIdle`](./docs/useIdle.md) &mdash; tracks whether user is being inactive.
   - [`useLocation`](./docs/useLocation.md) &mdash; tracks page navigation bar location state.
   - [`useMedia`](./docs/useMedia.md) &mdash; tracks state of a CSS media query.
   - [`useMediaDevices`](./docs/useMediaDevices.md) &mdash; tracks state of connected hardware devices.
   - [`useMotion`](./docs/useMotion.md) &mdash; tracks state of device's motion sensor.
   - [`useNetwork`](./docs/useNetwork.md) &mdash; tracks state of user's internet connection.
   - [`useOrientation`](./docs/useOrientation.md) &mdash; tracks state of device's screen orientation.
   - [`useSize`](./docs/useSize.md) &mdash; tracks some HTML element's dimensions.
   - [`useWindowSize`](./docs/useWindowSize.md) &mdash; tracks `Window` dimensions.
     <br/>
     <br/>
- [__Animations__](./docs/Animations.md)
   - [`useRaf`](./docs/useRaf.md) &mdash; re-renders component on each `reaquestAnimationFrame`.
   - [`useSpring`](./docs/useSpring.md) &mdash; interpolates number over time according to spring dynamics.
   - [`useTimeout`](./docs/useTimeout.md) &mdash; returns true after a timeout.
   - [`useTween`](./docs/useTween.md) &mdash; re-renders component, while tweening a number from 0 to 1.
     <br/>
     <br/>
- [__Side-effects__](./docs/Side-effects.md)
   - [`useAsync`](./docs/useAsync.md) &mdash; resolves an `async` function.
   - [`useCss`](./docs/useCss.md) &mdash; dynamically adjusts CSS.
   - [`useFavicon`](./docs/useFavicon.md) &mdash; sets favicon of the page.
   - [`useTitle`](./docs/useTitle.md) &mdash; sets title of the page.
     <br/>
     <br/>
- [__Lifecycles__](./docs/Lifecycles.md)
   - [`useLifecycles`](./docs/useLifecycles.md) &mdash; calls `mount` and `unmount` callbacks.
     <br/>
     <br/>
- [__State__](./docs/State.md)
   - [`useToggle`](./docs/useToggle.md) &mdash; tracks state of a boolean.
   - [`useCounter`](./docs/useCounter.md) &mdash; tracks state of a number.
   - [`useList`](./docs/useList.md) &mdash; tracks state of an array.
   - [`useMap`](./docs/useMap.md) &mdash; tracks state of an object.
     <br/>
     <br/>


## Usage

- You need to have React `16.7.0-alpha.0` or later installed to use Hooks API.
- You can import each hook individually `import useToggle from 'react-use/lib/useToggle'`.


## License

[Unlicense](./LICENSE) &mdash; public domain.
