#!/usr/bin/env node --import tsx

import { argv } from 'node:process';

import _ from 'lodash-es';

import pkg from '../package.json' with { type: 'json' };
import type { Target } from '../src/manifest.ts';
import Manifest from '../src/manifest.ts';

const isMain = import.meta.filename === process?.argv[1];
if (isMain) {
  main();
}

function main(args = argv.slice(2)) {
  const manifest = new Manifest(process.env, pkg);
  const target = _.first(args) as Target;

  console.log(manifest.render(target));
}
