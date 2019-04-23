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
