import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import pkg from '../package.json' with { type: 'json' };
import type { Target } from './manifest.ts';
import Manifest from './manifest.ts';

const ROOT = fileURLToPath(import.meta.resolve('../'));
const ASSETS = ROOT + 'assets/';

export function validate(t: Set<string>): asserts t is Set<Target> {
  for (const target of t) {
    assert(
      target === 'firefox' || target === 'chromium',
      `Invalid target: ${target}, expected 'firefox' or 'chromium'`,
    );
  }
}

const entrypoint: Record<Target, string[]> = {
  firefox: ['./src/background.ts'],
  chromium: ['./src/service_worker.ts'],
};

export async function build(targets: Set<Target>, opts: { watch: boolean }) {
  const manifest = new Manifest(process.env, pkg);

  for (const target of targets) {
    const entrypoints = entrypoint[target];
    const out = ASSETS + target + '/';

    const result = await Bun.build({ entrypoints, outdir: out });

    await fs.writeFile(out + 'manifest.json', manifest.render(target), 'utf8');

    if (result.success) {
      console.log(`  ✅ ${target} build successful`);
      console.log();
    } else {
      console.error(`  ❌ ${target} build failed`);
      const error = new AggregateError(result.logs);
      if (opts.watch) {
        console.error(error);
      } else {
        throw error;
      }
    }
  }
}

export function clearConsole() {
  console.log('\x1B[2J\x1B[3J\x1B[H\x1Bc');
}
