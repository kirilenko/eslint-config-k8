# eslint-config-k8

[![npm version](https://img.shields.io/npm/v/eslint-config-k8)](https://www.npmjs.com/package/eslint-config-k8)
[![license](https://img.shields.io/npm/l/eslint-config-k8)](https://github.com/kirilenko/eslint-config-k8/blob/main/LICENSE)

Opinionated ESLint flat config for TypeScript React apps. Includes rules for imports, hooks ordering, object sorting, and strict TypeScript checks.

---

### Peer dependencies

| Package | Version |
| --- | --- |
| `eslint` | `>=9.36.0` |
| `@eslint/js` | `>=9.36.0` |
| `typescript-eslint` | `^8.45.0` |
| `globals` | `^17.0.0` |
| `eslint-plugin-react` | `^7.37.5` |
| `eslint-plugin-react-hooks` | `^7.0.1` |
| `eslint-plugin-react-refresh` | `^0.4.22` |
| `eslint-plugin-import` | `^2.32.0` |
| `eslint-import-resolver-typescript` | `^4.4.4` |
| `eslint-plugin-simple-import-sort` | `^13.0.0` |
| `eslint-plugin-perfectionist` | `^5.0.0` |
| `eslint-plugin-hooks` | `^0.4.3` |

### Installation

```bash
pnpm add -D eslint-config-k8 \
  eslint \
  @eslint/js \
  typescript-eslint \
  globals \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-react-refresh \
  eslint-plugin-import \
  eslint-import-resolver-typescript \
  eslint-plugin-simple-import-sort \
  eslint-plugin-perfectionist \
  eslint-plugin-hooks
```

### Usage

Create an `eslint.config.js` (or `eslint.config.mjs`) at the root of your project:

```js
import { defineConfig } from 'eslint/config'
import eslintConfigK8 from 'eslint-config-k8'

export default defineConfig([{ extends: [eslintConfigK8] }])
```

To extend or override rules:

```js
import { defineConfig } from 'eslint/config'
import eslintConfigK8 from 'eslint-config-k8'

export default defineConfig([
  { extends: [eslintConfigK8] },
  {
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
])
```

### What's included

- **TypeScript** — strict rules via `typescript-eslint` (`no-unsafe-*`, `no-floating-promises`, `prefer-nullish-coalescing`, etc.)
- **React** — recommended rules + JSX runtime + react-refresh
- **Imports** — sorted and grouped via `eslint-plugin-simple-import-sort` and `eslint-plugin-import`
- **Hooks ordering** — enforced call order via `eslint-plugin-hooks`
- **Object sorting** — alphabetical key order via `eslint-plugin-perfectionist`
- **Path restrictions** — `src/lib` is prevented from importing `src/modules`
