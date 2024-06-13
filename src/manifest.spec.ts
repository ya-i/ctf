import { describe, expect, it } from 'bun:test';

import Manifest from './manifest';

describe('manifest', () => {
  describe('Firefox', () => {
    it('should create manifest v2', async () => {
      const manifest = new Manifest(
        {},
        { author: 'nilfalse.com', version: '1.0.0' },
      );

      expect(manifest.render('firefox').split('\n')).toStrictEqual([
        '{',
        '  "manifest_version": 2,',
        '  "name": "__MSG_ext_name__",',
        '  "short_name": "__MSG_ext_short_name__",',
        '  "version": "1.0.0",',
        '  "default_locale": "en",',
        '  "description": "__MSG_ext_description__",',
        '  "icons": {',
        '    "32": "icons/icon_32px.png",',
        '    "48": "icons/icon_48px.png",',
        '    "128": "icons/icon_128px.png",',
        '    "256": "icons/icon_256px.png",',
        '    "512": "icons/icon_512px.png"',
        '  },',
        '  "page_action": {',
        '    "default_icon": {',
        '      "32": "icons/icon_32px.png",',
        '      "48": "icons/icon_48px.png",',
        '      "128": "icons/icon_128px.png",',
        '      "256": "icons/icon_256px.png",',
        '      "512": "icons/icon_512px.png"',
        '    },',
        '    "default_popup": "popup.html",',
        '    "show_matches": [',
        '      "<all_urls>"',
        '    ]',
        '  },',
        '  "background": {},',
        '  "permissions": [',
        '    "dns",',
        '    "webRequest",',
        '    "storage"',
        '  ],',
        '  "host_permissions": [',
        '    "<all_urls>"',
        '  ],',
        '  "author": "nilfalse.com",',
        '  "browser_specific_settings": {',
        '    "gecko": {',
        '      "id": "@ctf"',
        '    }',
        '  }',
        '}',
      ]);
    });

    it('should use commit hash for version when it is available', async () => {
      const manifest = new Manifest(
        { GITHUB_SHA: '666e666' },
        { author: 'nilfalse.com', version: '1.0.0' },
      );

      expect(manifest.render('firefox').split('\n')).toStrictEqual([
        '{',
        '  "manifest_version": 2,',
        '  "name": "__MSG_ext_name__",',
        '  "short_name": "__MSG_ext_short_name__",',
        '  "version": "1.0.0",',
        '  "version_name": "1.0.0 (666e666)",',
        '  "default_locale": "en",',
        '  "description": "__MSG_ext_description__",',
        '  "icons": {',
        '    "32": "icons/icon_32px.png",',
        '    "48": "icons/icon_48px.png",',
        '    "128": "icons/icon_128px.png",',
        '    "256": "icons/icon_256px.png",',
        '    "512": "icons/icon_512px.png"',
        '  },',
        '  "page_action": {',
        '    "default_icon": {',
        '      "32": "icons/icon_32px.png",',
        '      "48": "icons/icon_48px.png",',
        '      "128": "icons/icon_128px.png",',
        '      "256": "icons/icon_256px.png",',
        '      "512": "icons/icon_512px.png"',
        '    },',
        '    "default_popup": "popup.html",',
        '    "show_matches": [',
        '      "<all_urls>"',
        '    ]',
        '  },',
        '  "background": {},',
        '  "permissions": [',
        '    "dns",',
        '    "webRequest",',
        '    "storage"',
        '  ],',
        '  "host_permissions": [',
        '    "<all_urls>"',
        '  ],',
        '  "author": "nilfalse.com",',
        '  "browser_specific_settings": {',
        '    "gecko": {',
        '      "id": "@ctf"',
        '    }',
        '  }',
        '}',
      ]);
    });
  });

  describe('Chromium', () => {
    it('should create manifest v3', async () => {
      const manifest = new Manifest(
        { GITHUB_SHA: '666e666' },
        { author: 'nilfalse.com', version: '1.0.0' },
      );

      expect(manifest.render('chromium').split('\n')).toStrictEqual([
        '{',
        '  "manifest_version": 3,',
        '  "name": "__MSG_ext_name__",',
        '  "short_name": "__MSG_ext_short_name__",',
        '  "version": "1.0.0",',
        '  "version_name": "1.0.0 (666e666)",',
        '  "default_locale": "en",',
        '  "description": "__MSG_ext_description__",',
        '  "icons": {',
        '    "32": "icons/icon_32px.png",',
        '    "48": "icons/icon_48px.png",',
        '    "128": "icons/icon_128px.png",',
        '    "256": "icons/icon_256px.png",',
        '    "512": "icons/icon_512px.png"',
        '  },',
        '  "action": {',
        '    "default_icon": {',
        '      "32": "icons/icon_32px.png",',
        '      "48": "icons/icon_48px.png",',
        '      "128": "icons/icon_128px.png",',
        '      "256": "icons/icon_256px.png",',
        '      "512": "icons/icon_512px.png"',
        '    },',
        '    "default_popup": "popup.html",',
        '    "show_matches": [',
        '      "<all_urls>"',
        '    ]',
        '  },',
        '  "background": {',
        '    "service_worker": "service_worker.js"',
        '  },',
        '  "permissions": [',
        '    "webRequest",',
        '    "storage",',
        '    "offscreen"',
        '  ],',
        '  "host_permissions": [',
        '    "<all_urls>"',
        '  ],',
        '  "author": "nilfalse.com"',
        '}',
      ]);
    });
  });
});
