const { readFileSync } = require('fs');
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');
const rimraf = require('rimraf');
const esbuild = require('esbuild');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const { sassPlugin } = require('esbuild-sass-plugin');

const htmlTemplate = readFileSync('./app/index.html', 'utf8');
const bundleNameFormat = '[name].[hash].bundle';
const distDir = 'dist-esbuild';

// Clean dist directory.
rimraf.sync(distDir);

esbuild.build({
  entryPoints: ['app/main.ts'],
  entryNames: bundleNameFormat,
  assetNames: bundleNameFormat,
  chunkNames: bundleNameFormat,
  outdir: distDir,
  bundle: true,
  sourcemap: true,
  splitting: true,
  metafile: true,
  format: 'esm',
  minify: true,
  plugins: [
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source, { from: undefined });
        return css;
      }
    }),
    htmlPlugin({
      files: [{
        htmlTemplate,
        filename: 'index.html',
        scriptLoading: 'module',
        entryPoints: ['app/main.ts'],
      }]
    }),
  ],
});
