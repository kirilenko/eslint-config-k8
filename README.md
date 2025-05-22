# eslint-config-k8

### Usage

- Require eslint v.8 and prettier v.3.

- Install the package:

```bash
npm install eslint-config-k8 --save-dev
```

- Add the following to your `.eslintrc.cjs` file:

```js
const { extends: eslintConfig } = require('eslint-config-k8')

/** @type { import("eslint").Linter.Config } */
module.exports = {
  extends: [
    eslintConfig,
    // your own configs
  ],
  rules: {
    // your own rules
  },
}
```

- Add the following to your `.prettierrc.cjs` file:

```js
const {
  plugins,
  ...restConfig
} = require('eslint-config-k8/prettier.config.js')

/** @type { import("prettier").Config } */
module.exports = {
  ...restConfig,
  plugins: [...plugins /* your own plugins */],
  tailwindStylesheet: './src/path/to/tailwind.css',
}
```
