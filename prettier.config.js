/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    'prettier-plugin-css-order',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-astro',
  ],
  semi: false,
  singleQuote: true,
  tailwindAttributes: ['className'],
  tailwindFunctions: ['clsx', 'cn'],
}
