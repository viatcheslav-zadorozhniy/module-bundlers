import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import cleaner from 'rollup-plugin-cleaner';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import iife from "rollup-plugin-iife";

const reorderScripts = () => {
  return {
    name: 'reorder-scripts',
    generateBundle(outputOptions, bundleInfo) {
      const sortedBundleInfo = {};
      Object
        .keys(bundleInfo)
        .sort(a => a.includes('vendor') ? -1 : 0)
        .forEach(x => sortedBundleInfo[x] = bundleInfo[x]);

      Object.keys(bundleInfo).forEach(x => delete bundleInfo[x]);
      Object.keys(sortedBundleInfo).forEach(x => bundleInfo[x] = sortedBundleInfo[x]);
    }
  };
};

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist-rollup',
    entryFileNames: '[name].[hash].bundle.js',
    chunkFileNames: '[name].[hash].bundle.js',
    format: 'es',
  },
  manualChunks: id => {
    if (id.includes('node_modules')) {
      return 'vendor';
    }
  },
  plugins: [
    typescript(),
    terser(),
    iife(),
    reorderScripts(),
    postcss({
      minimize: true,
      extract: true,
    }),
    nodeResolve({ browser: true }),
    cleaner({ targets: ['dist-rollup'] }),
    htmlTemplate({
      template: './src/index.html',
      target: 'index.html',
    }),
  ]
};
