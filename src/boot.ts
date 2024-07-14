import type { Browser } from 'webextension-polyfill';

export function boot(browser: Browser) {
  browser.runtime.onInstalled.addListener((details) => {
    console.log('Installing', details.reason);

    if (details.reason !== 'install' && details.reason !== 'update') {
      return;
    }
  });
}

export async function init() {}
