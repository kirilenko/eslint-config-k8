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
