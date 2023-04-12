const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './app/main.ts',
  devtool: 'source-map',
  output: {
    clean: true, // Clean dist directory.
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist-webpack'),
  },
  resolve: { // Add support for .ts files when resolve modules w/o an extension (not supported out of the box).
    extensions: ['.ts', '.js'],
  },
  optimization: {
    // runtimeChunk: 'single', // Can be useful in case of multiple entry points.
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all' // Chunks can be shared even between async and non-async chunks.
    }
  },
  module: {
    rules: [
      { // Transpile TypeScript into JavaScript.
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true // Speed up compilation by skipping static type checking.
            }
          }
        ],
        exclude: /node_modules/,
      },
      { // Handle SCSS files - load, parse, add CSS vendor prefixes.
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {}]
                ]
              }
            }
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ // Extract CSS into separate file.
      filename: '[name].[contenthash].bundle.css',
    }),
    new HtmlWebpackPlugin({ // Generate an HTML file with injected CSS/JavaScript.
      template: './app/index.html',
      minify: true,
      inject: 'body',
    }),
  ],
};
