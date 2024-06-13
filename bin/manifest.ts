import { argv } from 'node:process';

import _ from 'lodash-es';

import pkg from '../package.json' with { type: 'json' };
import type { Target } from '../src/manifest.ts';
import Manifest from '../src/manifest.ts';

if (import.meta.main) {
  main();
}

function main(args = argv.slice(2)) {
  const manifest = new Manifest(process.env, pkg);
  const target = _.first(args) as Target;

  console.log(manifest.render(target));
}
