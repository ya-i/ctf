import 'chrome-types';
import { Browser } from 'webextension-polyfill';

declare interface MockedBrowser extends Browser {
  ctfHarness?: boolean;
}

declare global {
  const browser: MockedBrowser;

  const InstallTrigger: unknown;
}
