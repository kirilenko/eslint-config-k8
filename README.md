# eslint-config-k8

### Usage

- Require eslint v.8 and prettier v.3.

- Install the package:

```bash
npm install eslint-config-k8 --save-dev
```

- Add the following to your `.eslintrc.cjs` file:

```js
/** @type { import("eslint").Linter.Config } */
module.exports = {
  extends: ['k8'],
}
```
