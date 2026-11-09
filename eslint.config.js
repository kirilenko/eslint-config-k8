import pluginEslintReact from '@eslint-react/eslint-plugin'
import eslintJs from '@eslint/js'
import { defineConfig } from 'eslint/config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import pluginHooks from 'eslint-plugin-hooks'
import pluginImportX from 'eslint-plugin-import-x'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y-x'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const eslintReactRecommended = pluginEslintReact.configs['recommended-type-checked']

// @eslint-react ports the hooks rules; the official eslint-plugin-react-hooks keeps them instead
const eslintReactHooksDuplicates = Object.keys(eslintReactRecommended.rules)
  .filter((rule) => rule.replace('@eslint-react/', '') in pluginReactHooks.rules)
  .map((rule) => [rule, 'off'])

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
  eslintReactRecommended,
  {
    files: ['**/*.?(m|c)js'],
    ...pluginEslintReact.configs['disable-type-checked'],
  },
  {
    rules: Object.fromEntries(eslintReactHooksDuplicates),
  },
  pluginReactHooks.configs.flat.recommended,
  pluginJsxA11y.configs.recommended,
  pluginReactRefresh.configs.vite,
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
      '@eslint-react/no-missing-component-display-name': 'error',
      '@eslint-react/no-use-context': 'off',
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
        // Monorepo packages (e.g. packages/ui) keep their own path aliases; the nearest tsconfig wins per file
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: ['tsconfig.json', '*/tsconfig.json', '*/*/tsconfig.json'],
        }),
      ],
    },
  },

  {
    files: ['**/src/lib/**/*.{ts,tsx}'],
    plugins: { 'import-x': pluginImportX },
    rules: {
      // Absolute globs match at any depth regardless of cwd, so every package of a monorepo is covered
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              except: ['/**/node_modules/**'],
              from: '/**/src/modules/**',
              message: 'Lib should not depend on modules.',
              target: '/**/src/lib/**',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/src/**/*.{ts,tsx}'],
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
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'import-x/no-commonjs': 'off',
      strict: 'off',
    },
  }
)
