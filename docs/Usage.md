# Usage

You need to have React [`16.8.0`](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later installed to use the Hooks API. You can import each hook individually

```js
import useToggle from 'react-use/lib/useToggle'
```

or use ES6 named imports (tree shaking recommended)

```js
import {useToggle} from 'react-use'
```

Depending on your bundler you might run into a missing dependency error with ES6 named import statements. Some hooks require you to install peer dependencies so we recommend using individual imports. If you want the best of both worlds you can transform the named import statements to individual import statements with [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import) by adding the following config to your `.babelrc` file:

```json
[
  "import", {
    "libraryName": "react-use",
    "libraryDirectory": "lib",
    "camel2DashComponentName": false
  }
]
```
