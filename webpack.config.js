const path = require('path')

const  HTMLWebpackPlugin = require('html-webpack-plugin')
const  {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

console.log('isDev =', isDev)

const filename = ext => 
  isDev 
    ? `[name].${ext}` 
    : `[name].[hash].${ext}`

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env',
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }
  return opts
}
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: isDev ? 'development' : 'production',
  entry: {
    main: './index.ts'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['js', 'json']
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [{
          loader: 'babel-loader',
          options: babelOptions()
        }],
        test: /\.ts$/, 
        exclude: /node_modules/, 
        use: [{
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }]
      }
    ]
  }
}