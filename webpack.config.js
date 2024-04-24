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
  mode: process.env.MODE || 'production',
  // using production mode for build testing, but don't want to push that up
  // mode: 'production',
  watch: process.env.MODE === 'development',
  stats: {
    errorDetails: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({ generateStatsFile: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
        use: ["style-loader", "css-loader"],
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/react-big-calendar")
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
    chunkFilename: '[id].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
