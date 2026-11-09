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
| `typescript` | `>=4.8.4` |
| `typescript-eslint` | `^8.56.0` |
| `globals` | `^17.0.0` |
| `@eslint-react/eslint-plugin` | `^5.28.8` |
| `eslint-plugin-react-hooks` | `^7.1.0` |
| `eslint-plugin-react-refresh` | `^0.4.22 \|\| ^0.5.0` |
| `eslint-plugin-import-x` | `^4.18.1` |
| `eslint-plugin-jsx-a11y-x` | `^0.2.0` |
| `eslint-import-resolver-typescript` | `^4.4.4` |
| `eslint-plugin-simple-import-sort` | `^13.0.0 \|\| ^14.0.0` |
| `eslint-plugin-perfectionist` | `^5.0.0` |
| `eslint-plugin-hooks` | `^0.4.3` |

### Installation

Requires a `tsconfig.json` in the project: TypeScript rules are type-aware.

```bash
pnpm add -D eslint-config-k8 \
  eslint \
  @eslint/js \
  typescript \
  typescript-eslint \
  globals \
  @eslint-react/eslint-plugin \
  eslint-plugin-react-hooks \
  eslint-plugin-react-refresh \
  eslint-plugin-import-x \
  eslint-plugin-jsx-a11y-x \
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

- **TypeScript** — type-checked rules via `typescript-eslint` (`no-unsafe-*`, `no-floating-promises`, `prefer-nullish-coalescing`, `consistent-type-imports`, etc.)
- **React** — `@eslint-react` recommended type-checked rules + react-refresh + `react-hooks` recommended (including React Compiler rules)
- **Accessibility** — recommended rules via `eslint-plugin-jsx-a11y-x` (prefixed `jsx-a11y-x/`)
- **Imports** — sorted and grouped via `eslint-plugin-simple-import-sort` and `eslint-plugin-import-x`
- **Hooks ordering** — enforced call order via `eslint-plugin-hooks`
- **Object sorting** — alphabetical key order via `eslint-plugin-perfectionist`
- **Path restrictions** — `src/lib` is prevented from importing `src/modules`
