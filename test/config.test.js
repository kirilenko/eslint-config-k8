import assert from 'node:assert/strict'
import path from 'node:path'
import { test } from 'node:test'

import { ESLint } from 'eslint'

const cwd = path.join(import.meta.dirname, 'fixture')

// Rules each fixture file must trigger; any file not listed must lint clean
const expected = {
  'packages/ui/src/hooks-order.tsx': ['hooks/sort'],
  'packages/ui/src/lib/restricted.ts': ['import-x/no-restricted-paths'],
  'src/a11y.tsx': ['jsx-a11y-x/alt-text'],
  'src/eqeqeq.ts': ['eqeqeq'],
  'src/floating-promise.ts': ['@typescript-eslint/no-floating-promises'],
  'src/hooks-order.tsx': ['hooks/sort'],
  'src/lib/restricted.ts': ['import-x/no-restricted-paths'],
  'src/missing-key.tsx': ['@eslint-react/no-missing-key'],
  'src/set-state-in-effect.tsx': ['react-hooks/set-state-in-effect'],
  'src/sort-objects.ts': ['perfectionist/sort-objects'],
  'src/switch.ts': ['@typescript-eslint/switch-exhaustiveness-check'],
  'src/type-imports.ts': ['@typescript-eslint/consistent-type-imports'],
}

// Run from the fixture root like the CLI does: the import resolver looks up tsconfigs from process.cwd()
process.chdir(cwd)

const results = await new ESLint({ cwd }).lintFiles(['.'])

for (const result of results) {
  const file = path.relative(cwd, result.filePath)

  test(file, () => {
    const rules = [...new Set(result.messages.map((m) => m.ruleId ?? m.message))].sort()

    assert.deepEqual(rules, expected[file] ?? [])
  })
}

test('every expected fixture was linted', () => {
  const linted = results.map((r) => path.relative(cwd, r.filePath))

  assert.deepEqual(Object.keys(expected).filter((f) => !linted.includes(f)), [])
})
