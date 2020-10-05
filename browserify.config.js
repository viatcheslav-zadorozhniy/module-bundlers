const browserify = require('browserify');
const fs = require('fs');

browserify()
  .add('./src/main.ts')
  .plugin('tsify')
  .plugin(require('css-modulesify'), {
    rootDir: __dirname,
    output: './dist-browserify/main.css'
  })
  .plugin('tinyify', { flat: false })

  .bundle()
  .on('error', function (error) { console.error(error.toString()); })
  .pipe(fs.createWriteStream(`${__dirname }/dist-browserify/main.js`));
