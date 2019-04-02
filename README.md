# 👍 react-use

[![npm package](https://img.shields.io/npm/v/react-use.svg)](https://www.npmjs.com/package/react-use)
[![npm downloads](https://img.shields.io/npm/dm/react-use.svg)](https://www.npmjs.com/package/react-use)
[![demos](https://img.shields.io/badge/demos-🚀-yellow.svg)](http://streamich.github.io/react-use)

A collection of essential [React Hooks](https://reactjs.org/docs/hooks-intro.html).

## Setup

You need to have [React `16.8.0`](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use the Hooks API.

```bash
npm i react-use
```

## [Sensors](./docs/Sensors.md)

- [`useBattery`](./docs/useBattery.md) &mdash; track device battery state
- [`useGeolocation`](./docs/useGeolocation.md) &mdash; track geo location state of user's device
- [`useHover` and `useHoverDirty`](./docs/useHover.md) &mdash; track mouse hover state of some element
- [`useIdle`](./docs/useIdle.md) &mdash; track whether user is being inactive
- [`useKey`](./docs/useKey.md), [`useKeyPress`](./docs/useKeyPress.md), [`useKeyboardJs`](./docs/useKeyboardJs.md), and [`useKeyPressEvent`](./docs/useKeyPressEvent.md) &mdash; track keyboard input
- [`useLocation`](./docs/useLocation.md) &mdash; track window location state
- [`useMedia`](./docs/useMedia.md) &mdash; track a CSS media query
- [`useMediaDevices`](./docs/useMediaDevices.md) &mdash; track state of connected hardware devices
- [`useMotion`](./docs/useMotion.md) &mdash; track state of device's motion sensor
- [`useMouse` and `useMouseHovered`](./docs/useMouse.md) &mdash; track state of mouse position
- [`useNetwork`](./docs/useNetwork.md) &mdash; track state of user's internet connection
- [`useOrientation`](./docs/useOrientation.md) &mdash; track state of device's screen orientation
- [`usePageLeave`](./docs/usePageLeave.md) &mdash; trigger callback when mouse leaves page boundaries
- [`useScroll`](./docs/useScroll.md) &mdash; track an HTML element's scroll position
- [`useSize`](./docs/useSize.md) &mdash; track an HTML element's dimensions
- [`useWindowScroll`](./docs/useWindowScroll.md) &mdash; track `Window` scroll position
- [`useWindowSize`](./docs/useWindowSize.md) &mdash; track `Window` dimensions

## [UI](./docs/UI.md)

- [`useAudio`](./docs/useAudio.md) &mdash; play audio, track its state and hook up controls
- [`useClickAway`](./docs/useClickAway.md) &mdash; trigger callback when user clicks outside target area
- [`useCss`](./docs/useCss.md) &mdash; dynamically adjusts CSS
- [`useDrop` and `useDropArea`](./docs/useDrop.md) &mdash; track file, link and copy-paste drops
- [`useFullscreen`](./docs/useFullscreen.md) &mdash; display an element or video full-screen
- [`useSpeech`](./docs/useSpeech.md) &mdash; synthesize speech audio from a text string
- [`useVideo`](./docs/useVideo.md) &mdash; play video, track its state and hook up playback controls
- [`useWait`](./docs/useWait.md) &mdash; complex waiting management for UIs

## [Animation](./docs/Animation.md)

- [`useRaf`](./docs/useRaf.md) &mdash; re-render component on each `requestAnimationFrame`
- [`useSpring`](./docs/useSpring.md) &mdash; interpolate number over time according to spring dynamics
- [`useTimeout`](./docs/useTimeout.md) &mdash; returns true after a timeout
- [`useTween`](./docs/useTween.md) &mdash; re-renders component, while tweening a number from 0 to 1
- [`useUpdate`](./docs/useUpdate.md) &mdash; returns a callback, which re-renders component when called

## [Side-effects](./docs/Side-effects.md)

- [`useAsync`](./docs/useAsync.md) &mdash; resolve an `async` function
- [`useAsyncRetry`](./docs/useAsyncRetry.md) &mdash; `useAsync` with a `retry()` callback
- [`useDebounce`](./docs/useDebounce.md) &mdash; debounce a function
- [`useFavicon`](./docs/useFavicon.md) &mdash; set favicon of the page
- [`useLocalStorage`](./docs/useLocalStorage.md) &mdash; manage a value in `localStorage`
- [`useLockBodyScroll`](./docs/useLockBodyScroll.md) &mdash; lock scrolling of the body element
- [`useSessionStorage`](./docs/useSessionStorage.md) &mdash; manage a value in `sessionStorage`
- [`useThrottle` and `useThrottleFn`](./docs/useThrottle.md) &mdash; throttle a function
- [`useTitle`](./docs/useTitle.md) &mdash; set title of the page

## [Lifecycle](./docs/Lifecycle.md)

- [`useEffectOnce`](./docs/useEffectOnce.md) &mdash; a modified [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) hook that runs an `effect` only once
- [`useEvent`](./docs/useEvent.md) &mdash; subscribe to events
- [`useLifecycles`](./docs/useLifecycles.md) &mdash; call `mount` and `unmount` callbacks
- [`useRefMounted`](./docs/useRefMounted.md) &mdash; track if component is mounted
- [`usePromise`](./docs/usePromise.md) &mdash; resolve promise only while component is mounted
- [`useLogger`](./docs/useLogger.md) &mdash; `console.log` as component goes through lifecycles
- [`useMount`](./docs/useMount.md) &mdash; run an `effect` on mount
- [`useUnmount`](./docs/useUnmount.md) &mdash; run an `effect` on unmount
- [`useUpdateEffect`](./docs/useUpdateEffect.md) &mdash; run an `effect` only on updates

## [State](./docs/State.md)

- [`createMemo`](./docs/createMemo.md) &mdash; factory of memoized hooks
- [`useGetSet`](./docs/useGetSet.md) &mdash; returns state getter `get()` instead of raw state
- [`useGetSetState`](./docs/useGetSetState.md) &mdash; as if [`useGetSet`](./docs/useGetSet.md) and [`useSetState`](./docs/useSetState.md) had a baby
- [`useObservable`](./docs/useObservable.md) &mdash; track latest value of an `Observable`.
- [`useSetState`](./docs/useSetState.md) &mdash; creates `setState` method which works like `this.setState`
- [`useToggle` and `useBoolean`](./docs/useToggle.md) &mdash; track state of a boolean
- [`useCounter` and `useNumber`](./docs/useCounter.md) &mdash; track state of a number
- [`useList`](./docs/useList.md) &mdash; track state of an array
- [`useMap`](./docs/useMap.md) &mdash; track state of an object

## Usage

You can import each hook individually

```js
import useToggle from 'react-use/lib/useToggle'
```

or use ES6 named import

```js
import {useToggle} from 'react-use'
```

Depending on your bundler you might run into a missing dependency error. Some hooks require you to install peer dependencies so we recommend using individual imports. If you want the best of both worlds you can transform the named import statements to individual import statements with [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import) by adding the following config to your `.babelrc` file

```json
[
  "import", {
    "libraryName": "react-use",
    "libraryDirectory": "lib",
    "camel2DashComponentName": false
  }
]
```

## Translations

[🇨🇳_汉语](https://github.com/zenghongtu/react-use-chinese/blob/master/README.md)

## License

[Unlicense](./LICENSE) &mdash; public domain.
