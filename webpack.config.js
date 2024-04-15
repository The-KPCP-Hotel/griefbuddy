const path = require('path');
require('dotenv').config();

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: process.env.MODE || 'production',
  watch: process.env.MODE === 'development',
  stats: {
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
