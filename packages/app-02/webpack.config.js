const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const path = require('path')

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3002,
  },

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: 'http://localhost:3002/',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'app_02',
      remotes: {
        app_01: 'app_01@[app1Url]/remoteEntry.js',
        app_03: 'app_03@[app3Url]/remoteEntry.js',
      },
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
