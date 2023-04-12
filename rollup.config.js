const nodeResolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const html = require('@rollup/plugin-html');
const postcss = require('rollup-plugin-postcss');
const cleaner = require('rollup-plugin-cleaner');
const autoprefixer = require('autoprefixer');

const fs = require('fs');
const htmlTemplate = fs.readFileSync('./app/index.html', 'utf8');

const distDir = 'dist-rollup';

module.exports = {
  input: 'app/main.ts',
  output: {
    dir: distDir,
    sourcemap: true,
    entryFileNames: '[name].[hash].bundle.js',
    chunkFileNames: '[name].[hash].bundle.js',
    manualChunks: id => { // Move an imports from the node_modules directory into separate chunk.
      if (id.includes('node_modules')) {
        return 'vendor';
      }
    },
  },
  plugins: [
    typescript({ outDir: distDir }), // Transpile TypeScript into JavaScript.
    terser(), // Minify JavaScript.
    postcss({
      minimize: true,
      sourceMap: true,
      extract: true, // Extract CSS into a separate file.
      plugins: [autoprefixer()],
    }),
    nodeResolve({ browser: true }), // Make imports from node_modules directory work.
    cleaner({ targets: [distDir] }), // Clean dist directory.
    html({ // Generate an HTML file.
      template: ({ files }) => {
        const styles = files.css.map(cssFile => `<link href="${cssFile.fileName}" rel="stylesheet">`).join('');

        const scripts = files.js
          .filter(jsFile => !jsFile.isDynamicEntry)
          .map(jsFile => `<script src="${jsFile.fileName}" type="module"></script>`)
          .join('');

        return htmlTemplate
          .replace(/\<\/head>/mi, `${styles}\n</head>`) // Insert styles before closing head.
          .replace(/\<\/body>/mi, `${scripts}\n</body>`) // Insert scripts before closing body.
        ;
      }
    }),
  ]
};
