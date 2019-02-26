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
    <em>Port of</em> <a href="https://github.com/streamich/libreact"><code>libreact</code></a>. <em>See <a href="http://streamich.github.io/react-use">demos</a>.</em>
    <br />
    Translations: <a href="https://github.com/zenghongtu/react-use-chinese/blob/master/README.md">🇨🇳 汉语</a>
  </sup>
  <br />
  <br />
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/react-use">react-use</a></pre>
  <br />
  <br />
  <br />
  <br />
  <br />
</div>

- [**Sensors**](./docs/Sensors.md)
  - [`useBattery`](./docs/useBattery.md) &mdash; tracks device battery state. [![][img-demo]](https://codesandbox.io/s/qlvn662zww)
  - [`useGeolocation`](./docs/useGeolocation.md) &mdash; tracks geo location state of user's device.
  - [`useHover` and `useHoverDirty`](./docs/useHover.md) &mdash; tracks mouse hover state of some element. [![][img-demo]](https://codesandbox.io/s/zpn583rvx)
  - [`useIdle`](./docs/useIdle.md) &mdash; tracks whether user is being inactive.
  - [`useKeyPress`](./docs/useKeyPress.md) &mdash; tracks whether a keyboard key&mdash;or set of keys&mdash;was pressed.
  - [`useLocation`](./docs/useLocation.md) &mdash; tracks page navigation bar location state.
  - [`useMedia`](./docs/useMedia.md) &mdash; tracks state of a CSS media query.
  - [`useMediaDevices`](./docs/useMediaDevices.md) &mdash; tracks state of connected hardware devices.
  - [`useMotion`](./docs/useMotion.md) &mdash; tracks state of device's motion sensor.
  - [`useNetwork`](./docs/useNetwork.md) &mdash; tracks state of user's internet connection.
  - [`useOrientation`](./docs/useOrientation.md) &mdash; tracks state of device's screen orientation.
  - [`useSize`](./docs/useSize.md) &mdash; tracks some HTML element's dimensions.
  - [`useWindowSize`](./docs/useWindowSize.md) &mdash; tracks `Window` dimensions. [![][img-demo]](https://codesandbox.io/s/m7ln22668)
    <br/>
    <br/>
- [**UI**](./docs/UI.md)
  - [`useAudio`](./docs/useAudio.md) &mdash; plays audio and exposes its controls. [![][img-demo]](https://codesandbox.io/s/2o4lo6rqy)
  - [`useOutsideClick`](./docs/useOutsideClick.md) &mdash; triggers callback when user clicks outside target area.
  - [`useSpeech`](./docs/useSpeech.md) &mdash; synthesizes speech from a text string. [![][img-demo]](https://codesandbox.io/s/n090mqz69m)
  - [`useVideo`](./docs/useVideo.md) &mdash; plays video, tracks its state, and exposes playback controls.
  - [`useWait`](./docs/useWait.md) &mdash; complex waiting management for UIs.
    <br/>
    <br/>
- [**Animations**](./docs/Animations.md)
  - [`useRaf`](./docs/useRaf.md) &mdash; re-renders component on each `requestAnimationFrame`.
  - [`useSpring`](./docs/useSpring.md) &mdash; interpolates number over time according to spring dynamics.
  - [`useTimeout`](./docs/useTimeout.md) &mdash; returns true after a timeout.
  - [`useTween`](./docs/useTween.md) &mdash; re-renders component, while tweening a number from 0 to 1. [![][img-demo]](https://codesandbox.io/s/52990wwzyl)
  - [`useUpdate`](./docs/useUpdate.md) &mdash; returns a callback, which re-renders component when called.
    <br/>
    <br/>
- [**Side-effects**](./docs/Side-effects.md)
  - [`useAsync`](./docs/useAsync.md) &mdash; resolves an `async` function.
  - [`useCss`](./docs/useCss.md) &mdash; dynamically adjusts CSS.
  - [`useFavicon`](./docs/useFavicon.md) &mdash; sets favicon of the page.
  - [`useLocalStorage`](./docs/useLocalStorage.md) &mdash; manages a value in `localStorage`.
  - [`useSessionStorage`](./docs/useSessionStorage.md) &mdash; manages a value in `sessionStorage`.
  - [`useTitle`](./docs/useTitle.md) &mdash; sets title of the page.
  - [`useDebounce`](./docs/useDebounce.md) &mdash; debounces a function.
    <br/>
    <br/>
- [**Lifecycles**](./docs/Lifecycles.md)
  - [`useLifecycles`](./docs/useLifecycles.md) &mdash; calls `mount` and `unmount` callbacks.
  - [`useRefMounted`](./docs/useRefMounted.md) &mdash; tracks if component is mounted.
  - [`useLogger`](./docs/useLogger.md) &mdash; logs in console as component goes through life-cycles.
  - [`useMount`](./docs/useMount.md) &mdash; calls `mount` callbacks.
  - [`useUnmount`](./docs/useUnmount.md) &mdash; calls `unmount` callbacks.
    <br/>
    <br/>
- [**State**](./docs/State.md)
  - [`createMemo`](./docs/createMemo.md) &mdash; factory of memoized hooks.
  - [`useCallbag`](./docs/useCallbag.md) &mdash; tracks latest value of a callbag.
  - [`useGetSet`](./docs/useGetSet.md) &mdash; returns state getter `get()` instead of raw state.
  - [`useGetSetState`](./docs/useGetSetState.md) &mdash; as if [`useGetSet`](./docs/useGetSet.md) and [`useSetState`](./docs/useSetState.md) had a baby.
  - [`useObservable`](./docs/useObservable.md) &mdash; tracks latest value of an `Observable`.
  - [`useSetState`](./docs/useSetState.md) &mdash; creates `setState` method which works like `this.setState`. [![][img-demo]](https://codesandbox.io/s/n75zqn1xp0)
  - [`useToggle` and `useBoolean`](./docs/useToggle.md) &mdash; tracks state of a boolean.
  - [`useCounter` and `useNumber`](./docs/useCounter.md) &mdash; tracks state of a number.
  - [`useList`](./docs/useList.md) &mdash; tracks state of an array.
  - [`useMap`](./docs/useMap.md) &mdash; tracks state of an object.
    <br/>
    <br/>

<br />
<br />
<br />

<h2 align="center"><sub>Usage</sub></h2>

<br/>

<p align="center">
You need to have React <code>16.8.1</code> or later installed to use Hooks API.
</p>

<p align="center">
You can import each hook individually <code>import useToggle from 'react-use/lib/useToggle'</code>.
</p>

<br/>

<h2 align="center"><sub>License</sub></h2>

<p align="center">
  <a href="./LICENSE">Unlicense</a> &mdash; public domain.
</p>

[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
