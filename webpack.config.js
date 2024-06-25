const path = require('path');
require('dotenv').config();

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: './src/index.tsx',
    map: './src/components/MeetupMap.tsx'
  },
  devtool: 'inline-source-map',
  // this is still needed for instance to run production mode
  // mode: 'production',
  // this still runs development
  mode: process.env.MODE || 'production',
  watch: process.env.MODE === 'development',
  stats: {
    errorDetails: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({ generateStatsFile: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'img', 'grief-buddy.png')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: [/node_modules/, /dist/, /migrations/],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'react-big-calendar'),
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[id].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
