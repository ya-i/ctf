import fs from 'node:fs/promises';
import { argv } from 'node:process';

import { build, clearConsole, validate } from '../src/build.ts';

const { args, watch } = getOpt(argv.slice(2));

await build(args, { watch });

if (watch) {
  console.log('Watching for changes...');

  const WATCH_ROOT = import.meta.resolve('../src');

  for await (const _event of fs.watch(WATCH_ROOT, { recursive: true })) {
    clearConsole();

    await build(args, { watch });
  }
}

function getOpt(argv: string[]) {
  let args = new Set(argv);
  const watch = args.delete('--watch');

  if (args.size === 0) {
    args = new Set(['firefox', 'chromium']);
  }
  validate(args);

  return { args, watch };
}
