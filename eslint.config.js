import eslintJs from '@eslint/js'
import { defineConfig } from 'eslint/config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import pluginHooks from 'eslint-plugin-hooks'
import pluginImportX from 'eslint-plugin-import-x'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y-x'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: ['**/dist'],
  },
  eslintJs.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.?(m|c)js'],
    ...tsEslint.configs.disableTypeChecked,
  },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginReactHooks.configs.flat.recommended,
  pluginJsxA11y.configs.recommended,
  pluginReactRefresh.configs.vite,
  {
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'import-x': pluginImportX },
    rules: {
      ...pluginImportX.flatConfigs.recommended.rules,
      ...pluginImportX.flatConfigs.typescript.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
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

      '@typescript-eslint/prefer-nullish-coalescing': 'error',

      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { considerDefaultExhaustiveForUnions: true },
      ],

      '@typescript-eslint/unbound-method': 'off',

      eqeqeq: ['error', 'smart'],

      'import-x/newline-after-import': 'error',

      'import-x/no-amd': 'error',

      'import-x/no-commonjs': 'error',

      'import-x/no-dynamic-require': 'error',

      'import-x/no-extraneous-dependencies': 'error',

      'import-x/no-unresolved': 'off',

      'import-x/no-useless-path-segments': 'error',

      'no-console': ['error', { allow: ['error'] }],

      'no-unused-vars': 'off',

      'no-void': ['error', { allowAsStatement: true }],

      /*
      Using pluginSimpleImportSort (below) instead of that:
      'import-x/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
        },
      ],
      */
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/display-name': 'error',
      'react/jsx-curly-brace-presence': 'off',
    },
    settings: {
      'import-x/external-module-folders': ['node_modules', '.pnpm-store'],
      'import-x/ignore': [
        'node_modules',
        '.json$',
        '.(css|scss)$',
        '.(jpg|png|gif|svg|html|txt|md|woff|woff2|ttf|eot)$',
      ],
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
      ],
    },
  },

  {
    files: ['./src/lib/**/*.{ts,tsx}'],
    plugins: { 'import-x': pluginImportX },
    rules: {
      'import-x/no-restricted-paths': [
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
        const internalPackages = '@/|/|@apps/|@packages/' // you can add more packages here like '@/|@/components/|@/utils/'
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
    plugins: { perfectionist: pluginPerfectionist },
    rules: {
      'perfectionist/sort-objects': ['warn', { order: 'asc', type: 'alphabetical' }],
    },
  },

  {
    files: ['**/*.?(m|c)js', '**/vite.config.ts', '**/vitest.config.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'import-x/no-commonjs': 'off',
      strict: 'off',
    },
  }
)
