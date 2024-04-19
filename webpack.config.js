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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
