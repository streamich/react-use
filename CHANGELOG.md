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
