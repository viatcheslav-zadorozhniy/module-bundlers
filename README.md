# Module Bundlers

## Table of contents
- [Description](#description)
  - [What is their purpose?](#what-is-their-purpose)
  - [When they are used?](#when-they-are-used)
  - [How does their usually work?](#how-does-their-usually-work)
- [Bundlers](#bundlers)
  - [Browserify (outdated)](#browserify-outdated)
  - [ESBuild](#esbuild)
  - [Parcel](#parcel)
  - [Rollup](#rollup)
  - [Webpack](#webpack)
- [Demo](#demo)
  - [Details](#details)
  - [Installation](#installation)


## Description

### What is their purpose?
- browsers (or node.js) understand JavaScript, not JSX or TypeScript
- browsers understand CSS, not [SASS](https://sass-lang.com/) (SCSS) or [LESS](https://lesscss.org/)
- to deliver optimized code for users - bundled, minified
- etc.


### When they are used?
- always 🙂, usually indirectly
- [Create React App](https://create-react-app.dev/) uses [webpack](https://webpack.js.org/)
- [Gatsby](https://www.gatsbyjs.com/) uses [webpack](https://webpack.js.org/)
- [Vue CLI](https://cli.vuejs.org/) uses [webpack](https://webpack.js.org/)
- [Angular CLI](https://angular.io/cli) uses [webpack](https://webpack.js.org/) (has experimental [esbuild](https://esbuild.github.io/) support)
- [Vite](https://vitejs.dev/) uses [rollup](https://rollupjs.org/)


### How does their usually work?

Typical config has the following properties:
- entry point (single or multiple)
- output details
  - output file(s) name
  - output directory
  - etc.
- bundling details
  - use minification
  - add source maps
  - etc.
- set of plugins
  - perform manipulations not supported out of the box
  - use lifecycle hooks to inject their logic

## Bundlers

### Browserify (outdated)
- [Config example](./browserify.config.js)
- [Documentation](https://browserify.org/)
- Run `yarn build:browserify` to bundle the demo app.


### ESBuild
- [Config example](./esbuild.config.js)
- [Documentation](https://esbuild.github.io/)
- Run `yarn build:esbuild` to bundle the demo app.


### Parcel
- Zero configuration build tool.
- [Documentation](https://parceljs.org/)
- Run `yarn build:parcel` to bundle the demo app (uncomment script in the [index.html](./app/index.html) before).


### Rollup
- [Config example](./rollup.config.js)
- [Documentation](https://rollupjs.org/)
- Run `yarn build:rollup` to bundle the demo app.


### Webpack
- [Config example](./webpack.config.js)
- [Documentation](https://webpack.js.org/)
- Run `yarn build:webpack` to bundle the demo app.


## Demo

### Details
An [example app](./app/main.ts) is close to the real-world infrastructure:
- written in TypeScript;
- imports 3rd party libraries;
- has unused imports (to test [tree shaking](https://en.wikipedia.org/wiki/Tree_shaking));
- has [lazy loading](https://en.wikipedia.org/wiki/Lazy_loading) modules;
- uses CSS preprocessor ([SASS](https://sass-lang.com/));
- uses partially-supported CSS rules, which require vendor prefixes ([autoprefixer](https://github.com/postcss/autoprefixer));


### Installation
```
yarn install --frozen-lockfile
```
