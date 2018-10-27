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
    <em>This is mostly port of <a href="https://github.com/streamich/libreact"><code>libreact</code></a> to React Hooks.</em>
  </sub>
  <br />
  <br />
  <br />
  <br />
  <pre>
npm i <a href="https://www.npmjs.com/package/react-use">react-use</a>
  </pre>
  <br />
  <br />
</div>


## Reference

- State
   - [`useToggle`](./docs/useToggle.md) &mdash; tracks state of a boolean.
   - [`useCounter`](./docs/useCounter.md) &mdash; tracks state of a number.
   - [`useList`](./docs/useList.md) &mdash; tracks state of an array.
   - [`useMap`](./docs/useMap.md) &mdash; tracks state of an object.
     <br/>
     <br/>
- Sensors
   - [`useBattery`](./docs/useBattery.md) &mdash; tracks device batter state.
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
- Side effects
   - [`useTitle`](./docs/useTitle.md) &mdash; sets title of the page.
     <br/>
     <br/>


## Usage

- You need to have React `16.7.0-alpha.0` or later installed to use Hooks API.
- You can import each hook individually `import useToggle from 'react-use/lib/useToggle'`.


## License

[Unlicense](./LICENSE) &mdash; public domain.
