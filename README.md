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
    <a href="https://www.npmjs.com/package/react-use">
       <img src="https://img.shields.io/npm/v/react-use.svg" alt="npm package" />
    </a>
    <a href="https://circleci.com/gh/streamich/react-use">
      <img src="https://img.shields.io/circleci/project/github/streamich/react-use/master.svg" alt="CircleCI master" />
    </a>
    <a href="https://www.npmjs.com/package/react-use">
      <img src="https://img.shields.io/npm/dm/react-use.svg" alt="npm downloads" />
    </a>
    <a href="http://streamich.github.io/react-use">
      <img src="https://img.shields.io/badge/demos-🚀-yellow.svg" alt="demos" />
    </a>
    <br />
    Collection of essential <a href="https://reactjs.org/docs/hooks-intro.html">React Hooks</a>.</em>
    <em>Port of</em> <a href="https://github.com/streamich/libreact"><code>libreact</code></a>.
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
  - [`useGeolocation`](./docs/useGeolocation.md) &mdash; tracks geo location state of user's device. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usegeolocation--demo)
  - [`useHover` and `useHoverDirty`](./docs/useHover.md) &mdash; tracks mouse hover state of some element. [![][img-demo]](https://codesandbox.io/s/zpn583rvx)
  - [`useHash`](./docs/useHash.md) &mdash; tracks location hash value. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usehash--demo)
  - [`useIdle`](./docs/useIdle.md) &mdash; tracks whether user is being inactive.
  - [`useIntersection`](./docs/useIntersection.md) &mdash; tracks an HTML element's intersection. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-useintersection--demo)
  - [`useKey`](./docs/useKey.md), [`useKeyPress`](./docs/useKeyPress.md), [`useKeyboardJs`](./docs/useKeyboardJs.md), and [`useKeyPressEvent`](./docs/useKeyPressEvent.md) &mdash; track keys. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usekeypressevent--demo)
  - [`useLocation`](./docs/useLocation.md) and [`useSearchParam`](./docs/useSearchParam.md) &mdash; tracks page navigation bar location state.
  - [`useLongPress`](./docs/useLongPress.md) &mdash; tracks long press gesture of some element.
  - [`useMedia`](./docs/useMedia.md) &mdash; tracks state of a CSS media query. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usemedia--demo)
  - [`useMediaDevices`](./docs/useMediaDevices.md) &mdash; tracks state of connected hardware devices.
  - [`useMotion`](./docs/useMotion.md) &mdash; tracks state of device's motion sensor.
  - [`useMouse` and `useMouseHovered`](./docs/useMouse.md) &mdash; tracks state of mouse position. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usemouse--docs)
  - [`useMouseWheel`](./docs/useMouseWheel.md) &mdash; tracks deltaY of scrolled mouse wheel. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usemousewheel--docs)
  - [`useNetwork`](./docs/useNetwork.md) &mdash; tracks state of user's internet connection.
  - [`useOrientation`](./docs/useOrientation.md) &mdash; tracks state of device's screen orientation.
  - [`usePageLeave`](./docs/usePageLeave.md) &mdash; triggers when mouse leaves page boundaries.
  - [`useScratch`](./docs/useScratch.md) &mdash; tracks mouse click-and-scrub state.
  - [`useScroll`](./docs/useScroll.md) &mdash; tracks an HTML element's scroll position. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usescroll--docs)
  - [`useScrolling`](./docs/useScrolling.md) &mdash; tracks whether HTML element is scrolling.
  - [`useStartTyping`](./docs/useStartTyping.md) &mdash; detects when user starts typing.
  - [`useWindowScroll`](./docs/useWindowScroll.md) &mdash; tracks `Window` scroll position. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usewindowscroll--docs)
  - [`useWindowSize`](./docs/useWindowSize.md) &mdash; tracks `Window` dimensions. [![][img-demo]](https://codesandbox.io/s/m7ln22668)
  - [`useMeasure`](./docs/useMeasure.md) and [`useSize`](./docs/useSize.md) &mdash; tracks an HTML element's dimensions. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usemeasure--demo)
  - [`createBreakpoint`](./docs/createBreakpoint.md) &mdash; tracks `innerWidth`
  - [`useScrollbarWidth`](./docs/useScrollbarWidth.md) &mdash; detects browser's native scrollbars width. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/sensors-usescrollbarwidth--demo)
    <br/>
    <br/>
- [**UI**](./docs/UI.md)
  - [`useAudio`](./docs/useAudio.md) &mdash; plays audio and exposes its controls. [![][img-demo]](https://codesandbox.io/s/2o4lo6rqy)
  - [`useClickAway`](./docs/useClickAway.md) &mdash; triggers callback when user clicks outside target area.
  - [`useCss`](./docs/useCss.md) &mdash; dynamically adjusts CSS.
  - [`useDrop` and `useDropArea`](./docs/useDrop.md) &mdash; tracks file, link and copy-paste drops.
  - [`useFullscreen`](./docs/useFullscreen.md) &mdash; display an element or video full-screen. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/ui-usefullscreen--demo)
  - [`useSlider`](./docs/useSlider.md) &mdash; provides slide behavior over any HTML element. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/ui-useslider--demo)
  - [`useSpeech`](./docs/useSpeech.md) &mdash; synthesizes speech from a text string. [![][img-demo]](https://codesandbox.io/s/n090mqz69m)
  - [`useVibrate`](./docs/useVibrate.md) &mdash; provide physical feedback using the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API). [![][img-demo]](https://streamich.github.io/react-use/?path=/story/ui-usevibrate--demo)
  - [`useVideo`](./docs/useVideo.md) &mdash; plays video, tracks its state, and exposes playback controls. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/ui-usevideo--demo)
    <br/>
    <br/>
- [**Animations**](./docs/Animations.md)
  - [`useRaf`](./docs/useRaf.md) &mdash; re-renders component on each `requestAnimationFrame`.
  - [`useInterval`](./docs/useInterval.md) and [`useHarmonicIntervalFn`](./docs/useHarmonicIntervalFn.md) &mdash; re-renders component on a set interval using `setInterval`.
  - [`useSpring`](./docs/useSpring.md) &mdash; interpolates number over time according to spring dynamics.
  - [`useTimeout`](./docs/useTimeout.md) &mdash; re-renders component after a timeout.
  - [`useTimeoutFn`](./docs/useTimeoutFn.md) &mdash; calls given function after a timeout. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/animation-usetimeoutfn--demo)
  - [`useTween`](./docs/useTween.md) &mdash; re-renders component, while tweening a number from 0 to 1. [![][img-demo]](https://codesandbox.io/s/52990wwzyl)
  - [`useUpdate`](./docs/useUpdate.md) &mdash; returns a callback, which re-renders component when called.
    <br/>
    <br/>
- [**Side-effects**](./docs/Side-effects.md)
  - [`useAsync`](./docs/useAsync.md), [`useAsyncFn`](./docs/useAsyncFn.md), and [`useAsyncRetry`](./docs/useAsyncRetry.md) &mdash; resolves an `async` function.
  - [`useBeforeUnload`](./docs/useBeforeUnload.md) &mdash; shows browser alert when user try to reload or close the page.
  - [`useCookie`](./docs/useCookie.md) &mdash; provides way to read, update and delete a cookie. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/side-effects-usecookie--demo)
  - [`useCopyToClipboard`](./docs/useCopyToClipboard.md) &mdash; copies text to clipboard.
  - [`useDebounce`](./docs/useDebounce.md) &mdash; debounces a function. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/side-effects-usedebounce--demo)
  - [`useError`](./docs/useError.md) &mdash; error dispatcher. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/side-effects-useerror--demo)
  - [`useFavicon`](./docs/useFavicon.md) &mdash; sets favicon of the page.
  - [`useLocalStorage`](./docs/useLocalStorage.md) &mdash; manages a value in `localStorage`.
  - [`useLockBodyScroll`](./docs/useLockBodyScroll.md) &mdash; lock scrolling of the body element.
  - [`useRafLoop`](./docs/useRafLoop.md) &mdash; calls given function inside the RAF loop.
  - [`useSessionStorage`](./docs/useSessionStorage.md) &mdash; manages a value in `sessionStorage`.
  - [`useThrottle` and `useThrottleFn`](./docs/useThrottle.md) &mdash; throttles a function. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/side-effects-usethrottle--demo)
  - [`useTitle`](./docs/useTitle.md) &mdash; sets title of the page.
  - [`usePermission`](./docs/usePermission.md) &mdash; query permission status for browser APIs.
    <br/>
    <br/>
- [**Lifecycles**](./docs/Lifecycles.md)
  - [`useEffectOnce`](./docs/useEffectOnce.md) &mdash; a modified [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) hook that only runs once.
  - [`useEvent`](./docs/useEvent.md) &mdash; subscribe to events.
  - [`useLifecycles`](./docs/useLifecycles.md) &mdash; calls `mount` and `unmount` callbacks.
  - [`useMountedState`](./docs/useMountedState.md) and [`useUnmountPromise`](./docs/useUnmountPromise.md) &mdash; track if component is mounted.
  - [`usePromise`](./docs/usePromise.md) &mdash; resolves promise only while component is mounted.
  - [`useLogger`](./docs/useLogger.md) &mdash; logs in console as component goes through life-cycles.
  - [`useMount`](./docs/useMount.md) &mdash; calls `mount` callbacks.
  - [`useUnmount`](./docs/useUnmount.md) &mdash; calls `unmount` callbacks.
  - [`useUpdateEffect`](./docs/useUpdateEffect.md) &mdash; run an `effect` only on updates.
  - [`useIsomorphicLayoutEffect`](./docs/useIsomorphicLayoutEffect.md) &mdash; `useLayoutEffect` that does not show warning when server-side rendering.
  - [`useDeepCompareEffect`](./docs/useDeepCompareEffect.md), [`useShallowCompareEffect`](./docs/useShallowCompareEffect.md), and [`useCustomCompareEffect`](./docs/useCustomCompareEffect.md) &mdash; run an `effect` depending on deep comparison of its dependencies
    <br/>
    <br/>
- [**State**](./docs/State.md)
  - [`createMemo`](./docs/createMemo.md) &mdash; factory of memoized hooks.
  - [`createReducer`](./docs/createReducer.md) &mdash; factory of reducer hooks with custom middleware.
  - [`createReducerContext`](./docs/createReducerContext.md) and [`createStateContext`](./docs/createStateContext.md) &mdash; factory of hooks for a sharing state between components.
  - [`useDefault`](./docs/useDefault.md) &mdash; returns the default value when state is `null` or `undefined`.
  - [`useGetSet`](./docs/useGetSet.md) &mdash; returns state getter `get()` instead of raw state.
  - [`useGetSetState`](./docs/useGetSetState.md) &mdash; as if [`useGetSet`](./docs/useGetSet.md) and [`useSetState`](./docs/useSetState.md) had a baby.
  - [`useLatest`](./docs/useLatest.md) &mdash; returns the latest state or props
  - [`usePrevious`](./docs/usePrevious.md) &mdash; returns the previous state or props. [![][img-demo]](https://codesandbox.io/s/fervent-galileo-krgx6)
  - [`usePreviousDistinct`](./docs/usePreviousDistinct.md) &mdash; like `usePrevious` but with a predicate to determine if `previous` should update.
  - [`useObservable`](./docs/useObservable.md) &mdash; tracks latest value of an `Observable`.
  - [`useRafState`](./docs/useRafState.md) &mdash; creates `setState` method which only updates after `requestAnimationFrame`. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-userafstate--demo)
  - [`useSetState`](./docs/useSetState.md) &mdash; creates `setState` method which works like `this.setState`. [![][img-demo]](https://codesandbox.io/s/n75zqn1xp0)
  - [`useStateList`](./docs/useStateList.md) &mdash; circularly iterates over an array. [![][img-demo]](https://codesandbox.io/s/bold-dewdney-pjzkd)
  - [`useToggle` and `useBoolean`](./docs/useToggle.md) &mdash; tracks state of a boolean. [![][img-demo]](https://codesandbox.io/s/focused-sammet-brw2d)
  - [`useCounter` and `useNumber`](./docs/useCounter.md) &mdash; tracks state of a number. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-usecounter--demo)
  - [`useList`](./docs/useList.md) ~and [`useUpsert`](./docs/useUpsert.md)~ &mdash; tracks state of an array. [![][img-demo]](https://codesandbox.io/s/wonderful-mahavira-1sm0w)
  - [`useMap`](./docs/useMap.md) &mdash; tracks state of an object. [![][img-demo]](https://codesandbox.io/s/quirky-dewdney-gi161)
  - [`useSet`](./docs/useSet.md) &mdash; tracks state of a Set. [![][img-demo]](https://codesandbox.io/s/bold-shtern-6jlgw)
  - [`useQueue`](./docs/useQueue.md) &mdash; implements simple queue.
  - [`useStateValidator`](./docs/useStateValidator.md) &mdash; tracks state of an object. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-usestatevalidator--demo)
  - [`useStateWithHistory`](./docs/useStateWithHistory.md) &mdash; stores previous state values and provides handles to travel through them. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-usestatewithhistory--demo)
  - [`useMultiStateValidator`](./docs/useMultiStateValidator.md) &mdash; alike the `useStateValidator`, but tracks multiple states at a time. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-usemultistatevalidator--demo)
  - [`useMediatedState`](./docs/useMediatedState.md) &mdash; like the regular `useState` but with mediation by custom function. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-usemediatedstate--demo)
  - [`useFirstMountState`](./docs/useFirstMountState.md) &mdash; check if current render is first. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-usefirstmountstate--demo)
  - [`useRendersCount`](./docs/useRendersCount.md) &mdash; count component renders. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-userenderscount--demo)
  - [`createGlobalState`](./docs/createGlobalState.md) &mdash; cross component shared state.[![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-createglobalstate--demo)
  - [`useMethods`](./docs/useMethods.md) &mdash; neat alternative to `useReducer`. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-usemethods--demo)
    <br/>
    <br/>
- [**Miscellaneous**]()
  - [`useEnsuredForwardedRef`](./docs/useEnsuredForwardedRef.md) and [`ensuredForwardRef`](./docs/useEnsuredForwardedRef.md) &mdash; use a React.forwardedRef safely. [![][img-demo]](https://streamich.github.io/react-use/?path=/story/state-useensuredforwardedref--demo)

<br />
<br />
<br />
<br />
<br />
<br />
<br />

<p align="center">
  <a href="./docs/Usage.md"><strong>Usage</strong></a> &mdash; how to import.
  <br />
  <a href="./LICENSE"><strong>Unlicense</strong></a> &mdash; public domain.
  <br />
  <a href="https://opencollective.com/react-use/contribute"><strong>Support</strong></a> &mdash; add yourself to backer list below.
</p>

<br />
<br />
<br />
<br />
<br />

[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg

<div align="center">
  <h1>Contributors</h1>
</div>

<br />
<br />

<a href="https://github.com/streamich/react-use/graphs/contributors"><img src="https://opencollective.com/react-use/contributors.svg?width=890&button=false" /></a>

<br />
<br />
<br />
<br />
<br />
