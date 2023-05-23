const internalPackages = '@mf-types|@app|@entities|@pages|@shared|@widgets'

const styleExtensions = '\\.style$|\\.s?css$'

const extendsDict = {
  airbnb: ['airbnb', 'airbnb/hooks', 'airbnb-typescript'],
  base: [],
  prettier: ['prettier', 'plugin:prettier/recommended'],
  react: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
}

const rules = {
  // For <condition> && <expression>:
  '@typescript-eslint/no-unused-expressions': 'off',

  // For returning in if-else:
  'consistent-return': 'off',

  // For defining function as a function-expression w/ type like 'const fn: DoIt = function () {}':
  'func-names': 'off',

  'hooks/sort': [
    2,
    {
      groups: [
        'useReducer',
        'useContext',
        'useState',
        'useRef',
        'useDispatch',
        'useCallback',
        'useEffect',
      ],
    },
  ],

  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],

  'import/no-extraneous-dependencies': 'off',

  // For local import only from fsd-index (features sliced design):
  'import/no-internal-modules': [
    'error',
    {
      forbid: [
        'src/**/*',
        '../*',
        '../**/*',

        '@app/!(config|index.css|providers)',
        '@app/**/*',

        '@entities/**/*', // use @entities/something only

        '@pages/**/*', // use @pages/something only

        '@shared/!(api|config|lib|model|ui)/**/*',

        '@widgets/**/*', // use @widgets/something only
      ],
    },
  ],

  // For import from remote packages (only for types):
  'import/no-relative-packages': 'off',

  // For reexport from index:
  'import/prefer-default-export': 'off',

  // For using anchor w/ button together:
  'jsx-a11y/anchor-is-valid': 'off',

  // For typescript fn-overloading:
  'no-redeclare': 'off',

  // For export { default } from somewhere:
  'no-restricted-exports': 'off',

  // For typescript getters/setters:
  'no-underscore-dangle': 'off',

  'no-unused-vars': 'warn',

  'prettier/prettier': [
    'error',
    {},
    { endOfLine: 'auto', usePrettierrc: true },
  ],

  // For simple defining HOC as 'const withSomething = (Component) => (props) => <Component {...props} />':
  'react/display-name': 'off',

  // For defining component as a function-declaration:
  'react/function-component-definition': 'off',

  'react/jsx-filename-extension': [
    'warn',
    {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  ],

  // For props spreading in jsx:
  'react/jsx-props-no-spreading': 'off',

  // For removing React imports:
  'react/jsx-uses-react': 'off',

  'react/prop-types': 'off',

  // For removing React imports:
  'react/react-in-jsx-scope': 'off',

  // Disable SomeComponent.defaultProps defining:
  'react/require-default-props': 'off',
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // External `react` packages come first:
        ['^react', `^(?!${internalPackages}|\\./|\\.\\./|\\u0000)`],

        // Imports w/o from:
        ['^\\u0000'],

        // Internal packages:
        [
          `^(${internalPackages})(?!${styleExtensions})`,

          // Parent imports. Put `..` last:
          '^\\.\\.(?!/?$)',
          '^\\.\\./?$',

          // Other relative imports. Put same-folder imports and `.` last:
          '^\\./(?=.*/)(?!/?$)',
          '^\\.(?!/?$)',
          '^\\./?$',
        ],

        // Style imports:
        [`^.+${styleExtensions}`],
      ],
    },
  ],

  'sort-keys-fix/sort-keys-fix': 'warn',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    ...extendsDict.airbnb,
    ...extendsDict.react,
    ...extendsDict.base,

    // prettier at last:
    ...extendsDict.prettier,
  ],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        ...rules,

        // for require(...):
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'hooks',
    'import',
    'jsx-a11y',
    'sort-keys-fix',
    'simple-import-sort',
    'prettier',
  ],
  rules,
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: { version: 'detect' },
  },
};
