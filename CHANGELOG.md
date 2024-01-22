# [17.5.0](https://github.com/streamich/react-use/compare/v17.4.4...v17.5.0) (2024-01-22)


### Features

* add `isFirst` and `isLast` methods to `useStateList` hook ([ac64414](https://github.com/streamich/react-use/commit/ac64414bea4c8afadfb382da9fea44ee89b41e2d))
* **pencil:** add isFirst and isLast return value to 'useStateList' ([75218e4](https://github.com/streamich/react-use/commit/75218e45dfdcdc6ea193e278cb97ceee98c00f1b))
* **pencil:** fix with yarn lint:fix ([6a9dde5](https://github.com/streamich/react-use/commit/6a9dde596ae25c0dd2fa97b0cf354143fbc5b5ff))

## [17.4.4](https://github.com/streamich/react-use/compare/v17.4.3...v17.4.4) (2024-01-21)


### Bug Fixes

* typo in example ([0534648](https://github.com/streamich/react-use/commit/05346481a15a321b13838eead0bda3024b0d163f))

## [17.4.3](https://github.com/streamich/react-use/compare/v17.4.2...v17.4.3) (2024-01-13)


### Bug Fixes

* update useMedia hook to use recommended approach of MDN ([e7379f0](https://github.com/streamich/react-use/commit/e7379f088787cbf9274c1fc21d36061f04855e4c))

## [17.4.2](https://github.com/streamich/react-use/compare/v17.4.1...v17.4.2) (2023-12-01)


### Bug Fixes

* correct peer dependencies ([d770587](https://github.com/streamich/react-use/commit/d77058729654397b68b251e8211bf0edc0b4ed50))

## [17.4.1](https://github.com/streamich/react-use/compare/v17.4.0...v17.4.1) (2023-11-28)


### Bug Fixes

* 🐛 bump nano-css version ([812952b](https://github.com/streamich/react-use/commit/812952bb9ff004a844ec4285ad6c65d39597b11c))

# [17.4.0](https://github.com/streamich/react-use/compare/v17.3.3...v17.4.0) (2022-05-20)


### Features

* add usePinchZoom sensor hook ([3e042cb](https://github.com/streamich/react-use/commit/3e042cb2f3022349a53199b5cc5c380e3ebd9975))

## [17.3.3](https://github.com/streamich/react-use/compare/v17.3.2...v17.3.3) (2022-05-20)


### Bug Fixes

* bump React peer dependency version ([532e865](https://github.com/streamich/react-use/commit/532e8653a50d39dd439d9664d4813a1d7a5b4f3c))
* resolve [#2319](https://github.com/streamich/react-use/issues/2319) ([4884b2c](https://github.com/streamich/react-use/commit/4884b2c74085e0841af7c36cca34e16d698d1b4c))
* resolve @types/react@18 break change, React.FC ([20b7817](https://github.com/streamich/react-use/commit/20b78178d0033cc2e0c2a904e413b20ee864c816))

## [17.3.2](https://github.com/streamich/react-use/compare/v17.3.1...v17.3.2) (2021-12-30)


### Bug Fixes

* useMedia SSR hydration bug with defaultState ([#2216](https://github.com/streamich/react-use/issues/2216)) ([5c01189](https://github.com/streamich/react-use/commit/5c0118941280bb265ca7813afb987f89c8c97a17))

## [17.3.1](https://github.com/streamich/react-use/compare/v17.3.0...v17.3.1) (2021-08-31)


### Performance Improvements

* ⚡️ change title only if it changed ([51ef8d9](https://github.com/streamich/react-use/commit/51ef8d99bad31186ec5420d8b729748507c8a1bf))

# [17.3.0](https://github.com/streamich/react-use/compare/v17.2.4...v17.3.0) (2021-08-31)


### Bug Fixes

* do not re-render unncessarily in useAsyncFn hook ([fa3ba25](https://github.com/streamich/react-use/commit/fa3ba2520ede6866b599f6df55fdfa6395058cd2))


### Features

* useAudio add playing state ([3203610](https://github.com/streamich/react-use/commit/3203610efdcb8e1fe3c6a17ea19e41bacbeb851b))

## [17.2.4](https://github.com/streamich/react-use/compare/v17.2.3...v17.2.4) (2021-04-23)


### Bug Fixes

* lint issues. ([66b0f23](https://github.com/streamich/react-use/commit/66b0f235477c5f93807df75a53a84b3c5cd053e5))
* **useLocalStorage:** reinitialize on key change ([fdd1b23](https://github.com/streamich/react-use/commit/fdd1b23fd7ba6ae30139eeef02c552a8c7d6d333))
* add generic typing to createHTMLMediaHook. no typecheck problem with ref anymore. ([1f547ef](https://github.com/streamich/react-use/commit/1f547efb12d6cbe7687e86925ad80bd85fac3dfd))
* add generic typing to createHTMLMediaHook. no typecheck problem with ref anymore. ([ac4dd78](https://github.com/streamich/react-use/commit/ac4dd786f42a2c59bdaaf9ddebe2e830982d7fcc))

## [17.2.3](https://github.com/streamich/react-use/compare/v17.2.2...v17.2.3) (2021-04-06)


### Bug Fixes

* lint issues. ([5a5a575](https://github.com/streamich/react-use/commit/5a5a5755bc1f10add9c7a100ea6577ab6d427c0c))

## [17.2.2](https://github.com/streamich/react-use/compare/v17.2.1...v17.2.2) (2021-04-06)


### Bug Fixes

* **useStateWithHistory:** support callback style setState ([fca687d](https://github.com/streamich/react-use/commit/fca687d32c37148dab3072f053109f6c4d3c36ba))

## [17.2.1](https://github.com/streamich/react-use/compare/v17.2.0...v17.2.1) (2021-03-11)


### Bug Fixes

* lint issues. ([3e8af15](https://github.com/streamich/react-use/commit/3e8af15086135c873d18079a0b92b21da668a2ff))
* useMeasure type definitions for SVG ([e200f7f](https://github.com/streamich/react-use/commit/e200f7fcbb371a1d794be8d350f9559f940e5760))
* useUnmountPromise stops on immediate update ([9ff5c09](https://github.com/streamich/react-use/commit/9ff5c09e671c4f07f25f30a60617fca7660e7607))

# [17.2.0](https://github.com/streamich/react-use/compare/v17.1.1...v17.2.0) (2021-03-10)


### Bug Fixes

* delete isClient ([72f4cb9](https://github.com/streamich/react-use/commit/72f4cb9b405b3729975bca3acb06658ca467d15b))
* lint issues. ([dc5bbe0](https://github.com/streamich/react-use/commit/dc5bbe0e94d131dda90942ba90c14b200df3f34e))
* **useOrientation:** handle orientation being 0 ([793b053](https://github.com/streamich/react-use/commit/793b0539f0305e2512e7022c45a5c33b842d24d5))
* **useOrientation:** update tests to increase coverage ([f9c743f](https://github.com/streamich/react-use/commit/f9c743fa8375ef726d33f85285d4a5af608f9a42))
* use window inside useEffect ([2f33aa8](https://github.com/streamich/react-use/commit/2f33aa8182c92bf56d49ec3184e6b20f0c0c1e1e))


### Features

* **useOrientation:** add tests ([f45cb70](https://github.com/streamich/react-use/commit/f45cb707b52363f1cb1b32a0ebf2fdbdae79b322))

## [17.1.1](https://github.com/streamich/react-use/compare/v17.1.0...v17.1.1) (2021-02-10)


### Bug Fixes

* useMountedState should not change state on componentDidUpdate lifecycle ([701b306](https://github.com/streamich/react-use/commit/701b306ed97382cbec73c834f6d3dd7baa58e339))

# [17.1.0](https://github.com/streamich/react-use/compare/v17.0.2...v17.1.0) (2021-02-01)


### Features

* **prettier:** make prettier a part of eslint. ([b6993a6](https://github.com/streamich/react-use/commit/b6993a6f95a1b493945c03aecc44dafd10870816))

## [17.0.2](https://github.com/streamich/react-use/compare/v17.0.1...v17.0.2) (2021-02-01)


### Bug Fixes

* proper definition for `useMeasure` ([1461527](https://github.com/streamich/react-use/commit/1461527ffc55b2a1e3c9dc6a0efc2572b66e5381))

## [17.0.1](https://github.com/streamich/react-use/compare/v17.0.0...v17.0.1) (2021-01-31)


### Bug Fixes

* proper definition for isBrowser and isNavigator states. ([a087deb](https://github.com/streamich/react-use/commit/a087deb48e57b1f0a23a2d0a28d0c2d10a640cd6)), closes [#1777](https://github.com/streamich/react-use/issues/1777)

# [17.0.0](https://github.com/streamich/react-use/compare/v16.1.0...v17.0.0) (2021-01-31)


### Features

* refactor the useNetwork hook. ([23037f2](https://github.com/streamich/react-use/commit/23037f207d07604dd2cd7e2cc4ba9475221be780))


### BREAKING CHANGES

* `useNetwork` hook renamed to `useNetworkState`.

# [16.1.0](https://github.com/streamich/react-use/compare/v16.0.0...v16.1.0) (2021-01-31)


### Features

* improve `on` and `off` util functions typing. ([723c588](https://github.com/streamich/react-use/commit/723c588fef6aba9f10ea9f5ea7bc444532519f9a))

# [16.0.0](https://github.com/streamich/react-use/compare/v15.3.8...v16.0.0) (2021-01-30)


### chore

* refactoring and rearrangement. ([a27f09f](https://github.com/streamich/react-use/commit/a27f09fd367f8b172866b5fcbaf66f9a5a3481bb))


### BREAKING CHANGES

* all `create*` factories been moved to `factory` subdirectory and in case direct import should be imported like `react-use/esm/factory/createBreakpoint`
* `comps` directory renamed to `component`

## [15.3.8](https://github.com/streamich/react-use/compare/v15.3.7...v15.3.8) (2021-01-08)


### Bug Fixes

* improve useStateValidator and useMultiStateValidator typings. ([acff81d](https://github.com/streamich/react-use/commit/acff81d99abdbbefcc2985297ee01c3cda9ef4c9))

## [15.3.7](https://github.com/streamich/react-use/compare/v15.3.6...v15.3.7) (2021-01-08)


### Bug Fixes

* [#1646](https://github.com/streamich/react-use/issues/1646) ([ebc7094](https://github.com/streamich/react-use/commit/ebc7094bbc156be57b3de855c6984c1d056cf0e6))

## [15.3.6](https://github.com/streamich/react-use/compare/v15.3.5...v15.3.6) (2021-01-07)


### Bug Fixes

* Fix issues in tests ([7668ce5](https://github.com/streamich/react-use/commit/7668ce5c5f0f186437907f1c352d3a62e3ae8ba7))

## [15.3.4](https://github.com/streamich/react-use/compare/v15.3.3...v15.3.4) (2020-09-04)


### Bug Fixes

* useLongPress hook linting fixes. ([479dd99](https://github.com/streamich/react-use/commit/479dd9977bfcc43ccadc58eb93690adee462a16e))

## [15.3.3](https://github.com/streamich/react-use/compare/v15.3.2...v15.3.3) (2020-07-24)


### Bug Fixes

* replace createFactory usages with createElement ([ad29bea](https://github.com/streamich/react-use/commit/ad29bea7b03f46aa697e6623bdf7a17347ace651))

## [15.3.2](https://github.com/streamich/react-use/compare/v15.3.1...v15.3.2) (2020-06-29)


### Bug Fixes

* **useFullscreen:** fix typings so [#1205](https://github.com/streamich/react-use/issues/1205) can be merged. ([e6e55a3](https://github.com/streamich/react-use/commit/e6e55a3f94993b621566ac66488fd973e992704f))

## [15.3.1](https://github.com/streamich/react-use/compare/v15.3.0...v15.3.1) (2020-06-29)


### Bug Fixes

* **usePrevious:** revert the reworked variant as a fix of [#1315](https://github.com/streamich/react-use/issues/1315) ([a4279eb](https://github.com/streamich/react-use/commit/a4279eb660f6b433ed88e0d90c2bb0b3158d3b00))

# [15.3.0](https://github.com/streamich/react-use/compare/v15.2.5...v15.3.0) (2020-06-19)


### Features

* **usePrevious:** reworked the hook, now it is more memory-efficient. ([8c6f467](https://github.com/streamich/react-use/commit/8c6f4675beac9c71e96126dd6f06f455c4e4bf01))

## [15.2.5](https://github.com/streamich/react-use/compare/v15.2.4...v15.2.5) (2020-06-15)


### Bug Fixes

* bump react-universal-interface ([1540c1a](https://github.com/streamich/react-use/commit/1540c1ab8f338dfa2f53de16506fbf47803d45ba))

## [15.2.4](https://github.com/streamich/react-use/compare/v15.2.3...v15.2.4) (2020-06-13)


### Bug Fixes

*  doesn't unlock the body on unmount ([1ead4ef](https://github.com/streamich/react-use/commit/1ead4efab6c67131e480570b578b0ce803204953))

## [15.2.3](https://github.com/streamich/react-use/compare/v15.2.2...v15.2.3) (2020-06-13)


### Bug Fixes

* 🐛 improve how text is dropped in useDrop hook ([b2f46d1](https://github.com/streamich/react-use/commit/b2f46d10f25c5e658bb7f790950a1fd9a4e5e288))

## [15.2.2](https://github.com/streamich/react-use/compare/v15.2.1...v15.2.2) (2020-06-08)


### Bug Fixes

* repair useKeyboardJs hook ([8410bb0](https://github.com/streamich/react-use/commit/8410bb042fec8f1996e8bcecb85fadfbb414b3f9))

## [15.2.1](https://github.com/streamich/react-use/compare/v15.2.0...v15.2.1) (2020-06-08)


### Bug Fixes

* 🐛 bump fast-deep-equal, and consume it through ES import ([f3c715c](https://github.com/streamich/react-use/commit/f3c715c12412224be815e0d1bc3e2285f275df26))

# [15.2.0](https://github.com/streamich/react-use/compare/v15.1.1...v15.2.0) (2020-06-07)


### Features

* add useMouseWheel hook ([d714b12](https://github.com/streamich/react-use/commit/d714b12e8b2d071c65fe4dc7643be10f69dc5dba))

## [15.1.1](https://github.com/streamich/react-use/compare/v15.1.0...v15.1.1) (2020-05-30)


### Bug Fixes

* 🐛 use useIsomorphicLayoutEffect everywhere ([dad26e5](https://github.com/streamich/react-use/commit/dad26e507d3409300f945bc57930f88c5a11953d))

# [15.1.0](https://github.com/streamich/react-use/compare/v15.0.3...v15.1.0) (2020-05-18)


### Bug Fixes

* display alert timeout in story ([2bb65ef](https://github.com/streamich/react-use/commit/2bb65ef3d85e82b6bd134a714e51e27876037734))
* mutate ref in render directly ([5488f5e](https://github.com/streamich/react-use/commit/5488f5eb3e8504dcae03584b5797a48659e16623))


### Features

* add useLatest hook ([d6fe267](https://github.com/streamich/react-use/commit/d6fe2676153f19302ce170b03ceadc3bab5a945a))

## [15.0.3](https://github.com/streamich/react-use/compare/v15.0.2...v15.0.3) (2020-05-18)


### Bug Fixes

* 🐛 correct useMeasure typings ([bedbad7](https://github.com/streamich/react-use/commit/bedbad723171ed1946bc80f72609432983d4c1ba))

## [15.0.2](https://github.com/streamich/react-use/compare/v15.0.1...v15.0.2) (2020-05-17)


### Bug Fixes

* 🐛 dont memoize useScratch event handlers ([ffc7579](https://github.com/streamich/react-use/commit/ffc75790e329cb26000a174074c07d80283b5443))

## [15.0.1](https://github.com/streamich/react-use/compare/v15.0.0...v15.0.1) (2020-05-16)


### Bug Fixes

* **deps:** update dependency tslib to v2 ([6aebf3c](https://github.com/streamich/react-use/commit/6aebf3c25e14d12d8f34e62ecbaecfd3125cf2d9))

# [15.0.0](https://github.com/streamich/react-use/compare/v14.3.0...v15.0.0) (2020-05-16)


* v15 release ([0f82ba6](https://github.com/streamich/react-use/commit/0f82ba650ed3e8b05b5458a243e7eb246fd954d2))


### Bug Fixes

* 🐛 better serialization handling in useLocalStorage hook ([68fb835](https://github.com/streamich/react-use/commit/68fb835ea64cf5587c99645a09c6de93ab1b71df))
* 🐛 correctly test if env is browser in useMeasure ([9ae494f](https://github.com/streamich/react-use/commit/9ae494fc1874619aad2f3856df790cbc1a2a8239))
* 🐛 make useMeasure work on server ([2daf769](https://github.com/streamich/react-use/commit/2daf76990d0e1040f8c0f31e16e7c1eebd94c9bf))
* 🐛 remove set dependencies in useSet hook ([90ba9d0](https://github.com/streamich/react-use/commit/90ba9d000ff35039028cb66753114a6b0b452491))
* 🐛 revert useMeasure defaults to zeros ([dc92b64](https://github.com/streamich/react-use/commit/dc92b646d0cd0f12868fde370c83e94ca3c7e297))
* remove console log 🤓 ([f17c8a0](https://github.com/streamich/react-use/commit/f17c8a0f8e63bfddb8f13a094edbea1e3ee9680b))
* **useLocalStorage:** using undefined for empty value instead of null ([1620e01](https://github.com/streamich/react-use/commit/1620e019fff94fb4a7a711fd3121ec02c7e99301))
* use latest set object in useSet "has" method ([41f9452](https://github.com/streamich/react-use/commit/41f9452722d6fb7d2628480d7ce657e4f08e441a))


### Features

* 🎸 add useScratch() sensor hook ([58db2f9](https://github.com/streamich/react-use/commit/58db2f989d5d4f75ac5e8ef54c25a9df8bb173a5))
* 🎸 catch up with v14 ([be69035](https://github.com/streamich/react-use/commit/be69035caf13f551e7717d3de0ea339c8943a9de))
* 🎸 improve implementation of useMeasure() hook ([a164843](https://github.com/streamich/react-use/commit/a1648439021a45c781c2074489d7c6aaaa867406))
* 🎸 improve implementation of useMeasure() hook ([4d88240](https://github.com/streamich/react-use/commit/4d8824064a0afbeba5a15597b007f8463fdbe027))
* 🎸 mock useMeasure() hook on server and w/o ResizeObserver ([866f3d7](https://github.com/streamich/react-use/commit/866f3d740b08d4772dfbad9c48b3b0b8bac69a28))
* 🎸 mock useMeasure() hook on server and w/o ResizeObserver ([2bbc73a](https://github.com/streamich/react-use/commit/2bbc73a5f08e9a21bb3054527fc8ff9fd51cfd47))
* 🎸 remove resize-observer-polyfill from useMeasure ([2a13fba](https://github.com/streamich/react-use/commit/2a13fbae45af3a26c984de03130139181c0c3839))
* 🎸 remove resize-observer-polyfill from useMeasure ([bf11131](https://github.com/streamich/react-use/commit/bf11131052c4a4ab2b9306486f0b171ac15057b0))
* Dependencies inference for useCustomCompareEffect ([477c164](https://github.com/streamich/react-use/commit/477c1644a7225513c53294337be3c5b50126712f))
* improve useAsyncFn and useAsync typings ([85967e2](https://github.com/streamich/react-use/commit/85967e294ce268bd1edc57968f2c3f85a3ee6cb7))
* keep previous state in useAsyncFn ([54ac91b](https://github.com/streamich/react-use/commit/54ac91b28dca0f5c276b092d563b9c821cbab081))
* use useReducer in useUpdate hook, instead of useState + useCallback ([6575b14](https://github.com/streamich/react-use/commit/6575b14985ede9b8f45fdad068ee9238d6f7ab80))
* **useLocalStorage:** add remove feature. ([#229](https://github.com/streamich/react-use/issues/229)) ([587de16](https://github.com/streamich/react-use/commit/587de16ef5c85497d01e63247a578116d0605ff9))


### BREAKING CHANGES

* implementation of useMeasure and useLocalStorage changed
* resize-observer-polyfill package is not used with useMeasure() hook
anymore.
* useMeasure() now defaults all values to -1, if they were not set and
internal implementation heavily refactored.
* useAsyncFn now keeps hold of old result/error when called multiple times
* resize-observer-polyfill package is not used with useMeasure() hook
anymore.
* useMeasure() now defaults all values to -1, if they were not set and
internal implementation heavily refactored.

# [14.3.0](https://github.com/streamich/react-use/compare/v14.2.0...v14.3.0) (2020-05-16)


### Features

* 🎸 add useScratch hook ([2a2a298](https://github.com/streamich/react-use/commit/2a2a298b73f7beb9a2a61c309e649be3d2527473))

# [14.2.0](https://github.com/streamich/react-use/compare/v14.1.1...v14.2.0) (2020-04-24)


### Features

* 🎸 onScrubStop provide value where scrub stopped ([138b43c](https://github.com/streamich/react-use/commit/138b43cd1ac9ea7c76a1a42fca48ebdcb94e1006))

## [14.1.1](https://github.com/streamich/react-use/compare/v14.1.0...v14.1.1) (2020-04-11)


### Bug Fixes

* **deps:** update dependency @types/js-cookie to v2.2.6 ([f9f4fae](https://github.com/streamich/react-use/commit/f9f4fae6a9a136fdd6763dd2b2214c1746fb0595))

# [14.1.0](https://github.com/streamich/react-use/compare/v14.0.0...v14.1.0) (2020-04-08)


### Features

* add useHash hook ([44a6cde](https://github.com/streamich/react-use/commit/44a6cde00e1c74831d7c38b8ae4946f6f2171cf5))

# [14.0.0](https://github.com/streamich/react-use/compare/v13.27.1...v14.0.0) (2020-04-04)


### Features

* **useRafLoop:** implement [#1090](https://github.com/streamich/react-use/issues/1090) ([1ef1272](https://github.com/streamich/react-use/commit/1ef1272d6dbe8fbcc2d08223cd80ef32ce28a9c9))
* **useRafLoop:** reworked the hook, now it do not re-render parent component. ([baa2f75](https://github.com/streamich/react-use/commit/baa2f7511e18fc9fec29376afa27af73de633d8f))


### BREAKING CHANGES

* **useRafLoop:** changed return array, now it returns only functions in next order: [stop, start, isActive].

Parent component is not re-rendered on loop start/stop.

## [13.27.1](https://github.com/streamich/react-use/compare/v13.27.0...v13.27.1) (2020-03-25)


### Bug Fixes

* **deps:** update dependency @xobotyi/scrollbar-width to v1.9.5 ([9751390](https://github.com/streamich/react-use/commit/97513900de7b60d8da62db35125e2f81458a4f25))

# [13.27.0](https://github.com/streamich/react-use/compare/v13.26.5...v13.27.0) (2020-03-03)


### Features

* **useSet:** add toggle a method ([#968](https://github.com/streamich/react-use/issues/968)) ([477614f](https://github.com/streamich/react-use/commit/477614f9ef84d3cfa75f9c8a97dbc73d30dd411d))

## [13.26.5](https://github.com/streamich/react-use/compare/v13.26.4...v13.26.5) (2020-03-02)


### Bug Fixes

* **deps:** update dependency @xobotyi/scrollbar-width to v1.9.4 ([29d017b](https://github.com/streamich/react-use/commit/29d017b2417f53455ee182aa1ad9574a3ee098d6))

## [13.26.4](https://github.com/streamich/react-use/compare/v13.26.3...v13.26.4) (2020-02-29)


### Bug Fixes

* useHoverDirty eslint fix ([0ed6521](https://github.com/streamich/react-use/commit/0ed6521179fe193007f504b3b221a6c5295f9fa0))

## [13.26.3](https://github.com/streamich/react-use/compare/v13.26.2...v13.26.3) (2020-02-26)


### Bug Fixes

* **deps:** update dependency @types/js-cookie to v2.2.5 ([1f3217a](https://github.com/streamich/react-use/commit/1f3217a07f0b11ed4d6264687188f587501c133b))

## [13.26.2](https://github.com/streamich/react-use/compare/v13.26.1...v13.26.2) (2020-02-24)


### Bug Fixes

* **deps:** update dependency @xobotyi/scrollbar-width to v1.9.3 ([6e2287d](https://github.com/streamich/react-use/commit/6e2287d7e84ef1e455da7209ee32cf86643b00a5))

## [13.26.1](https://github.com/streamich/react-use/compare/v13.26.0...v13.26.1) (2020-02-16)


### Bug Fixes

* **deps:** update dependency @xobotyi/scrollbar-width to v1.9.0 ([601d787](https://github.com/streamich/react-use/commit/601d7871a0325677a24a7a93fc9ce2b11132370f))

# [13.26.0](https://github.com/streamich/react-use/compare/v13.25.1...v13.26.0) (2020-02-15)


### Bug Fixes

* add initialState to deps ([b394f3d](https://github.com/streamich/react-use/commit/b394f3d72356d331dbce48acd3686bbb64d331b5))


### Features

* add useMethods state hook ([7554b9a](https://github.com/streamich/react-use/commit/7554b9a61eb9b4744b9feb113775ff538b16beaf))

## [13.25.1](https://github.com/streamich/react-use/compare/v13.25.0...v13.25.1) (2020-02-15)


### Bug Fixes

* 🐛 support default event in useClickAway() ([24281cd](https://github.com/streamich/react-use/commit/24281cdf042da5f83068c6108c67a36fe0cfc74d))
* generic type on event arg in onClickAway callback on useClickAway ([4ffe454](https://github.com/streamich/react-use/commit/4ffe4542aec840bd6150223489d2c38821954336))

# [13.25.0](https://github.com/streamich/react-use/compare/v13.24.1...v13.25.0) (2020-02-15)


### Features

* **useBeforeUnload:** allow passing a dirty function ([#842](https://github.com/streamich/react-use/issues/842)) ([c4a14a4](https://github.com/streamich/react-use/commit/c4a14a4fb370c7628e4cc5861e31cc64a66b64b0))

## [13.24.1](https://github.com/streamich/react-use/compare/v13.24.0...v13.24.1) (2020-02-15)


### Performance Improvements

* use fast-deep-equal for deep comparisons ([b9a8aad](https://github.com/streamich/react-use/commit/b9a8aad053a40028f119192ddecedb5c7ec05247))

# [13.24.0](https://github.com/streamich/react-use/compare/v13.23.0...v13.24.0) (2020-02-04)


### Features

* add createReducerContext and createStateContext factories ([84b8310](https://github.com/streamich/react-use/commit/84b83101c2253f8935b2804a48ade081e41982a8))

# [13.23.0](https://github.com/streamich/react-use/compare/v13.22.5...v13.23.0) (2020-02-04)


### Features

* add createGlobalState hook generator ([fda7199](https://github.com/streamich/react-use/commit/fda7199b7da23f321e68d0784deb1f0f3d273e3c))

## [13.22.5](https://github.com/streamich/react-use/compare/v13.22.4...v13.22.5) (2020-02-04)


### Bug Fixes

* 🐛 don't throw in useMediaDevices on missing browser API ([0f119fe](https://github.com/streamich/react-use/commit/0f119fe23e837e0d8c2a8c882b1aaf3b62cbc7d2))
* handle undefined mediaDevices ([6f68437](https://github.com/streamich/react-use/commit/6f68437359704dace7d518f1f013bc3516400c67))

## [13.22.4](https://github.com/streamich/react-use/compare/v13.22.3...v13.22.4) (2020-01-30)


### Bug Fixes

* **deps:** update dependency @xobotyi/scrollbar-width to v1.8.2 ([#930](https://github.com/streamich/react-use/issues/930)) ([727b950](https://github.com/streamich/react-use/commit/727b95096ec6654ba4da22f6825e6d8982258033))

## [13.22.3](https://github.com/streamich/react-use/compare/v13.22.2...v13.22.3) (2020-01-28)


### Bug Fixes

* **useIntersection:** disconnect an old IntersectionObserver instance when the ref changes ([ac2f54a](https://github.com/streamich/react-use/commit/ac2f54a8f683296feecfeeb6354738b9ebbc36d0))
* **useIntersection:** reset an intersectionObserverEntry when the ref changes ([3f8687e](https://github.com/streamich/react-use/commit/3f8687e1f51cc48efbf6be3f0677f5bd06ecba08))
* **useIntersection:** return null if IntersectionObserver is not supported ([4f6d388](https://github.com/streamich/react-use/commit/4f6d3887be5cf62ce42357a7bf27f4ae8b080eba))

## [13.22.2](https://github.com/streamich/react-use/compare/v13.22.1...v13.22.2) (2020-01-27)


### Bug Fixes

* **deps:** update dependency @xobotyi/scrollbar-width to v1.7.0 ([db74101](https://github.com/streamich/react-use/commit/db741019324c3d20a17bbc20a014cedd21e66b1a))

## [13.22.1](https://github.com/streamich/react-use/compare/v13.22.0...v13.22.1) (2020-01-27)


### Bug Fixes

* **deps:** update dependency @xobotyi/scrollbar-width to v1.6.0 ([431ba5d](https://github.com/streamich/react-use/commit/431ba5d0816cb7701b03460c5efa5199ad27cbc4))

# [13.22.0](https://github.com/streamich/react-use/compare/v13.21.0...v13.22.0) (2020-01-24)


### Bug Fixes

* Fail testing and update doc ([57b9041](https://github.com/streamich/react-use/commit/57b904118e2cd1f1b4e367c9a14e2a981db2f06a))


### Features

* add useLongPress hook ([45681b8](https://github.com/streamich/react-use/commit/45681b88e3fd3d9337a38da07248c46ec6d5956e))

# [13.21.0](https://github.com/streamich/react-use/compare/v13.20.0...v13.21.0) (2020-01-20)


### Features

* Typings for `useDefault` ([fa0f53b](https://github.com/streamich/react-use/commit/fa0f53bf86a712f4b7e503cdf4718a8ff5448e05))

# [13.20.0](https://github.com/streamich/react-use/compare/v13.19.0...v13.20.0) (2020-01-17)


### Features

* `useMap`: allow resetting with provided value other then initial ([7645f72](https://github.com/streamich/react-use/commit/7645f7249dbf52db140dfc8b7866cb4a171e439c))

# [13.19.0](https://github.com/streamich/react-use/compare/v13.18.0...v13.19.0) (2020-01-16)


### Features

* add useError hook ([65f3644](https://github.com/streamich/react-use/commit/65f364420524bacebe8f8149b8197fb62bff1a08))

# [13.18.0](https://github.com/streamich/react-use/compare/v13.17.0...v13.18.0) (2020-01-16)


### Bug Fixes

* check for null ([d619c39](https://github.com/streamich/react-use/commit/d619c39a21e9f0b4b4bfc6a209311bf0bd495f9b))


### Features

* add serializer/deserializer option to useLocalStorage ([5316510](https://github.com/streamich/react-use/commit/5316510babf7606a2f4b78de2b0eb85c930890cf))

# [13.17.0](https://github.com/streamich/react-use/compare/v13.16.1...v13.17.0) (2020-01-15)


### Features

* add support for body lock on iOS ([d778408](https://github.com/streamich/react-use/commit/d7784084fe84aca72efe85260101b00ef1df7580))

## [13.16.1](https://github.com/streamich/react-use/compare/v13.16.0...v13.16.1) (2020-01-14)


### Bug Fixes

* update the types dep for js-cookie ([5c55d59](https://github.com/streamich/react-use/commit/5c55d59a7d1d799cba7af87e15ab4a4b27a8fc67))

# [13.16.0](https://github.com/streamich/react-use/compare/v13.15.0...v13.16.0) (2020-01-14)


### Features

* add option to useTitle to restore title on un-mount ([b8b3e47](https://github.com/streamich/react-use/commit/b8b3e479cea6071d4310bac29f138bd8917eee0b))

# [13.15.0](https://github.com/streamich/react-use/compare/v13.14.3...v13.15.0) (2020-01-13)


### Features

* add useCookie hook ([4e5c90f](https://github.com/streamich/react-use/commit/4e5c90f021f56ae2008dc25daad69c43063f608f))

## [13.14.3](https://github.com/streamich/react-use/compare/v13.14.2...v13.14.3) (2020-01-08)


### Bug Fixes

* useUpdateEffect cleanup test returns false positive ([9b31c42](https://github.com/streamich/react-use/commit/9b31c42ccb42fe13fc24f7434b00a1bcbee8cd8a))
* useUpdateEffect test returning false positive ([#865](https://github.com/streamich/react-use/issues/865)) ([1946006](https://github.com/streamich/react-use/commit/1946006c4224bc61eabb797f4cdd7d20fff7ab25))

## [13.14.2](https://github.com/streamich/react-use/compare/v13.14.1...v13.14.2) (2020-01-08)


### Bug Fixes

* bump fast-shallow-equal ([19b2b39](https://github.com/streamich/react-use/commit/19b2b39eeae3898bd8d8e3478eb7459372bb09d5))

## [13.14.1](https://github.com/streamich/react-use/compare/v13.14.0...v13.14.1) (2020-01-07)


### Bug Fixes

* useUpdateEffect returns optional cleanup function ([0ce421c](https://github.com/streamich/react-use/commit/0ce421ced78fd6eb06a5676fefb856e18bfcacc1))
* useUpdateEffect returns optional cleanup function ([#864](https://github.com/streamich/react-use/issues/864)) ([7960127](https://github.com/streamich/react-use/commit/7960127a98c0d3c33000088fbd97804d41084f7d))

# [13.14.0](https://github.com/streamich/react-use/compare/v13.13.0...v13.14.0) (2020-01-03)


### Features

* 🎸 add [vertical] flag to useSlider() hook ([777865c](https://github.com/streamich/react-use/commit/777865c3ac6772fbda2bc0a6f58cde3eff7dec43))

# [13.13.0](https://github.com/streamich/react-use/compare/v13.12.2...v13.13.0) (2019-12-27)


### Features

* add useShallowCompareEffect and useCustomCompareEffect hooks ([ba8803e](https://github.com/streamich/react-use/commit/ba8803eab26d2d48028a4b7120a7354c6d318aea))

## [13.12.2](https://github.com/streamich/react-use/compare/v13.12.1...v13.12.2) (2019-12-10)


### Bug Fixes

* **useSet:** "has" method in useSet updated to reference latest set object ([4f1d8c2](https://github.com/streamich/react-use/commit/4f1d8c2cbd773f2a26e2eee4fbad88883ea4b405))

## [13.12.1](https://github.com/streamich/react-use/compare/v13.12.0...v13.12.1) (2019-12-09)


### Bug Fixes

* **useMap:** methods with side effects should be stable across renders. ([020b4db](https://github.com/streamich/react-use/commit/020b4dbc6c47ab25243ab8af257dd045e6c1bf6d))

# [13.12.0](https://github.com/streamich/react-use/compare/v13.11.0...v13.12.0) (2019-12-09)


### Features

* useScrollbarWidth hook; ([#825](https://github.com/streamich/react-use/issues/825)) ([125c7e9](https://github.com/streamich/react-use/commit/125c7e96a188405aea36e94ed1bb3d984232b2f6))

# [13.11.0](https://github.com/streamich/react-use/compare/v13.10.2...v13.11.0) (2019-12-08)


### Features

* 🎸 add useUnmountPromise hook ([01421bc](https://github.com/streamich/react-use/commit/01421bc634b941044e95c611f37eb87339486241))

## [13.10.2](https://github.com/streamich/react-use/compare/v13.10.1...v13.10.2) (2019-12-05)


### Bug Fixes

* useUpdate hitting maxInt, failing to trigger rerender ([93e7291](https://github.com/streamich/react-use/commit/93e72910abf2dafe5bdff625a21f633afd6e52c5))

## [13.10.1](https://github.com/streamich/react-use/compare/v13.10.0...v13.10.1) (2019-12-03)


### Bug Fixes

* "get" method in useMap updated to reference latest map object ([044d267](https://github.com/streamich/react-use/commit/044d2677aa474d19da776444b78bd3d2594c6ae5))

# [13.10.0](https://github.com/streamich/react-use/compare/v13.9.0...v13.10.0) (2019-11-28)


### Features

* useStateHistory ([#709](https://github.com/streamich/react-use/issues/709)) ([0a66359](https://github.com/streamich/react-use/commit/0a6635914319e9ef7a2902189a3c2dea90a2bf7f))

# [13.9.0](https://github.com/streamich/react-use/compare/v13.8.2...v13.9.0) (2019-11-23)


### Features

* add useFirstMountState & useRendersCount hooks ([#769](https://github.com/streamich/react-use/issues/769)) ([30abe2b](https://github.com/streamich/react-use/commit/30abe2b22e3cb7a3e4c6dedd2466d74ce660911d))

## [13.8.2](https://github.com/streamich/react-use/compare/v13.8.1...v13.8.2) (2019-11-22)


### Bug Fixes

* **#792:** make useUnmount invoke the current callback version instead of very first ([75284c6](https://github.com/streamich/react-use/commit/75284c62c8e4a68dfeb41a8d98a1e636e9ef531a)), closes [#792](https://github.com/streamich/react-use/issues/792)

## [13.8.1](https://github.com/streamich/react-use/compare/v13.8.0...v13.8.1) (2019-11-21)


### Bug Fixes

* useAsyncFn does not discard old promises and might produce races ([022fa0b](https://github.com/streamich/react-use/commit/022fa0b7b77d582a10c6ca61a3dcd901770011c8))

# [13.8.0](https://github.com/streamich/react-use/compare/v13.7.0...v13.8.0) (2019-11-14)


### Features

* **useStateValidator:** Refactor method and improve typings; ([436c210](https://github.com/streamich/react-use/commit/436c210f7b577c6958e47df3a244907b07a4db9f))

# [13.7.0](https://github.com/streamich/react-use/compare/v13.6.3...v13.7.0) (2019-11-14)


### Features

* Add useSet hook ([095b4de](https://github.com/streamich/react-use/commit/095b4de2321b8bf3431e3f66139629b0495f1ac9))

## [13.6.3](https://github.com/streamich/react-use/compare/v13.6.2...v13.6.3) (2019-11-12)


### Bug Fixes

* remove any types in useThrottleFn ([bb5baea](https://github.com/streamich/react-use/commit/bb5baea30cf59721098ca9e3185105bf1b82218b))

## [13.6.2](https://github.com/streamich/react-use/compare/v13.6.1...v13.6.2) (2019-11-11)


### Bug Fixes

* restrict useThrottleFn types ([61a83d1](https://github.com/streamich/react-use/commit/61a83d124d35d5606b6c0700faf1361fd3170ca4))

## [13.6.1](https://github.com/streamich/react-use/compare/v13.6.0...v13.6.1) (2019-11-10)


### Bug Fixes

* 🐛 check window.Event constructor exists in useLocation ([ad09431](https://github.com/streamich/react-use/commit/ad094311454c48873ba7143654a29b8a0c54459d))

# [13.6.0](https://github.com/streamich/react-use/compare/v13.5.0...v13.6.0) (2019-11-10)


### Features

* **useCounter:** `reset` to the newest initialValue ([#667](https://github.com/streamich/react-use/issues/667)) ([e653383](https://github.com/streamich/react-use/commit/e65338372adfccd4800496b377f63bcdf6646788))

# [13.5.0](https://github.com/streamich/react-use/compare/v13.4.0...v13.5.0) (2019-11-08)


### Bug Fixes

* **resolveHookState:** by accident removed needed type. ([59aa41c](https://github.com/streamich/react-use/commit/59aa41cff435f5adf7f38d361649761b8dd69794))


### Features

* **useList:** reimplemented useList hook; ([1840b57](https://github.com/streamich/react-use/commit/1840b577e2a3d321b8dbb44d5ae443e84d4d9e20))

# [13.4.0](https://github.com/streamich/react-use/compare/v13.3.0...v13.4.0) (2019-11-08)


### Features

* **useStateList:** implemented `currentIndex`, `setState`, `setStateAt` methods as requested in [#634](https://github.com/streamich/react-use/issues/634); ([43cb6aa](https://github.com/streamich/react-use/commit/43cb6aa612ae869e24f67acf6f0a1712a65f128b))

# [13.3.0](https://github.com/streamich/react-use/compare/v13.2.2...v13.3.0) (2019-11-06)


### Features

* useDebounce add cancel ([693aec8](https://github.com/streamich/react-use/commit/693aec8307c378697c88c635a401832f24d3531a))
* useDebounce add cancel ([26cab31](https://github.com/streamich/react-use/commit/26cab31f10a995ec45d6c1e2a2f724d9994d801f))

## [13.2.2](https://github.com/streamich/react-use/compare/v13.2.1...v13.2.2) (2019-11-06)


### Bug Fixes

* **#749:** now should work with SSR ([c12976c](https://github.com/streamich/react-use/commit/c12976cad26577a4be3ac65133268f41bbdc82da)), closes [#749](https://github.com/streamich/react-use/issues/749)

## [13.2.1](https://github.com/streamich/react-use/compare/v13.2.0...v13.2.1) (2019-11-04)


### Bug Fixes

* **yarn.lock:** re-create the yarn.lock file with nailed versions in devDeps ([f094a3a](https://github.com/streamich/react-use/commit/f094a3ae833f406137b9d5355843a6615af20164))

# [13.2.0](https://github.com/streamich/react-use/compare/v13.1.0...v13.2.0) (2019-11-04)


### Features

* re-create yarn.lock ([d48e03e](https://github.com/streamich/react-use/commit/d48e03e9ee38555ff29ca46fb6e75c13e9c23aba))
* re-create yarn.lock ([ccdffe0](https://github.com/streamich/react-use/commit/ccdffe027fba15bdca1f35dc375a0c32739aee6f))
* **usePreviousDistinct:** add tests for undefined value behaviour; ([cb373f9](https://github.com/streamich/react-use/commit/cb373f951fb3f34b9e54793687de14000a2dc08e))
* **usePreviousDistinct:** improve types; ([30f53e8](https://github.com/streamich/react-use/commit/30f53e8c5d7e8b27bf3f273ebfcacabf30146ba3))
* **usePreviousDistinct:** now predicate not called on initial render; ([fbe9b13](https://github.com/streamich/react-use/commit/fbe9b1303c0433d5608ca5b507d9c76711b5cb68))
* **useStateList:** rework useStateList to make it work properly. ([242c274](https://github.com/streamich/react-use/commit/242c274dd49779fa80f8b9e451c699205279339e))
* **useTitle:** reworked hook to make it synchronous without useUpdate; ([a133267](https://github.com/streamich/react-use/commit/a13326779ffd6885ac531240b984a77bcad3bee6))
* **useWindowSize:** A bit changed lyfecycle and added types; ([03bdecf](https://github.com/streamich/react-use/commit/03bdecf7ac6aa0ad863a1efd71c056aa41df62b7))

# [13.1.0](https://github.com/streamich/react-use/compare/v13.0.1...v13.1.0) (2019-11-01)


### Features

* pull request template for features ([1dc21f3](https://github.com/streamich/react-use/commit/1dc21f3))

## [13.0.1](https://github.com/streamich/react-use/compare/v13.0.0...v13.0.1) (2019-11-01)


### Bug Fixes

* **useLockBodyScroll:** infer overflow type directly from declaration. ([26baf47](https://github.com/streamich/react-use/commit/26baf47))

# [13.0.0](https://github.com/streamich/react-use/compare/v12.13.0...v13.0.0) (2019-11-01)


* Merge pull request #711 from streamich/remove-react-wait ([8d40f18](https://github.com/streamich/react-use/commit/8d40f18)), closes [#711](https://github.com/streamich/react-use/issues/711)


### Features

* remove useRefMounted hook ([ad74d3d](https://github.com/streamich/react-use/commit/ad74d3d))
* **useRefMounted:** remove obsolete hook; ([dc364c8](https://github.com/streamich/react-use/commit/dc364c8))
* **useWait:** removed from package due to it is simple reexport of other package; ([d7c38bd](https://github.com/streamich/react-use/commit/d7c38bd))


### BREAKING CHANGES

* useWait hook has been removed from react-use
* deprecated useRefMounted hook is now removed, use useMountedState hook instead

# [12.13.0](https://github.com/streamich/react-use/compare/v12.12.0...v12.13.0) (2019-10-31)


### Features

* **useCounter:** reworked with use of new resolveHookState function plus improved memory usage; ([befcf84](https://github.com/streamich/react-use/commit/befcf84))
* **useGetSet:** reworked with use of new resolveHookState function plus improved memory usage; ([9b5d0f2](https://github.com/streamich/react-use/commit/9b5d0f2))
* react-like state resolver to use it in stateful hooks; ([9fd02eb](https://github.com/streamich/react-use/commit/9fd02eb))

# [12.12.0](https://github.com/streamich/react-use/compare/v12.11.0...v12.12.0) (2019-10-31)


### Features

* add typings for createReducer ([f1cf036](https://github.com/streamich/react-use/commit/f1cf036))

# [12.11.0](https://github.com/streamich/react-use/compare/v12.10.0...v12.11.0) (2019-10-31)


### Features

* **useWait:** add deprecation messages to readme and export; ([d338245](https://github.com/streamich/react-use/commit/d338245))

# [12.10.0](https://github.com/streamich/react-use/compare/v12.9.1...v12.10.0) (2019-10-30)


### Features

* **useUpdate:** improve memory usage - now single function instance to increment all counters; ([0f02fd0](https://github.com/streamich/react-use/commit/0f02fd0))

## [12.9.1](https://github.com/streamich/react-use/compare/v12.9.0...v12.9.1) (2019-10-28)


### Bug Fixes

* useSize avoid crash in Safari 11 ([da0e66b](https://github.com/streamich/react-use/commit/da0e66b))

# [12.9.0](https://github.com/streamich/react-use/compare/v12.8.0...v12.9.0) (2019-10-26)


### Features

* add createBreakpoint ([79ba4ef](https://github.com/streamich/react-use/commit/79ba4ef))

# [12.8.0](https://github.com/streamich/react-use/compare/v12.7.2...v12.8.0) (2019-10-25)


### Features

* add ensuredForwardRef and useEnsuredForwardedRef ([1bfe063](https://github.com/streamich/react-use/commit/1bfe063))

## [12.7.2](https://github.com/streamich/react-use/compare/v12.7.1...v12.7.2) (2019-10-23)


### Bug Fixes

* 🐛 bump set-harmonic-interval package version ([f7c709a](https://github.com/streamich/react-use/commit/f7c709a))

## [12.7.1](https://github.com/streamich/react-use/compare/v12.7.0...v12.7.1) (2019-10-17)


### Bug Fixes

* example in the docs; ([7f54cad](https://github.com/streamich/react-use/commit/7f54cad))
* rename story's mediator and add `g` flag to it's regex; ([652b318](https://github.com/streamich/react-use/commit/652b318))

# [12.7.0](https://github.com/streamich/react-use/compare/v12.6.0...v12.7.0) (2019-10-17)


### Bug Fixes

* error throw tests; ([056875b](https://github.com/streamich/react-use/commit/056875b))
* useMultiStateValidator readme description; ([8c7f7f5](https://github.com/streamich/react-use/commit/8c7f7f5))


### Features

* useMultiStateValidator ([ae26988](https://github.com/streamich/react-use/commit/ae26988))

# [12.6.0](https://github.com/streamich/react-use/compare/v12.5.0...v12.6.0) (2019-10-16)


### Features

* useRafState ([#684](https://github.com/streamich/react-use/issues/684)) ([00816a4](https://github.com/streamich/react-use/commit/00816a4))

# [12.5.0](https://github.com/streamich/react-use/compare/v12.4.0...v12.5.0) (2019-10-13)


### Features

* useList allow pushing multiple items ([#621](https://github.com/streamich/react-use/issues/621)) ([a624364](https://github.com/streamich/react-use/commit/a624364))

# [12.4.0](https://github.com/streamich/react-use/compare/v12.3.2...v12.4.0) (2019-10-12)


### Features

* useIntersection ([#652](https://github.com/streamich/react-use/issues/652)) ([d5f359f](https://github.com/streamich/react-use/commit/d5f359f))

## [12.3.2](https://github.com/streamich/react-use/compare/v12.3.1...v12.3.2) (2019-10-12)


### Bug Fixes

* improve use of refs in dependency lists ([#655](https://github.com/streamich/react-use/issues/655)) ([ed8e26d](https://github.com/streamich/react-use/commit/ed8e26d))

## [12.3.1](https://github.com/streamich/react-use/compare/v12.3.0...v12.3.1) (2019-10-10)


### Bug Fixes

* move [@types](https://github.com/types)/react-wait to dependencies, closes [#661](https://github.com/streamich/react-use/issues/661) ([#662](https://github.com/streamich/react-use/issues/662)) ([6bdd74e](https://github.com/streamich/react-use/commit/6bdd74e))

# [12.3.0](https://github.com/streamich/react-use/compare/v12.2.3...v12.3.0) (2019-10-07)


### Features

* reset util callback for useList ([#654](https://github.com/streamich/react-use/issues/654)) ([9ea3548](https://github.com/streamich/react-use/commit/9ea3548))

## [12.2.3](https://github.com/streamich/react-use/compare/v12.2.2...v12.2.3) (2019-10-05)


### Bug Fixes

* move react-wait types to dev dependencies, closes [#644](https://github.com/streamich/react-use/issues/644) ([49372ac](https://github.com/streamich/react-use/commit/49372ac))

## [12.2.2](https://github.com/streamich/react-use/compare/v12.2.1...v12.2.2) (2019-09-26)


### Bug Fixes

* useDebounce remove deps from function arguments ([#623](https://github.com/streamich/react-use/issues/623)) ([23d6a5a](https://github.com/streamich/react-use/commit/23d6a5a))

## [12.2.1](https://github.com/streamich/react-use/compare/v12.2.0...v12.2.1) (2019-09-23)


### Bug Fixes

* remove attempt from deps of retry in useAsyncRetry ([#614](https://github.com/streamich/react-use/issues/614)) ([adce59e](https://github.com/streamich/react-use/commit/adce59e))

# [12.2.0](https://github.com/streamich/react-use/compare/v12.1.0...v12.2.0) (2019-09-02)


### Features

* improve useWindowSize performance rAF ([60a4937](https://github.com/streamich/react-use/commit/60a4937))

# [12.1.0](https://github.com/streamich/react-use/compare/v12.0.0...v12.1.0) (2019-09-01)


### Features

* 🎸 add useSearchParam() hook ([b22f32f](https://github.com/streamich/react-use/commit/b22f32f))
* 🎸 support server-side rendering in useSearchParam() hook ([64ac924](https://github.com/streamich/react-use/commit/64ac924))

# [12.0.0](https://github.com/streamich/react-use/compare/v11.3.2...v12.0.0) (2019-09-01)


### Features

* store "paused" instead of "isPlaying" in media state ([ff900d5](https://github.com/streamich/react-use/commit/ff900d5))


### BREAKING CHANGES

* now media players return "paused" instead of "isPlaying" in their state.

## [11.3.2](https://github.com/streamich/react-use/compare/v11.3.1...v11.3.2) (2019-08-25)


### Bug Fixes

* useThrottle & useThrottleFn proper timeout type; ([e2cdb94](https://github.com/streamich/react-use/commit/e2cdb94))

## [11.3.1](https://github.com/streamich/react-use/compare/v11.3.0...v11.3.1) (2019-08-25)


### Bug Fixes

* update createReducer to fix initial state ([fd083f2](https://github.com/streamich/react-use/commit/fd083f2))

# [11.3.0](https://github.com/streamich/react-use/compare/v11.2.0...v11.3.0) (2019-08-25)


### Features

* add usePreviousDistinct ([#551](https://github.com/streamich/react-use/issues/551)) ([6c3e569](https://github.com/streamich/react-use/commit/6c3e569))

# [11.2.0](https://github.com/streamich/react-use/compare/v11.1.1...v11.2.0) (2019-08-25)


### Features

* add useCircularIterate ([8d84340](https://github.com/streamich/react-use/commit/8d84340))

## [11.1.1](https://github.com/streamich/react-use/compare/v11.1.0...v11.1.1) (2019-08-25)


### Bug Fixes

* [#550](https://github.com/streamich/react-use/issues/550) ([2617d74](https://github.com/streamich/react-use/commit/2617d74))

# [11.1.0](https://github.com/streamich/react-use/compare/v11.0.2...v11.1.0) (2019-08-25)


### Features

* 🎸 add useHarmonicIntervalFn() hook ([d9f21e3](https://github.com/streamich/react-use/commit/d9f21e3))

## [11.0.2](https://github.com/streamich/react-use/compare/v11.0.1...v11.0.2) (2019-08-23)


### Bug Fixes

* **useSetState:** memoize setState callback ([0275329](https://github.com/streamich/react-use/commit/0275329))
* **useSetState:** memoize setState callback ([16f023f](https://github.com/streamich/react-use/commit/16f023f))

## [11.0.1](https://github.com/streamich/react-use/compare/v11.0.0...v11.0.1) (2019-08-23)


### Bug Fixes

* correct useSpring() hook behaviour ([d7a622d](https://github.com/streamich/react-use/commit/d7a622d))

# [11.0.0](https://github.com/streamich/react-use/compare/v10.8.0...v11.0.0) (2019-08-22)


### Features

* add cancel and reset methods to useTimeout ([283045a](https://github.com/streamich/react-use/commit/283045a))
* add useTimeoutFn ([284e6fd](https://github.com/streamich/react-use/commit/284e6fd))


### BREAKING CHANGES

* useTimeout now returns a tuple

# [10.8.0](https://github.com/streamich/react-use/compare/v10.7.1...v10.8.0) (2019-08-20)


### Bug Fixes

* Reworked useBattery hook ([1069060](https://github.com/streamich/react-use/commit/1069060))
* succeed useRafLoop tests ([09167df](https://github.com/streamich/react-use/commit/09167df))


### Features

* 🎸 support useBattery hook on server side ([5d31cf0](https://github.com/streamich/react-use/commit/5d31cf0))
* 🎸 use only one useState and one useEffect call ([2d0fabf](https://github.com/streamich/react-use/commit/2d0fabf))

## [10.7.1](https://github.com/streamich/react-use/compare/v10.7.0...v10.7.1) (2019-08-20)


### Bug Fixes

* async test warnings ([#543](https://github.com/streamich/react-use/issues/543)) ([7af237e](https://github.com/streamich/react-use/commit/7af237e))

# [10.7.0](https://github.com/streamich/react-use/compare/v10.6.4...v10.7.0) (2019-08-19)


### Features

* 🎸 add useUpsert ([6875e13](https://github.com/streamich/react-use/commit/6875e13))
* 🎸 export useUpsert from index ([3eda2b2](https://github.com/streamich/react-use/commit/3eda2b2))
* add useUpsert ([a7c2899](https://github.com/streamich/react-use/commit/a7c2899))

## [10.6.4](https://github.com/streamich/react-use/compare/v10.6.3...v10.6.4) (2019-08-19)


### Bug Fixes

* return from useUpdateEffect ([2f70dc2](https://github.com/streamich/react-use/commit/2f70dc2))
* useUpdateEffect add return ([8b24df4](https://github.com/streamich/react-use/commit/8b24df4))

## [10.6.3](https://github.com/streamich/react-use/compare/v10.6.2...v10.6.3) (2019-08-19)


### Bug Fixes

* allow import default for ESM ([bd3a062](https://github.com/streamich/react-use/commit/bd3a062))
* rollup build error: Cannot call a namespace ('writeText') ([b3e672b](https://github.com/streamich/react-use/commit/b3e672b))

## [10.6.2](https://github.com/streamich/react-use/compare/v10.6.1...v10.6.2) (2019-08-18)


### Bug Fixes

* 🐛 fix master ([d1df7a5](https://github.com/streamich/react-use/commit/d1df7a5))

## [10.6.1](https://github.com/streamich/react-use/compare/v10.6.0...v10.6.1) (2019-08-17)


### Bug Fixes

* useUpdateEffect run on the wrong time ([1d5cd10](https://github.com/streamich/react-use/commit/1d5cd10))

# [10.6.0](https://github.com/streamich/react-use/compare/v10.5.0...v10.6.0) (2019-08-17)


### Features

* add min/max to useNumber ([586faab](https://github.com/streamich/react-use/commit/586faab))

# [10.5.0](https://github.com/streamich/react-use/compare/v10.4.0...v10.5.0) (2019-08-03)


### Features

* add useRafLoop hook ([be7d7c3](https://github.com/streamich/react-use/commit/be7d7c3))

# [10.4.0](https://github.com/streamich/react-use/compare/v10.3.1...v10.4.0) (2019-08-02)


### Features

* add useMountedState hook ([9081b99](https://github.com/streamich/react-use/commit/9081b99))

## [10.3.1](https://github.com/streamich/react-use/compare/v10.3.0...v10.3.1) (2019-08-02)


### Bug Fixes

* **storybook:** fix useKeyboardJs import path ([b7481f6](https://github.com/streamich/react-use/commit/b7481f6))
* **useKeyboardJs:** fix argument type error ([8c820ce](https://github.com/streamich/react-use/commit/8c820ce))
* allow string list in useKeyboardJs hook ([aecbd0b](https://github.com/streamich/react-use/commit/aecbd0b))

# [10.3.0](https://github.com/streamich/react-use/compare/v10.2.0...v10.3.0) (2019-07-26)


### Features

* add useDefault hook ([ade0557](https://github.com/streamich/react-use/commit/ade0557))

# [10.2.0](https://github.com/streamich/react-use/compare/v10.1.2...v10.2.0) (2019-07-25)


### Features

* useWindowScroll - for cross-browser compatibility ([5987cc8](https://github.com/streamich/react-use/commit/5987cc8))
* useWindowScroll - for cross-browser compatibility ([#480](https://github.com/streamich/react-use/issues/480)) ([e37dd8d](https://github.com/streamich/react-use/commit/e37dd8d))

## [10.1.2](https://github.com/streamich/react-use/compare/v10.1.1...v10.1.2) (2019-07-21)


### Bug Fixes

* remove OpenCollective postinstall hook ([26dcebc](https://github.com/streamich/react-use/commit/26dcebc))

## [10.1.1](https://github.com/streamich/react-use/compare/v10.1.0...v10.1.1) (2019-07-21)


### Bug Fixes

* useMouse & useMouseHovered type definitions for SVG ([9e97451](https://github.com/streamich/react-use/commit/9e97451))
* useMouse & useMouseHovered type definitions for SVG ([#479](https://github.com/streamich/react-use/issues/479)) ([e2e4a60](https://github.com/streamich/react-use/commit/e2e4a60))

# [10.1.0](https://github.com/streamich/react-use/compare/v10.0.0...v10.1.0) (2019-07-17)


### Features

* add latest `react-wait` types ([6ebe3bb](https://github.com/streamich/react-use/commit/6ebe3bb))

# [10.0.0](https://github.com/streamich/react-use/compare/v9.12.0...v10.0.0) (2019-07-17)


### Features

* remove big libs from peerDependencies ([1dbdc5d](https://github.com/streamich/react-use/commit/1dbdc5d))


### BREAKING CHANGES

* `useSpring` and `useKeyboardJs` hooks need to be imported directly now and libs they depend on are not in peerDependencies anymore.

# [9.12.0](https://github.com/streamich/react-use/compare/v9.11.2...v9.12.0) (2019-07-16)


### Bug Fixes

* 🐛 fix useDebounce import ([40b33da](https://github.com/streamich/react-use/commit/40b33da))


### Features

* add useInterval hook ([6645ed9](https://github.com/streamich/react-use/commit/6645ed9))

## [9.11.2](https://github.com/streamich/react-use/compare/v9.11.1...v9.11.2) (2019-07-16)


### Bug Fixes

* support useMedia usage server-side ([50a5160](https://github.com/streamich/react-use/commit/50a5160))

## [9.11.1](https://github.com/streamich/react-use/compare/v9.11.0...v9.11.1) (2019-07-16)


### Bug Fixes

* createReducer stable dispatch function identity ([9780545](https://github.com/streamich/react-use/commit/9780545))

# [9.11.0](https://github.com/streamich/react-use/compare/v9.10.0...v9.11.0) (2019-07-11)


### Features

* useMedia - initialize state with call to media query ([#454](https://github.com/streamich/react-use/issues/454)) ([ab81897](https://github.com/streamich/react-use/commit/ab81897))

# [9.10.0](https://github.com/streamich/react-use/compare/v9.9.0...v9.10.0) (2019-07-10)


### Features

* expose useIsomorphicLayoutEffect + docs ([#451](https://github.com/streamich/react-use/issues/451)) ([8dcbbf1](https://github.com/streamich/react-use/commit/8dcbbf1))

# [9.9.0](https://github.com/streamich/react-use/compare/v9.8.3...v9.9.0) (2019-07-10)


### Features

* add usePermission ([4da40b9](https://github.com/streamich/react-use/commit/4da40b9))
* usePermission ([588a0c5](https://github.com/streamich/react-use/commit/588a0c5))

## [9.8.3](https://github.com/streamich/react-use/compare/v9.8.2...v9.8.3) (2019-07-10)


### Bug Fixes

* useLocalStorage types for functional updates ([e2b8278](https://github.com/streamich/react-use/commit/e2b8278))

## [9.8.2](https://github.com/streamich/react-use/compare/v9.8.1...v9.8.2) (2019-07-08)


### Bug Fixes

* **useSize:** prevents accessing iframe's property when it's not defined ([c9b5cdc](https://github.com/streamich/react-use/commit/c9b5cdc)), closes [#442](https://github.com/streamich/react-use/issues/442)
* **useSize:** prevents accessing iframe's property when it's not… ([#443](https://github.com/streamich/react-use/issues/443)) ([8f04e8f](https://github.com/streamich/react-use/commit/8f04e8f))
* iframe can be null ([a9e3bab](https://github.com/streamich/react-use/commit/a9e3bab))

## [9.8.1](https://github.com/streamich/react-use/compare/v9.8.0...v9.8.1) (2019-06-30)


### Bug Fixes

* lint fixes via lint:fix ([7ce8e4f](https://github.com/streamich/react-use/commit/7ce8e4f))
* useMap uses prevMap state which is safer ([3554f79](https://github.com/streamich/react-use/commit/3554f79))
* **useMap:** remove now also uses prevMap state to not overwrite or lose state ([0a59869](https://github.com/streamich/react-use/commit/0a59869))

# [9.8.0](https://github.com/streamich/react-use/compare/v9.7.2...v9.8.0) (2019-06-30)


### Bug Fixes

* 🐛 fix test and add pre-push hook ([1353b6c](https://github.com/streamich/react-use/commit/1353b6c))


### Features

* add voice option in use speech ([6dc2dd5](https://github.com/streamich/react-use/commit/6dc2dd5))
* add voice option in useSpeech ([#422](https://github.com/streamich/react-use/issues/422)) ([c32d02b](https://github.com/streamich/react-use/commit/c32d02b))

## [9.7.2](https://github.com/streamich/react-use/compare/v9.7.1...v9.7.2) (2019-06-27)


### Bug Fixes

* save to localStorage only when state changes ([ba6d375](https://github.com/streamich/react-use/commit/ba6d375))
* use correct list variable in useList ([#412](https://github.com/streamich/react-use/issues/412)) ([b937296](https://github.com/streamich/react-use/commit/b937296))

## [9.7.1](https://github.com/streamich/react-use/compare/v9.7.0...v9.7.1) (2019-06-23)


### Bug Fixes

* 🐛 use synchronouse effect to subscribe to observables ([376eea3](https://github.com/streamich/react-use/commit/376eea3))

# [9.7.0](https://github.com/streamich/react-use/compare/v9.6.0...v9.7.0) (2019-06-19)


### Features

* improve useClickAway() hook ([#394](https://github.com/streamich/react-use/issues/394)) ([c60df19](https://github.com/streamich/react-use/commit/c60df19))

# [9.6.0](https://github.com/streamich/react-use/compare/v9.5.0...v9.6.0) (2019-06-18)


### Bug Fixes

* add additional ref check on clean up ([d18d2d8](https://github.com/streamich/react-use/commit/d18d2d8))
* always return something from effect ([3355426](https://github.com/streamich/react-use/commit/3355426))


### Features

* 🎸 add useScrolling hook ([bd9928e](https://github.com/streamich/react-use/commit/bd9928e))
* 🎸 add useScrolling hook to index ([b3ba702](https://github.com/streamich/react-use/commit/b3ba702))
* add useScrolling docs ([25a93f6](https://github.com/streamich/react-use/commit/25a93f6))
* add useScrolling story ([760edf1](https://github.com/streamich/react-use/commit/760edf1))

# [9.5.0](https://github.com/streamich/react-use/compare/v9.4.1...v9.5.0) (2019-06-16)


### Bug Fixes

* add missing `rate` property ([fb795a6](https://github.com/streamich/react-use/commit/fb795a6))


### Features

* add rate option in useSpeech ([f52f1f7](https://github.com/streamich/react-use/commit/f52f1f7))
* add rate option in useSpeech ([#399](https://github.com/streamich/react-use/issues/399)) ([0e4ebc6](https://github.com/streamich/react-use/commit/0e4ebc6))

## [9.4.1](https://github.com/streamich/react-use/compare/v9.4.0...v9.4.1) (2019-06-12)


### Bug Fixes

* fix Storybook docs Markdown import ([962a312](https://github.com/streamich/react-use/commit/962a312))

# [9.4.0](https://github.com/streamich/react-use/compare/v9.3.0...v9.4.0) (2019-06-04)


### Bug Fixes

* fix TypeScript error ([72e3036](https://github.com/streamich/react-use/commit/72e3036))
* **docs:** syntax error, improve examples ([8bbe9d8](https://github.com/streamich/react-use/commit/8bbe9d8))


### Features

* improve createReducer function ([6ba2d93](https://github.com/streamich/react-use/commit/6ba2d93)), closes [#164](https://github.com/streamich/react-use/issues/164)

# [9.3.0](https://github.com/streamich/react-use/compare/v9.2.0...v9.3.0) (2019-05-31)


### Features

* improve useAsync and useAsyncFn ([3ab1d5d](https://github.com/streamich/react-use/commit/3ab1d5d))

# [9.2.0](https://github.com/streamich/react-use/compare/v9.1.2...v9.2.0) (2019-05-31)


### Features

* 🎸 improve useObservable() type annotations ([d0c3713](https://github.com/streamich/react-use/commit/d0c3713))
* improve useSetState() typings ([fad4440](https://github.com/streamich/react-use/commit/fad4440))

## [9.1.2](https://github.com/streamich/react-use/compare/v9.1.1...v9.1.2) (2019-05-24)


### Bug Fixes

* **useAudio:** src change should reset isPlaying state ([65bffca](https://github.com/streamich/react-use/commit/65bffca))

## [9.1.1](https://github.com/streamich/react-use/compare/v9.1.0...v9.1.1) (2019-05-24)


### Bug Fixes

* **useMap:** more stringent type ([7bbbe47](https://github.com/streamich/react-use/commit/7bbbe47))

# [9.1.0](https://github.com/streamich/react-use/compare/v9.0.0...v9.1.0) (2019-05-24)


### Features

* pass arguments to useAsyncFn function ([6789d10](https://github.com/streamich/react-use/commit/6789d10))

# [9.0.0](https://github.com/streamich/react-use/compare/v8.4.0...v9.0.0) (2019-05-09)


### Features

* improve useToggle interface ([81b1cac](https://github.com/streamich/react-use/commit/81b1cac))


### BREAKING CHANGES

* useToggle interface changed

# [8.4.0](https://github.com/streamich/react-use/compare/v8.3.1...v8.4.0) (2019-05-07)


### Features

* add usePrevious hook ([4861a39](https://github.com/streamich/react-use/commit/4861a39))

## [8.3.1](https://github.com/streamich/react-use/compare/v8.3.0...v8.3.1) (2019-04-29)


### Bug Fixes

* **useRefMounted:** only run and cleanup once ([6a651be](https://github.com/streamich/react-use/commit/6a651be))

# [8.3.0](https://github.com/streamich/react-use/compare/v8.2.0...v8.3.0) (2019-04-29)


### Features

* add type define for createMemo ([6638c1a](https://github.com/streamich/react-use/commit/6638c1a))

# [8.2.0](https://github.com/streamich/react-use/compare/v8.1.4...v8.2.0) (2019-04-23)


### Bug Fixes

* make options useGeolocation optional ([01959a1](https://github.com/streamich/react-use/commit/01959a1))


### Features

* support options for useGeolocation ([7d4c59e](https://github.com/streamich/react-use/commit/7d4c59e))

## [8.1.4](https://github.com/streamich/react-use/compare/v8.1.3...v8.1.4) (2019-04-23)


### Bug Fixes

* 🐛 support click away on iOS, allow user to chose events ([f14e1d7](https://github.com/streamich/react-use/commit/f14e1d7))

## [8.1.3](https://github.com/streamich/react-use/compare/v8.1.2...v8.1.3) (2019-04-18)


### Bug Fixes

* 🐛 don't fire typing event on modifier keys pressed ([ce76edf](https://github.com/streamich/react-use/commit/ce76edf))

## [8.1.2](https://github.com/streamich/react-use/compare/v8.1.1...v8.1.2) (2019-04-12)


### Bug Fixes

* **useIdle:** include 'ms' prop in uesEffect dependencies ([7a670a2](https://github.com/streamich/react-use/commit/7a670a2))

## [8.1.1](https://github.com/streamich/react-use/compare/v8.1.0...v8.1.1) (2019-04-09)


### Bug Fixes

* 🐛 make useLocation work on server, improve hook ([6f6030a](https://github.com/streamich/react-use/commit/6f6030a))

# [8.1.0](https://github.com/streamich/react-use/compare/v8.0.0...v8.1.0) (2019-04-08)


### Features

* add useAsyncCallback hook ([c6ecb36](https://github.com/streamich/react-use/commit/c6ecb36))

# [8.0.0](https://github.com/streamich/react-use/compare/v7.6.0...v8.0.0) (2019-04-08)


### Features

* change useCopyToClipboard implementation ([c391038](https://github.com/streamich/react-use/commit/c391038))


### BREAKING CHANGES

* useCopyToClipboard interface changed

# [7.6.0](https://github.com/streamich/react-use/compare/v7.5.0...v7.6.0) (2019-04-07)


### Bug Fixes

* 🐛 handle case when activeElement is empty ([3d83705](https://github.com/streamich/react-use/commit/3d83705))


### Features

* 🎸 add useStartTypings hook ([5fda2e0](https://github.com/streamich/react-use/commit/5fda2e0))

# [7.5.0](https://github.com/streamich/react-use/compare/v7.4.0...v7.5.0) (2019-04-07)


### Features

* 🎸 add onCopy and onError events and use NPM copy library ([2553225](https://github.com/streamich/react-use/commit/2553225))
* 🎸 improve useCopyToClipboard() hook ([f185044](https://github.com/streamich/react-use/commit/f185044))
* 🎸 make useCopyToClipboard hook interface more idiomatic ([0a6d773](https://github.com/streamich/react-use/commit/0a6d773))
* add useCopyToClipboard() hook ([4d8e276](https://github.com/streamich/react-use/commit/4d8e276))

# [7.4.0](https://github.com/streamich/react-use/compare/v7.3.1...v7.4.0) (2019-04-07)


### Features

* add useDeepCompareEffect hook ([77e015b](https://github.com/streamich/react-use/commit/77e015b))

## [7.3.1](https://github.com/streamich/react-use/compare/v7.3.0...v7.3.1) (2019-03-31)


### Bug Fixes

* 🐛 call key{up/donw} callbacks in useKeyPressEvent correct ([60064a6](https://github.com/streamich/react-use/commit/60064a6))

# [7.3.0](https://github.com/streamich/react-use/compare/v7.2.0...v7.3.0) (2019-03-31)


### Features

* add useEffectOnce hook ([06c12d4](https://github.com/streamich/react-use/commit/06c12d4))

# [7.2.0](https://github.com/streamich/react-use/compare/v7.1.1...v7.2.0) (2019-03-31)


### Features

* default dependency array for useAsync and useAsyncRetry ([cb140a0](https://github.com/streamich/react-use/commit/cb140a0))

## [7.1.1](https://github.com/streamich/react-use/compare/v7.1.0...v7.1.1) (2019-03-30)


### Bug Fixes

* consistent refs in useFullscreen hook ([dc85499](https://github.com/streamich/react-use/commit/dc85499))

# [7.1.0](https://github.com/streamich/react-use/compare/v7.0.2...v7.1.0) (2019-03-29)


### Bug Fixes

* useClickAway TypeScript typings ([4b20083](https://github.com/streamich/react-use/commit/4b20083))


### Features

* pass click event in useClickAway to user ([01e38bc](https://github.com/streamich/react-use/commit/01e38bc))

## [7.0.2](https://github.com/streamich/react-use/compare/v7.0.1...v7.0.2) (2019-03-29)


### Bug Fixes

* 🐛 add rebound and keyboards deps back to peerDependencies ([4fc46aa](https://github.com/streamich/react-use/commit/4fc46aa))

## [7.0.1](https://github.com/streamich/react-use/compare/v7.0.0...v7.0.1) (2019-03-29)


### Bug Fixes

* add optional attributes in AsyncState ([b0c9770](https://github.com/streamich/react-use/commit/b0c9770))

# [7.0.0](https://github.com/streamich/react-use/compare/v6.2.2...v7.0.0) (2019-03-28)


### Bug Fixes

* 🐛 fix TypeScript build errors ([5c95f28](https://github.com/streamich/react-use/commit/5c95f28))
* 🐛 make sure all paths in usePageLeave return ([6655092](https://github.com/streamich/react-use/commit/6655092))
* 🐛 track "over" state better in useDrop hook ([acc355c](https://github.com/streamich/react-use/commit/acc355c))


### Features

* 🎸 add clear() to useList, use fn for state updates ([b20cf7c](https://github.com/streamich/react-use/commit/b20cf7c))
* 🎸 add createRenderProp function for creating render-props ([f4fd748](https://github.com/streamich/react-use/commit/f4fd748))
* 🎸 add useDrop hook ([6e415cf](https://github.com/streamich/react-use/commit/6e415cf))
* 🎸 add useDropArea hook ([676d0de](https://github.com/streamich/react-use/commit/676d0de))
* 🎸 add useEvent hook ([2a13cfb](https://github.com/streamich/react-use/commit/2a13cfb))
* 🎸 add useKey hook ([299fd86](https://github.com/streamich/react-use/commit/299fd86))
* 🎸 add useKeyboardJs hook ([3516aa6](https://github.com/streamich/react-use/commit/3516aa6))
* 🎸 add usePageLeave hook ([33ac91b](https://github.com/streamich/react-use/commit/33ac91b))
* 🎸 add useThrottleFn hook that throttles function ([0ccdf95](https://github.com/streamich/react-use/commit/0ccdf95))
* 🎸 improve useFullscreen hook ([7c38165](https://github.com/streamich/react-use/commit/7c38165))
* 🎸 keep keyboard events in useKeyPress hook ([00fecab](https://github.com/streamich/react-use/commit/00fecab))
* 🎸 refactor useKeyPressEvent hook ([c0658f6](https://github.com/streamich/react-use/commit/c0658f6))
* 🎸 return events from useKeyboardJs hook ([aa277b8](https://github.com/streamich/react-use/commit/aa277b8))
* 🎸 simplify and improve useThrottle hook ([452e8d9](https://github.com/streamich/react-use/commit/452e8d9))
* 🎸 useKeyPress hook now uses useKey, KeyboardJS removed ([727743b](https://github.com/streamich/react-use/commit/727743b))


### BREAKING CHANGES

* 🧨 useKeyPressEvent hook modified for dependency injection and providing
event objects to user
* 🧨 KeyboardJS now available anymore in useKeyPress hook, instead it will be
a separate useKeyPressKJ hook.
* 🧨 useThrottle is now a completely different hook

## [6.2.2](https://github.com/streamich/react-use/compare/v6.2.1...v6.2.2) (2019-03-28)


### Bug Fixes

* fix deps arg and union type in useAsync and useAsyncRetry ([929e726](https://github.com/streamich/react-use/commit/929e726))

## [6.2.1](https://github.com/streamich/react-use/compare/v6.2.0...v6.2.1) (2019-03-27)


### Bug Fixes

* set 'module' field properly ([35d4fc2](https://github.com/streamich/react-use/commit/35d4fc2))

# [6.2.0](https://github.com/streamich/react-use/compare/v6.1.0...v6.2.0) (2019-03-27)


### Bug Fixes

* add esm to 'files' in package.json ([fc1ba07](https://github.com/streamich/react-use/commit/fc1ba07))
* clean esm folder as well ([0a10a6e](https://github.com/streamich/react-use/commit/0a10a6e))


### Features

* emit code in ES Module mode ([464642e](https://github.com/streamich/react-use/commit/464642e))

# [6.1.0](https://github.com/streamich/react-use/compare/v6.0.0...v6.1.0) (2019-03-26)


### Features

* add useThrottle hook ([756bc99](https://github.com/streamich/react-use/commit/756bc99))

# [6.0.0](https://github.com/streamich/react-use/compare/v5.16.1...v6.0.0) (2019-03-26)


### Bug Fixes

* 🐛 bump nano-css ([f1f36dc](https://github.com/streamich/react-use/commit/f1f36dc)), closes [#90](https://github.com/streamich/react-use/issues/90)
* 🐛 don't throw only in development ([f5faba5](https://github.com/streamich/react-use/commit/f5faba5))


### chore

* 🤖 don't install only large dependencies ([6170067](https://github.com/streamich/react-use/commit/6170067))


### Features

* 🎸 add {bound} option to useMouse ([9bb02a1](https://github.com/streamich/react-use/commit/9bb02a1))
* 🎸 implement useClickAway, remove useOutsideClick ([a03143a](https://github.com/streamich/react-use/commit/a03143a))
* 🎸 keep global state of all useLockBodyScroll hooks ([5dd10e9](https://github.com/streamich/react-use/commit/5dd10e9))
* 🎸 move extra mouse functionality into useMouseHovered ([8b0580e](https://github.com/streamich/react-use/commit/8b0580e))
* more precise size for useMouse ([b887075](https://github.com/streamich/react-use/commit/b887075))


### BREAKING CHANGES

* 🧨 error is logged instead of thrown in development environment
* 🧨 useOutsideClick is now useClickAway
* 🧨 useCallbag hook is removed, some hooks KeyboardJS and Rebound installed
separately

## [5.16.1](https://github.com/streamich/react-use/compare/v5.16.0...v5.16.1) (2019-03-26)


### Bug Fixes

* types for useGeolocation ([b72c098](https://github.com/streamich/react-use/commit/b72c098))

# [5.16.0](https://github.com/streamich/react-use/compare/v5.15.0...v5.16.0) (2019-03-25)


### Features

* more precise size for useMouse ([1761031](https://github.com/streamich/react-use/commit/1761031))

# [5.15.0](https://github.com/streamich/react-use/compare/v5.14.0...v5.15.0) (2019-03-25)


### Features

* add useMouse hook ([17dfa8e](https://github.com/streamich/react-use/commit/17dfa8e))

# [5.14.0](https://github.com/streamich/react-use/compare/v5.13.0...v5.14.0) (2019-03-24)


### Features

* 🎸 keep global state of all useLockBodyScroll hooks ([9bb7047](https://github.com/streamich/react-use/commit/9bb7047))
* add useLockBodyScroll hook ([d990db4](https://github.com/streamich/react-use/commit/d990db4))

# [5.13.0](https://github.com/streamich/react-use/compare/v5.12.1...v5.13.0) (2019-03-23)


### Features

* add useScroll hook ([a92e9b2](https://github.com/streamich/react-use/commit/a92e9b2))

## [5.12.1](https://github.com/streamich/react-use/compare/v5.12.0...v5.12.1) (2019-03-23)


### Bug Fixes

* 🐛 cancel animation frame on un-mount in useWindowScroll() ([bc021ce](https://github.com/streamich/react-use/commit/bc021ce))

# [5.12.0](https://github.com/streamich/react-use/compare/v5.11.0...v5.12.0) (2019-03-23)


### Features

* add useWindowScroll hook ([076d0de](https://github.com/streamich/react-use/commit/076d0de))

# [5.11.0](https://github.com/streamich/react-use/compare/v5.10.0...v5.11.0) (2019-03-22)


### Features

* 🎸 refresh useCss hook ([0116cc9](https://github.com/streamich/react-use/commit/0116cc9))

# [5.10.0](https://github.com/streamich/react-use/compare/v5.9.0...v5.10.0) (2019-03-21)


### Features

* add useUpdateEffect hook ([c2afd23](https://github.com/streamich/react-use/commit/c2afd23))

# [5.9.0](https://github.com/streamich/react-use/compare/v5.8.1...v5.9.0) (2019-03-21)


### Features

* add useAsyncRetry hook ([576cf42](https://github.com/streamich/react-use/commit/576cf42))


### Performance Improvements

* remove asyn/await wrapper ([8e3de1c](https://github.com/streamich/react-use/commit/8e3de1c))

## [5.8.1](https://github.com/streamich/react-use/compare/v5.8.0...v5.8.1) (2019-03-20)


### Bug Fixes

* 🐛 use useLayoutEffect() in useCss() to inject CSS quick ([7328f26](https://github.com/streamich/react-use/commit/7328f26))

# [5.8.0](https://github.com/streamich/react-use/compare/v5.7.1...v5.8.0) (2019-03-19)


### Features

* release useKeyPressEvent() ([96798e2](https://github.com/streamich/react-use/commit/96798e2))

## [5.7.1](https://github.com/streamich/react-use/compare/v5.7.0...v5.7.1) (2019-03-15)


### Bug Fixes

* 🐛 allow every promise in usePromise() hook have own type ([d60fef7](https://github.com/streamich/react-use/commit/d60fef7))

# [5.7.0](https://github.com/streamich/react-use/compare/v5.6.0...v5.7.0) (2019-03-15)


### Bug Fixes

* 🐛 fix TypeScript typings for usePromise() ([ba0acb6](https://github.com/streamich/react-use/commit/ba0acb6))


### Features

* 🎸 add usePromise() hook ([aad368b](https://github.com/streamich/react-use/commit/aad368b))

# [5.6.0](https://github.com/streamich/react-use/compare/v5.5.6...v5.6.0) (2019-03-13)


### Features

* transpile down to ES5 ([61382e3](https://github.com/streamich/react-use/commit/61382e3))

## [5.5.6](https://github.com/streamich/react-use/compare/v5.5.5...v5.5.6) (2019-03-11)


### Bug Fixes

* correct createMemo.md ([4e2d639](https://github.com/streamich/react-use/commit/4e2d639))
* correct createMemo.story ([9c8e093](https://github.com/streamich/react-use/commit/9c8e093))

## [5.5.5](https://github.com/streamich/react-use/compare/v5.5.4...v5.5.5) (2019-03-04)


### Bug Fixes

* 🐛 make useWindowSize work on server ([8f93853](https://github.com/streamich/react-use/commit/8f93853))

## [5.5.4](https://github.com/streamich/react-use/compare/v5.5.3...v5.5.4) (2019-02-25)


### Bug Fixes

* 🐛 new React behaviour needs useState to set something ([e926faf](https://github.com/streamich/react-use/commit/e926faf)), closes [#128](https://github.com/streamich/react-use/issues/128)

## [5.5.3](https://github.com/streamich/react-use/compare/v5.5.2...v5.5.3) (2019-02-25)


### Bug Fixes

* **deps:** update dependency use-callbag to ^0.2.0 ([4d49d0b](https://github.com/streamich/react-use/commit/4d49d0b))

## [5.5.2](https://github.com/streamich/react-use/compare/v5.5.1...v5.5.2) (2019-02-24)


### Bug Fixes

* **deps:** update dependency use-onclickoutside to ^0.3.0 ([0baae6d](https://github.com/streamich/react-use/commit/0baae6d))

## [5.5.1](https://github.com/streamich/react-use/compare/v5.5.0...v5.5.1) (2019-02-24)


### Bug Fixes

* **deps:** update dependency ts-easing to ^0.2.0 ([3321e11](https://github.com/streamich/react-use/commit/3321e11))

# [5.5.0](https://github.com/streamich/react-use/compare/v5.4.1...v5.5.0) (2019-02-23)


### Bug Fixes

* add type definition for useList() remove() method ([ea2dc43](https://github.com/streamich/react-use/commit/ea2dc43))
* useSetState bug ([83611a1](https://github.com/streamich/react-use/commit/83611a1))


### Features

* Add remove method for useList ([5a295d9](https://github.com/streamich/react-use/commit/5a295d9))

## [5.4.1](https://github.com/streamich/react-use/compare/v5.4.0...v5.4.1) (2019-02-19)


### Bug Fixes

* 🐛 better async loading for keyboardjs ([2096bae](https://github.com/streamich/react-use/commit/2096bae)), closes [#103](https://github.com/streamich/react-use/issues/103)

# [5.4.0](https://github.com/streamich/react-use/compare/v5.3.1...v5.4.0) (2019-02-19)


### Features

* add error and loading fields to useGeolocation ([6909a69](https://github.com/streamich/react-use/commit/6909a69))

## [5.3.1](https://github.com/streamich/react-use/compare/v5.3.0...v5.3.1) (2019-02-17)


### Bug Fixes

* 🐛 fix typings in useOrientation sensor ([afbacac](https://github.com/streamich/react-use/commit/afbacac))
* 🐛 fix useSetState after React update ([524abe5](https://github.com/streamich/react-use/commit/524abe5)), closes [#107](https://github.com/streamich/react-use/issues/107) [#107](https://github.com/streamich/react-use/issues/107)
* useOrientation breaks in some devices ([d89bd54](https://github.com/streamich/react-use/commit/d89bd54))

# [5.3.0](https://github.com/streamich/react-use/compare/v5.2.3...v5.3.0) (2019-02-07)


### Features

* Add updateAt method for useList ([ad05609](https://github.com/streamich/react-use/commit/ad05609))

## [5.2.3](https://github.com/streamich/react-use/compare/v5.2.2...v5.2.3) (2019-02-07)


### Bug Fixes

* 🐛 fix build and update React deps ([27e26a0](https://github.com/streamich/react-use/commit/27e26a0))

## [5.2.2](https://github.com/streamich/react-use/compare/v5.2.1...v5.2.2) (2019-02-02)


### Bug Fixes

* release useDebounce and useToggle fixes ([12ad880](https://github.com/streamich/react-use/commit/12ad880))

## [5.2.1](https://github.com/streamich/react-use/compare/v5.2.0...v5.2.1) (2019-01-04)


### Bug Fixes

* use function to correctly update state in useToggle ([d854d27](https://github.com/streamich/react-use/commit/d854d27))

# [5.2.0](https://github.com/streamich/react-use/compare/v5.1.2...v5.2.0) (2019-01-02)


### Features

* 🎸 add useKeyPress hook ([01df885](https://github.com/streamich/react-use/commit/01df885))
* **useKeyPress:** allow complex bindings via key combos ([e53a20f](https://github.com/streamich/react-use/commit/e53a20f))

## [5.1.2](https://github.com/streamich/react-use/compare/v5.1.1...v5.1.2) (2018-12-29)


### Bug Fixes

* reset state when calling useEffect in useAsync ([2f5af2c](https://github.com/streamich/react-use/commit/2f5af2c))

## [5.1.1](https://github.com/streamich/react-use/compare/v5.1.0...v5.1.1) (2018-12-20)


### Bug Fixes

* lock react and react-dom to a fixed version ([#83](https://github.com/streamich/react-use/issues/83)) ([455812d](https://github.com/streamich/react-use/commit/455812d))

# [5.1.0](https://github.com/streamich/react-use/compare/v5.0.0...v5.1.0) (2018-12-19)


### Bug Fixes

* 🐛 just use any for setTimeout because of diff environments ([55673cb](https://github.com/streamich/react-use/commit/55673cb))
* 🐛 memoized does not receive arguments ([244a533](https://github.com/streamich/react-use/commit/244a533))
* 🐛 use Timeout type for build to work ([8c66abe](https://github.com/streamich/react-use/commit/8c66abe))


### Features

* added useDebounce ([91ff6ba](https://github.com/streamich/react-use/commit/91ff6ba))
* pass arguments to memoized callback ([#81](https://github.com/streamich/react-use/issues/81)) ([88dd513](https://github.com/streamich/react-use/commit/88dd513))

# [5.0.0](https://github.com/streamich/react-use/compare/v4.11.1...v5.0.0) (2018-12-17)


### Features

* 🎸 list all useAsync state props so that TS dont complain ([7c1b107](https://github.com/streamich/react-use/commit/7c1b107))
* 🎸 remove experimental hooks ([533e26f](https://github.com/streamich/react-use/commit/533e26f))
* use discriminated union in useAsync ([966af4a](https://github.com/streamich/react-use/commit/966af4a))


### BREAKING CHANGES

* useRenderProp and useAsync are removed

## [4.11.1](https://github.com/streamich/react-use/compare/v4.11.0...v4.11.1) (2018-12-16)


### Bug Fixes

* synchronously re-render bug of useRaf hook ([#77](https://github.com/streamich/react-use/issues/77)) ([5d74348](https://github.com/streamich/react-use/commit/5d74348))

# [4.11.0](https://github.com/streamich/react-use/compare/v4.10.0...v4.11.0) (2018-12-05)


### Features

* 🎸 add useRefMounted hook ([dfb0510](https://github.com/streamich/react-use/commit/dfb0510))

# [4.10.0](https://github.com/streamich/react-use/compare/v4.9.0...v4.10.0) (2018-11-10)


### Features

* bump useWait ([124ef99](https://github.com/streamich/react-use/commit/124ef99))

# [4.9.0](https://github.com/streamich/react-use/compare/v4.8.0...v4.9.0) (2018-11-06)


### Features

* add useSessionStorage hook ([eca432a](https://github.com/streamich/react-use/commit/eca432a))
* add useWait hook ([61c6058](https://github.com/streamich/react-use/commit/61c6058))

# [4.8.0](https://github.com/streamich/react-use/compare/v4.7.0...v4.8.0) (2018-11-02)


### Features

* allow useSetState setter to accept function ([bfd114a](https://github.com/streamich/react-use/commit/bfd114a))

# [4.7.0](https://github.com/streamich/react-use/compare/v4.6.0...v4.7.0) (2018-10-30)


### Features

* 🎸 add useHoverDirty hook ([c2aee59](https://github.com/streamich/react-use/commit/c2aee59))

# [4.6.0](https://github.com/streamich/react-use/compare/v4.5.0...v4.6.0) (2018-10-30)


### Features

* 🎸 implement useLocalStorage without events ([d211722](https://github.com/streamich/react-use/commit/d211722))

# [4.5.0](https://github.com/streamich/react-use/compare/v4.4.0...v4.5.0) (2018-10-29)


### Features

* 🎸 add useAdopt hook ([91bee9a](https://github.com/streamich/react-use/commit/91bee9a))
* 🎸 add useRenderProp hook ([2d85c61](https://github.com/streamich/react-use/commit/2d85c61))

# [4.4.0](https://github.com/streamich/react-use/compare/v4.3.0...v4.4.0) (2018-10-29)


### Features

* 🎸 add useCallbag hook ([ead142c](https://github.com/streamich/react-use/commit/ead142c))

# [4.3.0](https://github.com/streamich/react-use/compare/v4.2.0...v4.3.0) (2018-10-29)


### Features

* 🎸 add useOutsideClick hook ([90d2c22](https://github.com/streamich/react-use/commit/90d2c22))

# [4.2.0](https://github.com/streamich/react-use/compare/v4.1.0...v4.2.0) (2018-10-29)


### Features

* 🎸 add useVideo hook ([ff05419](https://github.com/streamich/react-use/commit/ff05419))
* 🎸 allow to pass React <video> el in useVideo and useAudio ([8670c74](https://github.com/streamich/react-use/commit/8670c74))

# [4.1.0](https://github.com/streamich/react-use/compare/v4.0.0...v4.1.0) (2018-10-29)


### Features

* 🎸 add createMemo hook factory ([8730eaa](https://github.com/streamich/react-use/commit/8730eaa))

# [4.0.0](https://github.com/streamich/react-use/compare/v3.1.0...v4.0.0) (2018-10-29)


### Features

* 🎸 add useNumber alias ([a58a4a7](https://github.com/streamich/react-use/commit/a58a4a7))
* 🎸 improve useCounter interface ([395e82b](https://github.com/streamich/react-use/commit/395e82b))


### BREAKING CHANGES

* useCounter interface changed

# [3.1.0](https://github.com/streamich/react-use/compare/v3.0.0...v3.1.0) (2018-10-29)


### Features

* 🎸 add useGetSetState ([dcd1013](https://github.com/streamich/react-use/commit/dcd1013))


### Performance Improvements

* ⚡️ wrape useGetSetState callbacks in useCallback ([3c1e57d](https://github.com/streamich/react-use/commit/3c1e57d))

# [3.0.0](https://github.com/streamich/react-use/compare/v2.3.0...v3.0.0) (2018-10-29)


### Features

* 🎸 accept any value type in useToggle and cast it to bool ([869f767](https://github.com/streamich/react-use/commit/869f767))


### BREAKING CHANGES

* now useToggle and useBoolean accept any value type and cast it to
boolean.

# [2.3.0](https://github.com/streamich/react-use/compare/v2.2.0...v2.3.0) (2018-10-29)


### Features

* 🎸 add useBoolean hook ([ce6de24](https://github.com/streamich/react-use/commit/ce6de24))

# [2.2.0](https://github.com/streamich/react-use/compare/v2.1.0...v2.2.0) (2018-10-29)


### Features

* 🎸 add useGetSet hook ([bfc30b9](https://github.com/streamich/react-use/commit/bfc30b9))
* 🎸 add useUpdate hook ([c00f308](https://github.com/streamich/react-use/commit/c00f308))

# [2.1.0](https://github.com/streamich/react-use.git/compare/v2.0.0...v2.1.0) (2018-10-28)


### Features

* 🎸 add useObservable ([711e831](https://github.com/streamich/react-use.git/commit/711e831))

# [2.0.0](https://github.com/streamich/react-use.git/compare/v1.0.0...v2.0.0) (2018-10-28)


### Features

* 🎸 change API for useToggle hook ([#16](https://github.com/streamich/react-use.git/issues/16)) ([5a6da18](https://github.com/streamich/react-use.git/commit/5a6da18))


### BREAKING CHANGES

* useToggle interface changed

# 1.0.0 (2018-10-28)


### chore

* 🤖 release v1 ([4236cf0](https://github.com/streamich/react-use.git/commit/4236cf0))


### Continuous Integration

* 🎡 store CircleCI artifacts, add git-cz ([690dd5e](https://github.com/streamich/react-use.git/commit/690dd5e))


### Features

* 🎸 add useAsync hook ([258d696](https://github.com/streamich/react-use.git/commit/258d696))
* 🎸 add useAudio hook ([4336aa1](https://github.com/streamich/react-use.git/commit/4336aa1))
* 🎸 add useBattery hook ([73ce535](https://github.com/streamich/react-use.git/commit/73ce535))
* 🎸 add useCounter hook ([79e5b8c](https://github.com/streamich/react-use.git/commit/79e5b8c))
* 🎸 add useCss hook ([2c0a7e4](https://github.com/streamich/react-use.git/commit/2c0a7e4))
* 🎸 add useFavicon hook ([ab1739a](https://github.com/streamich/react-use.git/commit/ab1739a))
* 🎸 add useGeolocation hook ([13a7326](https://github.com/streamich/react-use.git/commit/13a7326))
* 🎸 add useHover hook ([406af20](https://github.com/streamich/react-use.git/commit/406af20))
* 🎸 add useIdle hook ([74d3ece](https://github.com/streamich/react-use.git/commit/74d3ece))
* 🎸 add useLifecycles hook ([f99c89f](https://github.com/streamich/react-use.git/commit/f99c89f))
* 🎸 add useList hook ([4bea508](https://github.com/streamich/react-use.git/commit/4bea508))
* 🎸 add useLocation hook ([46a8e2c](https://github.com/streamich/react-use.git/commit/46a8e2c))
* 🎸 add useLogger hook ([7c38b75](https://github.com/streamich/react-use.git/commit/7c38b75))
* 🎸 add useMap hook ([6509c25](https://github.com/streamich/react-use.git/commit/6509c25))
* 🎸 add useMedia hook ([e1cc9ab](https://github.com/streamich/react-use.git/commit/e1cc9ab))
* 🎸 add useMediaDevices hook ([4ea0277](https://github.com/streamich/react-use.git/commit/4ea0277))
* 🎸 add useMotion hook ([91eb4ea](https://github.com/streamich/react-use.git/commit/91eb4ea))
* 🎸 add useMount and useUnmount hooks ([63a1444](https://github.com/streamich/react-use.git/commit/63a1444))
* 🎸 add useNetwork hook ([5881fa6](https://github.com/streamich/react-use.git/commit/5881fa6))
* 🎸 add useOrientation hook ([c533b97](https://github.com/streamich/react-use.git/commit/c533b97))
* 🎸 add useRaf hook ([26b2593](https://github.com/streamich/react-use.git/commit/26b2593))
* 🎸 add useSetState hook ([972541d](https://github.com/streamich/react-use.git/commit/972541d))
* 🎸 add useSize hook ([620b171](https://github.com/streamich/react-use.git/commit/620b171))
* 🎸 add useSpeech hook ([3b971a2](https://github.com/streamich/react-use.git/commit/3b971a2))
* 🎸 add useSprgin hook ([b4fe5b0](https://github.com/streamich/react-use.git/commit/b4fe5b0))
* 🎸 add useTimeout hook ([86f094e](https://github.com/streamich/react-use.git/commit/86f094e))
* 🎸 add useTitle hook ([1bff6d8](https://github.com/streamich/react-use.git/commit/1bff6d8))
* 🎸 add useToggle() hook ([a36dceb](https://github.com/streamich/react-use.git/commit/a36dceb))
* 🎸 add useTween hook ([877343e](https://github.com/streamich/react-use.git/commit/877343e))
* 🎸 add useWindowSize() hook ([2c46899](https://github.com/streamich/react-use.git/commit/2c46899))
* 🎸 do work on useLocaStorage ([2541716](https://github.com/streamich/react-use.git/commit/2541716))
* 🎸 improve useSize, pass through state to the element ([5b1356a](https://github.com/streamich/react-use.git/commit/5b1356a))


### BREAKING CHANGES

* make semantic-release bump version
* Released v1.0.0
