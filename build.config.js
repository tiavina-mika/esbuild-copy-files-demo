const esbuild = require('esbuild');
const path = require('path');
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const { copy } = require("esbuild-copy-files");
console.log('copy: ', copy);

const buildOptions = {
  entryPoints: [
    { in: path.resolve(__dirname, './src/index.ts'), out: path.resolve(__dirname, './dist/index') },
  ],
  // see: https://stackoverflow.com/questions/71837664/does-esbuild-provide-a-feature-like-the-resolve-alias-option-in-webpack
  bundle: true,
  platform: 'node',
  outdir: 'dist',
  plugins: [
    nodeExternalsPlugin(),
    copy({
      assets: [
        {
          from: ['./src/folder1/subfolder1'],
          to: ['./dist/folder1/subfolder1'],
          ignoreFiles: ['*1.json'],
          watch: true,
        },
        // {
        //   from: ['./src/folder2/subfolder2'],
        //   to: ['./dist/folder1/subfolder2'],
        //   watch: false,
        // },
      ]
    })
  ],
};

exports.buildOptions = buildOptions;

async function build() {
  await esbuild.build(buildOptions);
}
build();
