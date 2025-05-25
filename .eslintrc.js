const extendsDict = {
  base: ['eslint:recommended'],
  prettier: ['plugin:prettier/recommended'],
  react: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  typescript: ['plugin:@typescript-eslint/recommended'],
}

const pluginsDict = {
  react: [
    'react',
    'react-hooks',
    'hooks',
    'react-refresh',
    'import',
    'jsx-a11y',
  ],
  sort: ['sort-keys-fix', 'simple-import-sort'],
  tanstack: ['@tanstack/query'],
  typescript: ['@typescript-eslint'],
  prettier: ['prettier'],
}

const rules = {
  '@typescript-eslint/no-shadow': 'off', // - for typescript getters/setters

  '@typescript-eslint/no-unused-expressions': 'off', // - for <condition> && <expression>

  'arrow-body-style': 'off',

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

  // 'import/extensions': [
  //   'error',
  //   {
  //     js: 'never',
  //     jsx: 'never',
  //     ts: 'never',
  //     tsx: 'never',
  //     css: 'always',
  //   },
  // ],

  'import/extensions': 'off',

  'import/prefer-default-export': 'off',

  'jsx-a11y/click-events-have-key-events': 'off', // - for click events on divs etc.
  'jsx-a11y/no-static-element-interactions': 'off', // - for click events on divs etc.

  'newline-before-return': 'warn',

  'no-console': 'warn',

  'no-restricted-syntax': [
    'error',
    {
      selector: 'ExportDefaultDeclaration',
      message: 'Prefer named exports',
    },
  ], // - for disallowing default exports

  'no-underscore-dangle': 'off', // - for typescript getters/setters

  'prettier/prettier': ['warn', {}, { usePrettierrc: true }],

  'react/button-has-type': 'off', // - for disabling button type

  'react/destructuring-assignment': 'off', // - for destructuring props like: const { smt = props.type === 'number' ? 0 : '' } = props

  'react/display-name': 'off', // - for disabling display name

  'react/function-component-definition': 'off',

  'react-hooks/exhaustive-deps': 'warn',

  'react-hooks/rules-of-hooks': 'error',

  'react/jsx-filename-extension': 'off',

  'react/jsx-props-no-spreading': 'off',

  'react/jsx-sort-props': 'warn',

  'react/jsx-uses-react': 'off', // - for removing React imports
  'react/react-in-jsx-scope': 'off', // - for removing React imports

  'react/require-default-props': 'off', // - for typescript optional props

  'simple-import-sort/imports': (() => {
    const internalPackages = '@/' // you can add more packages here like '@/|@/components/|@/utils/'
    const styleExtensions = '\\.style$|\\.s?css$'

    return [
      'warn',
      {
        groups: [
          // External `react` packages come first.
          ['^react', `^(?!${internalPackages}|\\./|\\.\\./|\\u0000)`],

          // Imports w/o from.
          ['^\\u0000'],

          // Internal packages.
          [
            `^(${internalPackages})(?!${styleExtensions})`,

            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',

            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],

          // Style imports.
          [`^.+${styleExtensions}`],
        ],
      },
    ]
  })(),

  'sort-keys-fix/sort-keys-fix': 'warn',
}

/** @type { import("eslint").Linter.Config } */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    // es2022: true,
  },
  extends: [
    ...extendsDict.react,
    ...extendsDict.base,
    ...extendsDict.typescript,
    ...extendsDict.prettier, // prettier at last
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    ...pluginsDict.react,
    ...pluginsDict.typescript,
    ...pluginsDict.tanstack,
    ...pluginsDict.sort,
    ...pluginsDict.prettier,
  ],
  root: true,
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
}
