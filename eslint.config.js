// @ts-check

import fs from 'node:fs';

import { eslint, typescript, spec } from 'eslint-config-nilfalse';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.js'].concat(
      fs.readFileSync('.gitignore', 'utf8').split('\n').filter(Boolean),
    ),
  },
  {
    settings: {
      'import/core-modules': ['bun:test'],
    },
  },

  ...eslint,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    ...typescript,
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    ...spec,
  },
);
