import _ from 'lodash-es';

export type Target = 'firefox' | 'chromium';

export default class Manifest {
  constructor(
    private readonly env: Record<string, string | undefined>,
    private readonly pkg: Record<string, unknown>,
  ) {}

  get template() {
    const { author, version } = this.pkg;

    return {
      manifest_version: undefined,

      name: '__MSG_ext_name__',
      short_name: '__MSG_ext_short_name__',
      version,
      version_name: this.version,

      default_locale: 'en',
      description: '__MSG_ext_description__',

      icons: this.icons,

      action: undefined,
      page_action: undefined,

      options_ui: undefined,
      // {
      //   page: 'options.html',
      //   open_in_tab: false,
      // },

      background: {
        background: undefined,
        service_worker: undefined,
      },

      permissions: ['webRequest', 'storage'],
      host_permissions: ['<all_urls>'],
      author,

      browser_specific_settings: undefined,
    };
  }

  get version() {
    const { GITHUB_SHA } = this.env;
    const { version } = this.pkg as { version: string };

    return GITHUB_SHA && version + ` (${GITHUB_SHA.substring(0, 8)})`;
  }

  get icons() {
    return {
      32: 'icons/icon_32px.png',
      48: 'icons/icon_48px.png',
      128: 'icons/icon_128px.png',
      256: 'icons/icon_256px.png',
      512: 'icons/icon_512px.png',
    };
  }

  get action() {
    return {
      default_icon: this.icons,
      default_popup: 'popup.html',
      show_matches: ['<all_urls>'],
    };
  }

  render(target: Target) {
    const manifest = this.template;

    switch (target) {
      case 'firefox':
        _.set(manifest, 'manifest_version', 2);
        _.set(manifest, 'page_action', this.action);
        _.set(manifest, 'browser_specific_settings', {
          gecko: {
            id: '@ctf',
          },
        });

        manifest.permissions.unshift('dns');

        break;
      case 'chromium':
        _.set(manifest, 'manifest_version', 3);
        _.set(manifest, 'background.service_worker', 'service_worker.js');
        _.set(manifest, 'action', this.action);

        manifest.permissions.push('offscreen');

        break;
      default:
        throw new Error(
          `Unknown manifest: ${target}, expected 'firefox' or 'chromium'`,
        );
    }

    return JSON.stringify(manifest, null, 2);
  }
}
