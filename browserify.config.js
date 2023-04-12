const fs = require('fs');
const rimraf = require('rimraf');
const browserify = require('browserify');
const minifyStream = require('minify-stream');
const generateHtml = require('./tools/generate-html');

const hash = Date.now();
const distDir = 'dist-browserify';
const mainBundleName = `main.${hash}.bundle.js`;

// Clean dist directory.
rimraf.sync(distDir);
fs.mkdirSync(distDir);

browserify({
  entries: './app/main.ts',
  extensions: ['.ts'] // Extensions for the module lookup machinery to use when the extension has not been specified.
})
  .transform('scssify', {
    sass: {
      sourceMapEmbed: false,
      outputStyle: 'compressed'
    },
    postcss: { autoprefixer: {} }
  })
  .transform('babelify', { // Transpile TypeScript into JavaScript.
    extensions: ['.ts'],
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: ['dynamic-import-split-require'],
  })
  .plugin('split-require', { // Split dynamic imports() into separate files.
    filename: entry => `${entry.index}.${hash}.bundle.js`,
    out: distDir,
  })
  // .plugin('tinyify', { flat: false }) // Can be used when https://github.com/browserify/tinyify/issues/26 will be fixed.
  .transform('@browserify/uglifyify', { global: true })
  .plugin('browser-pack-flat/plugin')
  .bundle()
  .on('error', error => console.error(error.toString()))
  .pipe(minifyStream({ sourceMap: false }))
  .pipe(fs.createWriteStream(`${__dirname}/${distDir}/${mainBundleName}`))
;

generateHtml({
  dist: distDir,
  fileName: 'index.html',
  scripts: [mainBundleName],
  template: './app/index.html',
});
