const browserify = require('browserify');
const rimraf = require('rimraf');
const fs = require('fs');

const distDir = `${__dirname}/dist-browserify`;
const vendorModules = Object.keys(require('./package.json').dependencies);
const handleErrors = error => { console.error(error.toString()); };
const writeToFile = fileName => fs.createWriteStream(`${distDir}/${fileName}`);

// Clean dist directory
rimraf.sync(distDir);
fs.mkdirSync(distDir);

// Bundle entry point script
browserify({
  extensions: ['.ts'] // Extensions for the module lookup machinery to use when the extension has not been specified
})
  .add('./apps/ts-css-lazy/main.ts') // Entry point
  .external(vendorModules)
  .transform('browserify-css', { // Extract CSS into a separate file
    minify: true,
    output: `${distDir}/main.css`,
  })
  .transform('babelify', { // Transpile TypeScript into JavaScript
    extensions: ['.ts'],
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
  })
  .plugin('tinyify', { flat: false }) // Minify JavaScript
  .bundle() // Start bundling
  .on('error', handleErrors)
  .pipe(writeToFile('main.js'))
;

// Bundle vendor scripts
browserify()
  .require('immutable')
  .plugin('tinyify', { flat: false }) // Minify JavaScript
  .bundle() // Start bundling
  .on('error', handleErrors)
  .on('file', () => {})
  .pipe(writeToFile('vendor.js'))
;

const generateHtml = require('./plugins/browserify/browserify-generate-html');
generateHtml({
  dist: 'dist-browserify',
  fileName: 'index.html',
  scripts: ['vendor.js', 'main.js'],
  styles: ['main.css'],
  template: './apps/ts-css-lazy/index.html',
});
