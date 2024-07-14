/// <reference lib="WebWorker" />

import browser from 'webextension-polyfill';

import { boot, init } from './boot.ts';

boot(browser);

self.addEventListener('activate', (event) => {
  console.log('Activating');

  event.waitUntil(init());
});

declare const self: ServiceWorkerGlobalScope;
