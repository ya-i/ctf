import type { Browser } from 'webextension-polyfill';

import { boot, init } from './boot.ts';

boot(browser);

await init();

declare const browser: Browser;
