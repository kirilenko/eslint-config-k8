# eslint-config-k8

## Installation

### For __npm__ 7 and above:

`npm i -D eslint-config-k8`

or if you prefer yarn

`yarn add -D eslint-config-k8`

or if you prefer pnpm

`pnpm add -D eslint-config-k8`

### For __npm__ 6 and below:

`npx install-peerdeps -D eslint-config-k8`


## Usage ESLint

Ensure you have installed `typescript` as dev dependency
and exists a `tsconfig.json` file in your project.

Then add the following to your `.eslintrc` file:

```json
{
  "extends": ["k8"]
}
```
