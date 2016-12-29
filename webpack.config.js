const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index'],
  devtool: '#inline-sourcemap',
  output: {
    filename: 'markov.js',
    publicPath: '/js',
    path: path.resolve(__dirname, "public", "js")
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['es2015', 'react', 'react-hmre']
          }
        }],
      }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin()]
};
