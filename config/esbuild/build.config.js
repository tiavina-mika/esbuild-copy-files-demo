const esbuild = require('esbuild');
const path = require('path');
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const { copy } = require("esbuild-copy-files");

const defaultBuildOptions = {
  entryPoints: [
    { in: path.resolve(__dirname, '../../src/index.ts'), out: path.resolve(__dirname, '../../dist/index') },
  ],
  // see: https://stackoverflow.com/questions/71837664/does-esbuild-provide-a-feature-like-the-resolve-alias-option-in-webpack
  bundle: true,
  platform: 'node',
  outdir: 'dist',
};

/**
 * options for building the project
 * see the script 'build' in package.json
 * we are using the watch option to watch for changes
 */
const buildOptions = {
  ...defaultBuildOptions,
  plugins: [
    nodeExternalsPlugin(),
    copy({
      // stop watching for build
      stopWatching: true,
      patterns: [
        {
          from: path.resolve(__dirname, '../../src/folder2'),
          to: path.resolve(__dirname, '../../dist/folder2'),
          ignore: ['*3.json'],
        },
        // {
        //   from: ['./src/folder2/subfolder2'],
        //   to: ['./dist/folder1/subfolder2'],
        //   watch: false,
        // },
      ]
    }),
  ],
}

/**
 * options for building the project in watch mode (watching for changes)
 * we do not stop watching for changes (stopWatching: false)
 */
const watchBuildOptions = {
  ...defaultBuildOptions,
  plugins: [
    nodeExternalsPlugin(),
    copy({
      watch: true,
      patterns: [
        {
          from: path.resolve(__dirname, '../../src/folder2'),
          to: path.resolve(__dirname, '../../dist/folder2'),
          ignore: ['*3.json'],
          watch: true,
        },
      ]
    }),
  ],
}

exports.watchBuildOptions = watchBuildOptions;

async function build() {
  await esbuild.build(buildOptions);
}
build();
