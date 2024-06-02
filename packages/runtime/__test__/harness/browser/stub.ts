export function stub() {
  let doubleInvocation = false;

  beforeEach(() => {
    if (browser.ctfHarness) {
      doubleInvocation = true;
    } else {
      browser.ctfHarness = true;
    }
  });

  beforeEach(() => {
    if (doubleInvocation) {
      return;
    }

    Object.assign(browser, {
      runtime: {
        getPlatformInfo: jest.fn().mockResolvedValue({}),
        onMessage: { addListener: jest.fn() },
      },
      tabs: {
        TAB_ID_NONE: -1,
        onActivated: { addListener: jest.fn() },
        onUpdated: { addListener: jest.fn() },
        onRemoved: { addListener: jest.fn() },
      },
      webRequest: {
        onResponseStarted: { addListener: jest.fn() },
      },

      action: {},
    });
  });

  afterEach(() => {
    if (doubleInvocation) {
      return;
    }

    browser.ctfHarness = undefined;
  });

  return browser;
}
