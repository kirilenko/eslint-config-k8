# eslint-config-k8

### Usage

- Required dependencies: look at the `peerDependencies` section in `package.json`.

- Install the package:

```bash
npm install eslint-config-k8 --save-dev
```

- Add the following to your `eslint.config.cjs` file:

```js
import { defineConfig } from 'eslint/config'
import eslintConfigK8 from 'eslint-config-k8'

export default defineConfig([{ extends: [eslintConfigK8] }])
```

- If you want to use the `prettier` plugin, add the following to your `.eslintrc.cjs` file:

```js
/** @type {import("prettier").Config} */
module.exports = {
  ...require('eslint-config-k8/prettier.config.cjs'),
}
```

- If you want to use the `prettier` w/ `tailwind` (for example), you can do it like this:

```js
const { plugins, ...rest } = require('eslint-config-k8/prettier.config.cjs')

/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    ...plugins,
    'prettier-plugin-css-order',
    'prettier-plugin-tailwindcss',
  ],
  ...rest,
  tailwindAttributes: ['className'],
  tailwindFunctions: ['clsx', 'cn'],
  tailwindStylesheet: './src/index.css',
}
```
