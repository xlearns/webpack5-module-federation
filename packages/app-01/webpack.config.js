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
    port: 3001,
  },

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: 'http://localhost:3001/',
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
      name: 'app_01',
      remotes: {
        app_02: 'app_02@[app2Url]/remoteEntry.js',
        app_03: 'app_03@[app3Url]/remoteEntry.js',
      },
      filename: 'remoteEntry.js',
      exposes: {
        // 必须是相对路径
        './Button': './src/Button',
      },
      shared: {
        //  eager: true
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
