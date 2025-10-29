import eslintJs from '@eslint/js'
import pluginHooks from 'eslint-plugin-hooks'
import pluginImport from 'eslint-plugin-import'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginReactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginSortKeysFix from 'eslint-plugin-sort-keys-fix'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default tsEslint.config([
  {
    ignores: ['**/dist'],
  },
  {
    extends: [
      eslintJs.configs.recommended,
      tsEslint.configs.recommended,
      pluginReactHooks.configs['recommended-latest'],
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginReactYouMightNotNeedAnEffect.configs.recommended,
      pluginReactRefresh.configs.vite,
      pluginPrettierRecommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: pluginImport /* , 'react-refresh': pluginReactRefresh */,
    },
    rules: {
      ...pluginImport.configs.recommended.rules,
      ...pluginImport.configs.typescript.rules,
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: true },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],

      '@typescript-eslint/no-unsafe-argument': 'error',

      '@typescript-eslint/no-unsafe-assignment': 'error',

      '@typescript-eslint/no-unsafe-call': 'error',

      '@typescript-eslint/no-unsafe-enum-comparison': 'error',

      '@typescript-eslint/no-unsafe-member-access': 'error',

      '@typescript-eslint/no-unsafe-return': 'error',

      '@typescript-eslint/only-throw-error': 'error',

      '@typescript-eslint/prefer-nullish-coalescing': 'error',

      '@typescript-eslint/prefer-promise-reject-errors': 'error',

      '@typescript-eslint/unbound-method': 'off',

      'import/newline-after-import': 'error',

      'import/no-amd': 'error',

      'import/no-commonjs': 'error',

      'import/no-dynamic-require': 'error',

      'import/no-extraneous-dependencies': 'error',

      'import/no-unresolved': ['off', { zones: [{ from: '/' }] }],

      'import/no-useless-path-segments': 'error',

      'no-console': ['error', { allow: ['error'] }],

      'no-unused-vars': 'off',

      'no-void': ['error', { allowAsStatement: true }],

      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      /*
      Using pluginSimpleImportSort (below) instead of that:
      'import/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
        },
      ],
      */
      'react-refresh/only-export-components': 'error',
      'react/display-name': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          children: 'always',
          propElementValues: 'always',
          props: 'never',
        },
      ],
      'testing-library/await-async-events': ['off'],
    },
    settings: {
      'import/external-module-folders': ['node_modules', '.pnpm-store'],
      'import/ignore': [
        'node_modules',
        '.json$',
        '.(css|scss)$',
        '.(jpg|png|gif|svg|html|txt|md|woff|woff2|ttf|eot)$',
      ],
      'import/resolver': { typescript: { alwaysTryTypes: true } },
    },
  },

  {
    files: ['./src/lib/**/*.{ts,tsx}'],
    plugins: { import: pluginImport },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              from: './src/modules',
              message: 'Lib should not depend on modules.',
              target: './src/lib',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['./src/**/*.{ts,tsx}'],
    plugins: { hooks: pluginHooks },
    rules: {
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
    },
  },

  {
    files: ['**/*.?(m|c)js', '**/*.{ts,tsx}'],
    plugins: { 'simple-import-sort': pluginSimpleImportSort },
    rules: {
      'simple-import-sort/imports': (() => {
        const internalPackages = '@/|/' // you can add more packages here like '@/|@/components/|@/utils/'
        const styleExtensions = '\\.style$|\\.s?css$'

        return [
          'warn',
          {
            groups: [
              // External `react` packages come first.
              ['^react', `^(?!${internalPackages}|\\./|\\.\\./|\\u0000)`],

              // Imports w/o from.
              ['^\\u0000'],

              // Internal packages w/ absolute paths.
              [`^(${internalPackages})(?!${styleExtensions})`],

              // Internal packages w/ relative paths.
              [
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
    },
  },

  {
    files: ['**/*.?(m|c)js', '**/*.{ts,tsx}'],
    plugins: { 'sort-keys-fix': pluginSortKeysFix },
    rules: {
      'sort-keys-fix/sort-keys-fix': 'warn',
    },
  },

  {
    files: ['**/*.?(m|c)js', '**/vite.config.ts', '**/vitest.config.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-spread': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'import/no-commonjs': 'off',
      strict: 'off',
    },
  },
])
