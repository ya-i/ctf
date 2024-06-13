/// <reference lib="WebWorker" />
/// <reference types="chrome-types" />

import * as maxmind from '../lib/maxmind/index.mjs';

chrome.runtime.onInstalled.addListener((details) => {
  console.log('Chrome Installing', details.reason);

  if (details.reason !== 'install' && details.reason !== 'update') {
    return;
  }
});

const MAXMIND_URL = 'https://ctf.pages.dev/maxmind/GeoLite2-Country.mmdb';

self.addEventListener('activate', (event) => {
  console.log('Activating');

  event.waitUntil(
    caches
      .match(MAXMIND_URL)
      .then(
        (r) =>
          r ||
          caches
            .open('v1')
            .then((cache) => cache.addAll([MAXMIND_URL]))
            .then(() => caches.match(MAXMIND_URL)),
      )
      .then((r) => {
        console.log(r);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return r!;
      })
      .then(maxmind.init)
      .then((reader) => {
        console.log('Reader', reader);

        console.log(reader.get('185.51.76.136'));
      }),
  );
});

declare const self: ServiceWorkerGlobalScope;
