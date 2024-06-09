// @ts-check

import { fileURLToPath } from 'node:url';

import webpack from 'webpack';

/** @type webpack.Configuration */
const config = {
  mode: 'none',
  experiments: { outputModule: true },

  entry: { index: fileURLToPath(import.meta.resolve('./index.mjs')) },
  output: {
    path: fileURLToPath(import.meta.resolve('.')),
    libraryTarget: 'module',
  },

  resolve: {
    fallback: {
      net: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};

export default config;
