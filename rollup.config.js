import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import cleaner from 'rollup-plugin-cleaner';
import generateHtml from './plugins/rollup/rollup-generate-html';
import iife from './plugins/rollup/rollup-patched-iife';

const distDir = 'dist-rollup';

export default {
  input: 'apps/ts-css-lazy/main.ts',
  output: {
    dir: distDir,
    entryFileNames: '[name].[hash].bundle.js',
    chunkFileNames: '[name].[hash].bundle.js',
    format: 'es',
  },
  manualChunks: id => { // Move an imports from the node_modules directory into separate chunk
    if (id.includes('node_modules')) {
      return 'vendor';
    }
  },
  plugins: [
    typescript({
      outDir: distDir,
      sourceMap: false,
    }), // Transpile TypeScript into JavaScript
    terser(), // Minify JavaScript
    iife({ include: ['main', 'vendor'] }), // Transform ES modules output into IIFEs.
    postcss({ // Extract CSS into a separate file
      minimize: true,
      extract: true,
    }),
    nodeResolve({ browser: true }), // Make imports from node_modules directory work
    cleaner({ targets: [distDir] }), // Clean dist directory
    generateHtml({ template: './apps/ts-css-lazy/index.html' }), // Generate an HTML file
  ]
};
