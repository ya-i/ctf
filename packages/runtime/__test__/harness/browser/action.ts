import { Action } from 'webextension-polyfill';

import { stub } from './stub';

export function action() {
  const browser = stub();

  beforeEach(() => {
    browser.action = {
      setTitle: jest.fn(),
      setPopup: jest.fn(),
      setIcon: jest.fn(),
    } as unknown as Action.Static;
  });

  afterEach(() => {
    browser.action = undefined as unknown as Action.Static;
  });
}
