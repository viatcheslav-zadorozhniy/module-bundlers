const distDir = `${__dirname}/dist-browserify`;
const browserify = require('browserify');
const rimraf = require('rimraf');
const fs = require('fs');

rimraf.sync(distDir); // Remove dist directory if exists
fs.mkdirSync(distDir); // Create empty dist directory

browserify()
  .add('./src/browserify/main.ts') // Entry point
  .transform('browserify-css', { // Extract CSS into a separate file
    minify: true,
    output: `${distDir}/main.css`,
  })
  .plugin('tsify') // Transpile TypeScript into JavaScript
  .plugin('tinyify', { flat: false }) // Minify JavaScript
  .bundle() // Start bundling
  .on('error', error => { console.error(error.toString()); }) // Error processing
  .pipe(fs.createWriteStream(`${distDir}/main.js`)); // Write an output into the file
