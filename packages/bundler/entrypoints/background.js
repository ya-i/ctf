const path = require('path');

const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');

const { BasicEntrypoint } = require('./_basic');

class BackgroundEntrypoint extends BasicEntrypoint {
  get configuration() {
    return merge(this._maxmindMocks, this._devServer, {
      target: 'webworker',

      entry: {
        service_worker: `${this.bundle.runtimePath}/entrypoints/service_worker`,
      },

      module: {
        rules: [this.typescriptRule],
      },
    });
  }

  get plugins() {
    return [
      ...super.plugins,

      new WebpackManifestPlugin({
        seed: this.bundle,
        generate: (...args) => this.getManifestFactory().create(...args),
      }),
    ];
  }

  getManifestFactory() {
    throw new Error('Not implemented');
  }

  get _maxmindMocks() {
    return {
      resolve: {
        alias: {
          net: path.resolve(
            this.bundle.rootPath,
            'node_modules',
            'node-libs-browser',
            'mock',
            'net.js'
          ),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
      module: {
        rules: [
          {
            test: path.resolve(
              this.bundle.rootPath,
              'node_modules',
              'maxmind',
              'lib',
              'fs.js'
            ),
            use: 'null-loader',
          },
        ],
      },
    };
  }

  get _devServer() {
    return this.bundle.devServer
      ? {
          devServer: this.bundle.devServer,
        }
      : {};
  }
}

module.exports.BackgroundEntrypoint = BackgroundEntrypoint;
