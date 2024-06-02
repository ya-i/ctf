import { Storage } from 'webextension-polyfill';

import * as debug from '../../../../runtime/util/debug';

import { stub } from './stub';

type Preferences = Record<string, string>;

export function storage(prefs: Preferences = {}) {
  const browser = stub();

  const get = (keys: string[] | null) => {
    if (keys == null) {
      return Promise.resolve(prefs);
    } else if (Array.isArray(keys)) {
      return Promise.resolve(
        Object.fromEntries(
          keys
            .filter((key) => prefs[key] !== undefined)
            .map((key) => [key, prefs[key]])
        )
      );
    } else {
      return debug.never('Unexpected keys');
    }
  };
  const set = (items: Preferences) => {
    Object.assign(prefs, items);
    return Promise.resolve();
  };

  beforeEach(() => {
    function createArea(): Partial<Storage.StorageArea> {
      return {
        get: jest.fn(get),
        set: jest.fn(set),
        remove: jest.fn(),
      };
    }

    const onChanged: Pick<Storage.Static['onChanged'], 'addListener'> = {
      addListener: jest.fn(),
    };

    browser.storage = {
      local: createArea() as Storage.Static['local'],
      sync: createArea() as Storage.Static['sync'],
      managed: createArea() as Storage.Static['managed'],
      onChanged: onChanged as Storage.Static['onChanged'],
      session: createArea() as Storage.Static['session'],
    };
  });

  afterEach(() => {
    browser.storage = undefined as unknown as Storage.Static;
  });
}
