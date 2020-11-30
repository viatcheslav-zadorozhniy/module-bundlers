const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './apps/ts-css-lazy/main.ts',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist-webpack'),
  },
  resolve: { // Add support for .ts files when resolve modules w/o an extension (not supported out of the box)
    extensions: ['.ts', '.js'],
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      { // Transpile TypeScript into JavaScript
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/,
      },
      { // Handle CSS files - load, parse, add CSS vendor prefixes
        test: /\.css$/i,
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
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean dist directory
    new MiniCssExtractPlugin({ // Extract CSS into separate file
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({ // Generate an HTML file with injected CSS/JavaScript
      template: './apps/ts-css-lazy/index.html',
      minify: false,
    }),
  ],
};
