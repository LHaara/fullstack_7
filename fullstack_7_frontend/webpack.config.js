const path = require('path')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
          plugins: [require('babel-plugin-transform-class-properties'), 'transform-object-rest-spread'],          
          	
        
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },

    ]
  }
}

module.exports = config
