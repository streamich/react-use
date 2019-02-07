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
