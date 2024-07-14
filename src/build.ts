import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import * as esbuild from 'esbuild';

import pkg from '../package.json' with { type: 'json' };
import type { Target } from './manifest.ts';
import Manifest from './manifest.ts';
import * as document from './Document.tsx';
import { Popup } from './popup/Popup.tsx';

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
  firefox: ['./src/background.ts', './src/popup.tsx'],
  chromium: ['./src/service_worker.ts', './src/popup.tsx'],
};

const compileTargets: Record<Target, string> = {
  firefox: 'firefox100',
  chromium: 'chrome80',
};

export async function build(targets: Set<Target>, opts: { watch: boolean }) {
  const popup = document.render(Popup, {
    title: 'Popup',
    styles: ['popup.css'],
    scripts: ['popup.js'],
  });
  const manifest = new Manifest(process.env, pkg);

  for (const target of targets) {
    const entryPoints = entrypoint[target];
    const out = ASSETS + target + '/';

    const build = await esbuild.build({
      entryPoints,
      outdir: out,
      bundle: true,
      minify: process.env.NODE_ENV === 'production',
      target: [compileTargets[target]],
      format: 'esm',
      color: true,
    });

    await fs.writeFile(out + 'popup.html', popup, 'utf8');
    await fs.writeFile(out + 'manifest.json', manifest.render(target), 'utf8');

    if (build.errors.length === 0) {
      console.log(`  ✅ ${target} build successful`);
      console.log();
    } else {
      console.error(`  ❌ ${target} build failed`);
      const error = new AggregateError(build.errors);
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
